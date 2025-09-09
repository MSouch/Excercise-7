-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles table
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  navigator_domain TEXT DEFAULT 'quality_planning',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Simulation progress table
CREATE TABLE simulation_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  navigator_domain TEXT DEFAULT 'quality_planning',
  challenge_id INTEGER NOT NULL,
  status TEXT CHECK (status IN ('incomplete', 'complete')) DEFAULT 'incomplete',
  answers JSONB,
  score INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, navigator_domain, challenge_id)
);

-- Exercise submissions table
CREATE TABLE exercise_submissions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  navigator_domain TEXT DEFAULT 'quality_planning',
  exercise_id INTEGER NOT NULL,
  responses JSONB NOT NULL,
  score INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  time_spent INTEGER, -- in minutes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, navigator_domain, exercise_id)
);

-- Challenges table (static content)
CREATE TABLE challenges (
  id SERIAL PRIMARY KEY,
  navigator_domain TEXT DEFAULT 'quality_planning',
  title TEXT NOT NULL,
  scenario JSONB NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer CHAR(1) NOT NULL,
  feedback JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certificates table
CREATE TABLE certificates (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  navigator_domain TEXT DEFAULT 'quality_planning',
  certificate_code UUID DEFAULT uuid_generate_v4(),
  score_level TEXT NOT NULL,
  total_score INTEGER NOT NULL,
  time_completed INTEGER, -- in minutes
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  certificate_url TEXT
);

-- User analytics table
CREATE TABLE user_analytics (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  navigator_domain TEXT DEFAULT 'quality_planning',
  session_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_end TIMESTAMP WITH TIME ZONE,
  pages_visited JSONB,
  time_per_module JSONB,
  completion_rate DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin users table
CREATE TABLE admin_users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT DEFAULT 'admin',
  permissions JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content versions table (for admin management)
CREATE TABLE content_versions (
  id SERIAL PRIMARY KEY,
  navigator_domain TEXT DEFAULT 'quality_planning',
  content_type TEXT NOT NULL, -- 'challenge', 'exercise', 'video'
  content_id INTEGER NOT NULL,
  version INTEGER DEFAULT 1,
  content JSONB NOT NULL,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System analytics table
CREATE TABLE system_analytics (
  id SERIAL PRIMARY KEY,
  metric_name TEXT NOT NULL,
  metric_value JSONB NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_user_progress ON simulation_progress(user_id, navigator_domain, challenge_id);
CREATE INDEX idx_certificates ON certificates(user_id, navigator_domain, issued_at);
CREATE INDEX idx_analytics ON user_analytics(user_id, navigator_domain, session_start);
CREATE INDEX idx_challenges ON challenges(navigator_domain, id);
CREATE INDEX idx_exercises ON exercise_submissions(user_id, navigator_domain, exercise_id);
CREATE INDEX idx_user_profiles_domain ON user_profiles(navigator_domain);

-- Row Level Security (RLS) policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulation_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for simulation_progress
CREATE POLICY "Users can view own progress" ON simulation_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON simulation_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can upsert own progress" ON simulation_progress FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for exercise_submissions
CREATE POLICY "Users can view own submissions" ON exercise_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own submissions" ON exercise_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own submissions" ON exercise_submissions FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for certificates
CREATE POLICY "Users can view own certificates" ON certificates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own certificates" ON certificates FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_analytics
CREATE POLICY "Users can view own analytics" ON user_analytics FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own analytics" ON user_analytics FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public read access for challenges (static content)
CREATE POLICY "Challenges are publicly readable" ON challenges FOR SELECT USING (true);

-- Functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_simulation_progress_updated_at BEFORE UPDATE ON simulation_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_exercise_submissions_updated_at BEFORE UPDATE ON exercise_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial challenge data for Quality Planning Navigator
INSERT INTO challenges (id, title, scenario, question, options, correct_answer, feedback) VALUES
(1, 'Quality System Integration', '{"time": "Day 1 - Planning Kickoff Meeting", "description": "The turnaround manager has called the first planning meeting for Unit 200 - a high-pressure catalytic cracking unit. Engineering presents the preliminary scope: heat exchanger replacement, reactor catalyst change-out, and extensive piping modifications. The operations manager mentions that the last turnaround had significant quality issues - 15% rework rate and two regulatory findings.\n\nYou have 8 weeks until the turnaround begins. Quality planning decisions made now will determine execution success.\n\nThe Risk: Without proper quality system integration from day one, you''ll repeat past quality failures and face the same costly rework and compliance issues."}', 'The turnaround manager asks: ''How do we ensure quality requirements are properly integrated into this turnaround planning from the start?''', '{"A": "Focus on getting the schedule finalized first, then worry about quality requirements during execution", "B": "Assign quality planning exclusively to the QA/QC department to keep responsibilities clear", "C": "Integrate quality management system requirements into all planning deliverables from project initiation", "D": "Wait for engineering to finalize designs before addressing quality considerations"}', 'C', '{"A": {"correct": false, "message": "Quality cannot be added later without significantly disrupting established plans. Research shows that fixing quality issues during execution costs 10-15 times more than prevention during planning.", "guidingQuestion": "When is the most cost-effective time to address quality requirements - during planning or during execution?"}, "B": {"correct": false, "message": "Quality is a line responsibility, not just a QA/QC function. Planners must integrate quality requirements into work packages, not delegate this critical responsibility.", "guidingQuestion": "Who is responsible for translating quality requirements into executable work instructions?"}, "C": {"correct": true, "message": "Integrating quality management system requirements from project initiation ensures quality is built into the planning process rather than added as an afterthought. This prevention-focused approach significantly reduces execution problems.", "explanation": "Early quality integration provides cost effectiveness (prevention costs 1/10th of detection), schedule protection (reduces rework), regulatory compliance (captures all requirements), resource optimization (allows proper planning), and risk mitigation (identifies risks when mitigation is possible)."}, "D": {"correct": false, "message": "Quality planning must begin with conceptual design and continue throughout the project lifecycle. Waiting for final designs leaves insufficient time for comprehensive quality planning.", "guidingQuestion": "What''s the relationship between early quality planning and successful execution?"}}');