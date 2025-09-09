export const challengeContent = {
  1: {
    id: 1,
    title: "Quality System Integration",
    scenario: {
      time: "Day 1 - Planning Kickoff Meeting",
      description: "The turnaround manager has called the first planning meeting for Unit 200 - a high-pressure catalytic cracking unit. Engineering presents the preliminary scope: heat exchanger replacement, reactor catalyst change-out, and extensive piping modifications. The operations manager mentions that the last turnaround had significant quality issues - 15% rework rate and two regulatory findings.\n\nYou have 32 weeks until the turnaround begins. Quality planning decisions made now will determine execution success.\n\nThe Risk: Without proper quality system integration from day one, you'll repeat past quality failures and face the same costly rework and compliance issues."
    },
    question: "The turnaround manager asks: 'How do we ensure quality requirements are properly integrated into this turnaround planning from the start?'",
    options: {
      A: "Focus on getting the schedule finalized first, then worry about quality requirements during execution",
      B: "Assign quality planning exclusively to the QA/QC department to keep responsibilities clear",
      C: "Integrate quality management system requirements into all planning deliverables from project initiation",
      D: "Wait for engineering to finalize designs before addressing quality considerations"
    },
    correctAnswer: "C",
    feedback: {
      A: {
        correct: false,
        message: "Quality cannot be added later without significantly disrupting established plans. Research shows that fixing quality issues during execution costs 10-15 times more than prevention during planning.",
        guidingQuestion: "When is the most cost-effective time to address quality requirements - during planning or during execution?",
        explanation: "A Texas refinery took this approach and experienced 22% rework during their turnaround, extending duration by 4 days at a cost of $2.8 million per day in lost production."
      },
      B: {
        correct: false,
        message: "Quality is a line responsibility, not just a QA/QC function. Planners must integrate quality requirements into work packages, not delegate this critical responsibility.",
        guidingQuestion: "Who is responsible for translating quality requirements into executable work instructions?",
        explanation: "A chemical plant using this approach saw 18% of work packages returned for quality deficiencies, creating schedule delays and frustration for field teams."
      },
      C: {
        correct: true,
        message: "Integrating quality management system requirements from project initiation ensures quality is built into the planning process rather than added as an afterthought. This prevention-focused approach significantly reduces execution problems.",
        explanation: "Early quality integration provides cost effectiveness (prevention costs 1/10th of detection), schedule protection (reduces rework), regulatory compliance (captures all requirements), resource optimization (allows proper planning), and risk mitigation (identifies risks when mitigation is possible)."
      },
      D: {
        correct: false,
        message: "Quality planning must begin with conceptual design and continue throughout the project lifecycle. Waiting for final designs leaves insufficient time for comprehensive quality planning.",
        guidingQuestion: "What's the relationship between early quality planning and successful execution?",
        explanation: "A petrochemical project that delayed quality planning saw 25% of ITPs developed hastily without proper review, resulting in missed inspections and regulatory findings."
      }
    }
  },
  2: {
    id: 2,
    title: "QA vs QC Balance",
    scenario: {
      time: "Day 12 - Critical Equipment Planning",
      description: "You're planning the catalyst change-out in the main reactor - a high-risk activity involving confined space entry, heavy lifting, and precise installation tolerances. The catalyst supplier requires specific installation procedures, and operations has emphasized that contamination could ruin the entire catalyst load worth $2.3 million.\n\nThe Risk: Improper balance between Quality Assurance (prevention) and Quality Control (detection) approaches could result in either excessive costs from over-inspection or catastrophic contamination from under-prevention."
    },
    question: "The operations manager asks: 'This catalyst installation is critical. Should we focus on detailed inspection to catch any problems, or put our effort into preventing problems from occurring?'",
    options: {
      A: "Balance Quality Assurance prevention with targeted Quality Control verification at critical points",
      B: "Emphasize Quality Control with 100% inspection of all installation steps to ensure nothing goes wrong",
      C: "Focus primarily on Quality Assurance procedures and minimize inspection to speed installation",
      D: "Use the same QA/QC approach as previous turnarounds regardless of this activity's unique risks"
    },
    correctAnswer: "A",
    feedback: {
      A: {
        correct: true,
        message: "Balancing QA prevention with targeted QC verification optimizes quality outcomes while managing costs and schedule. This risk-based approach focuses resources where they deliver maximum value.",
        explanation: "This approach provides cost optimization (prevents most problems while verifying critical points), schedule efficiency (avoids over-inspection delays), risk mitigation (combines prevention with verification), resource effectiveness (allocates based on risk), and quality assurance (multiple defense layers)."
      },
      B: {
        correct: false,
        message: "100% inspection creates inefficiency without proportional quality improvement. Over-inspection can actually reduce quality by creating inspection fatigue and disrupting workflow.",
        guidingQuestion: "What's more effective - preventing problems or catching them after they occur?",
        explanation: "A refinery using 100% inspection on similar work experienced 35% productivity loss, extended the activity duration by 2 days, and still had contamination issues because prevention measures were inadequate."
      },
      C: {
        correct: false,
        message: "Even excellent prevention measures require verification for critical activities. This high-value, contamination-sensitive work demands strategic verification points to confirm prevention measures are working.",
        guidingQuestion: "How do you verify that prevention measures are actually working during execution?",
        explanation: "A chemical plant that minimized inspection on critical catalyst work had $1.8 million in catalyst contamination that wasn't discovered until startup, requiring complete replacement."
      },
      D: {
        correct: false,
        message: "Quality approaches must be risk-based and tailored to specific activities. Using generic approaches ignores the unique risks and requirements of high-value, contamination-sensitive work.",
        guidingQuestion: "How should quality approaches vary based on activity-specific risks and consequences?",
        explanation: "A petrochemical plant using standard approaches for specialized catalyst work experienced both contamination issues and schedule delays, demonstrating the worst of both worlds."
      }
    }
  },
  3: {
    id: 3,
    title: "Verification Planning (ITPs)",
    scenario: {
      time: "Day 18 - Heat Exchanger Replacement Planning",
      description: "The critical heat exchanger replacement involves removing a 15-ton unit and installing a new TEMA-compliant exchanger. This work requires coordination across mechanical, piping, electrical, and instrumentation disciplines. The new exchanger has tight tolerance requirements and specialized coating that requires specific handling procedures.\n\nThe Risk: Without comprehensive Inspection and Test Plans (ITPs), critical verification points could be missed, resulting in installation defects that aren't discovered until commissioning, potentially causing startup delays and rework."
    },
    question: "The construction superintendent asks: 'This heat exchanger installation has multiple critical steps across several trades. How do we ensure all quality requirements are properly verified without disrupting the work flow?'",
    options: {
      A: "Develop separate ITPs for each discipline and coordinate verification schedules independently",
      B: "Focus only on final inspection and testing since intermediate steps aren't critical",
      C: "Let each trade foreman determine their own inspection requirements based on experience",
      D: "Create one comprehensive ITP integrating all disciplines with logical sequencing and clear hold points"
    },
    correctAnswer: "D",
    feedback: {
      A: {
        correct: false,
        message: "Separate ITPs without integration create coordination problems, potential gaps, and conflicting verification schedules that can disrupt workflow and miss interface requirements.",
        guidingQuestion: "How do you ensure verification activities across multiple disciplines are properly coordinated and sequenced?",
        explanation: "A Gulf Coast refinery using separate ITPs experienced 12 hour delays when mechanical and piping inspections conflicted, and missed a critical interface verification that required rework during startup."
      },
      B: {
        correct: false,
        message: "Final inspection cannot verify concealed work or correct process defects that occur during installation. Many critical verification points must occur during execution before work is covered.",
        guidingQuestion: "Which verification activities must occur before work progresses to the next stage?",
        explanation: "A petrochemical plant focusing only on final inspection discovered foundation leveling issues after installation was complete, requiring complete removal and reinstallation at a cost of $180,000 and 5 days delay."
      },
      C: {
        correct: false,
        message: "Relying on individual experience without systematic planning leads to inconsistent verification, missed requirements, and potential compliance issues with codes and standards.",
        guidingQuestion: "What ensures all code and standard requirements are systematically verified regardless of individual experience levels?",
        explanation: "A chemical plant using this approach missed required TEMA verification points, resulting in regulatory findings and mandated re-inspection during the next shutdown."
      },
      D: {
        correct: true,
        message: "A comprehensive integrated ITP ensures all disciplines coordinate verification activities, maintains logical work sequencing, and establishes clear hold points where work cannot proceed without verification completion.",
        explanation: "This provides comprehensive coverage (all verification requirements), workflow integration (sequences verifications efficiently), clear communication (unambiguous responsibilities), risk management (hold points at critical stages), and compliance assurance (systematic code requirements)."
      }
    }
  },
  4: {
    id: 4,
    title: "Quality Integration in Work Packages",
    scenario: {
      time: "Day 25 - Work Package Development",
      description: "You're developing work packages for the complex piping modifications required for the heat exchanger installation. This involves 47 new welds across various piping systems, including some high-alloy materials requiring special procedures. The piping superintendent has mentioned that craft productivity on the last turnaround was poor because workers spent too much time figuring out quality requirements.\n\nThe Risk: Poor quality integration in work packages leads to confusion during execution, inconsistent quality application, productivity loss, and potential quality failures when workers don't clearly understand requirements."
    },
    question: "The piping superintendent asks: 'These work packages need to be crystal clear about quality requirements so my crews can work efficiently. How do we make sure quality requirements are embedded in a way that supports productivity rather than hindering it?'",
    options: {
      A: "Include a separate quality section at the end of each work package with all requirements listed",
      B: "Reference quality requirements to separate documents to keep work packages focused on execution steps",
      C: "Embed quality requirements directly within the step-by-step execution procedures where they apply",
      D: "Provide general quality guidance and let experienced workers determine specific requirements"
    },
    correctAnswer: "C",
    feedback: {
      A: {
        correct: false,
        message: "Separate quality sections are often overlooked during execution, and workers must constantly flip between execution steps and quality requirements, reducing productivity and increasing the chance of missed requirements.",
        guidingQuestion: "How can quality requirements be presented to support efficient workflow rather than disrupting it?",
        explanation: "A Texas chemical plant using this approach saw quality requirements missed in 28% of work packages, leading to significant rework and a 12% drop in craft productivity due to constant reference switching."
      },
      B: {
        correct: false,
        message: "External references break workflow continuity and increase the chance that quality requirements won't be consulted during busy execution periods. Workers need immediate access to requirements at the point of use.",
        guidingQuestion: "Where and when do workers need quality requirement information to be most effective?",
        explanation: "A Gulf Coast refinery using extensive references experienced 35% of quality requirements being overlooked because workers didn't have immediate access to referenced documents during execution."
      },
      C: {
        correct: true,
        message: "Embedding quality requirements directly within execution procedures creates seamless integration where workers see quality as an integral part of the work process, not an additional burden. This approach maximizes compliance while maintaining productivity.",
        explanation: "This provides workflow efficiency (no separate document references), higher compliance (requirements at right moment), reduced errors (clear context), improved productivity (eliminates search time), and consistent application (same integrated requirements for all workers)."
      },
      D: {
        correct: false,
        message: "Relying on worker experience creates inconsistent quality application and misses opportunities to communicate specific project requirements that may differ from past experience.",
        guidingQuestion: "How do you ensure consistent quality application across all workers regardless of their individual experience levels?",
        explanation: "A petrochemical plant using this approach had 22% variation in quality application across crews and missed several project-specific requirements that were different from standard practice."
      }
    }
  }
}