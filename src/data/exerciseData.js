export const exerciseContent = {
  1: {
    id: 1,
    title: "Quality Requirements Matrix",
    description: "Create a Quality Requirements Integration Matrix for the Unit 200 turnaround scope. This tool will ensure all quality requirements are systematically captured and assigned.",
    fields: [
      {
        id: 'mechanical_piping_codes',
        label: 'Mechanical/Piping - Applicable Codes/Standards',
        type: 'textarea',
        placeholder: 'List applicable codes and standards for mechanical/piping work...'
      },
      {
        id: 'mechanical_piping_requirements', 
        label: 'Mechanical/Piping - Key Quality Requirements',
        type: 'textarea',
        placeholder: 'Identify key quality requirements for mechanical/piping work...'
      },
      {
        id: 'mechanical_piping_verification',
        label: 'Mechanical/Piping - Verification Method',
        type: 'textarea', 
        placeholder: 'Define verification methods for mechanical/piping work...'
      },
      {
        id: 'pressure_vessel_codes',
        label: 'Pressure Vessels - Applicable Codes/Standards',
        type: 'textarea',
        placeholder: 'List applicable codes and standards for pressure vessel work...'
      },
      {
        id: 'pressure_vessel_requirements',
        label: 'Pressure Vessels - Key Quality Requirements', 
        type: 'textarea',
        placeholder: 'Identify key quality requirements for pressure vessel work...'
      },
      {
        id: 'pressure_vessel_verification',
        label: 'Pressure Vessels - Verification Method',
        type: 'textarea',
        placeholder: 'Define verification methods for pressure vessel work...'
      },
      {
        id: 'electrical_codes',
        label: 'Electrical - Applicable Codes/Standards',
        type: 'textarea', 
        placeholder: 'List applicable codes and standards for electrical work...'
      },
      {
        id: 'electrical_requirements',
        label: 'Electrical - Key Quality Requirements',
        type: 'textarea',
        placeholder: 'Identify key quality requirements for electrical work...'
      }
    ],
    modelAnswer: {
      sections: [
        {
          title: "Quality Requirements Framework",
          points: [
            "Mechanical/Piping: ASME B31.3, API 570 - Welding procedures, material certs, pressure testing, NDT requirements",
            "Pressure Vessels: ASME Sec VIII, API 510 - Design verification, fabrication oversight, relief valve certification", 
            "Electrical: NEC, IEEE Standards - Cable specifications, termination standards, grounding verification",
            "Instrumentation: ISA Standards, NFPA 70 - Calibration requirements, loop checking, safety system validation"
          ]
        },
        {
          title: "Verification Methods",
          points: [
            "Visual inspection, RT/PT, hydrostatic testing for piping systems",
            "Third-party inspection, code compliance review for pressure vessels",
            "Continuity testing, insulation resistance, functional checks for electrical",
            "Calibration certificates, loop tests, SIL verification for instrumentation"
          ]
        },
        {
          title: "Planning Deliverables",
          points: [
            "ITPs with hold points, qualified welder lists, material traceability matrices",
            "Vessel ITPs, relief valve test certificates, code compliance matrices", 
            "Electrical ITPs, test procedures, safety verification checklists",
            "Calibration schedules, loop check procedures, safety system ITPs"
          ]
        }
      ],
      keyTakeaways: [
        "Quality requirements must be systematically identified and integrated into planning deliverables from the start",
        "This matrix approach ensures nothing falls through the cracks during complex turnaround planning",
        "Early integration prevents costly rework and compliance issues during execution",
        "Systematic capture enables proper resource planning for quality verification activities"
      ]
    }
  },
  2: {
    id: 2,
    title: "QA/QC Balance Planning",
    description: "Design the QA/QC approach for the reactor catalyst installation. Balance prevention measures with verification points based on risk assessment.",
    fields: [
      {
        id: 'contamination_control',
        label: 'QA Prevention - Contamination Control',
        type: 'textarea',
        placeholder: 'Define contamination control measures...'
      },
      {
        id: 'procedure_development', 
        label: 'QA Prevention - Procedure Development',
        type: 'textarea',
        placeholder: 'Describe procedure development approach...'
      },
      {
        id: 'personnel_qualification',
        label: 'QA Prevention - Personnel Qualification',
        type: 'textarea',
        placeholder: 'Define personnel qualification requirements...'
      },
      {
        id: 'environmental_controls',
        label: 'QA Prevention - Environmental Controls',
        type: 'textarea',
        placeholder: 'Specify environmental control measures...'
      },
      {
        id: 'critical_hold_point',
        label: 'QC Verification - Critical Hold Point',
        type: 'textarea',
        placeholder: 'Define the most critical hold point...'
      },
      {
        id: 'witness_point',
        label: 'QC Verification - Witness Point',
        type: 'textarea',
        placeholder: 'Identify key witness point...'
      },
      {
        id: 'surveillance_activity',
        label: 'QC Verification - Surveillance Activity',
        type: 'textarea',
        placeholder: 'Define ongoing surveillance activities...'
      },
      {
        id: 'contamination_risk',
        label: 'Risk Assessment - Contamination Risk Priority',
        type: 'select',
        options: ['High', 'Medium', 'Low']
      }
    ],
    modelAnswer: {
      sections: [
        {
          title: "QA Prevention Measures",
          points: [
            "Contamination Control: Establish controlled access zones, provide dedicated tools, require clean room procedures, install filtration systems",
            "Procedure Development: Create step-by-step installation procedures with contamination checkpoints, define cleanliness standards, specify handling requirements",
            "Personnel Qualification: Verify catalyst installation training, confirm confined space certification, validate lifting equipment operators",
            "Environmental Controls: Monitor particulate levels, control humidity and temperature, establish positive pressure zones"
          ]
        },
        {
          title: "QC Verification Points",
          points: [
            "Critical Hold Point: Catalyst bed cleanliness verification before new catalyst loading (prevents $2.3M loss)",
            "Witness Point: Initial catalyst placement for proper distribution pattern",
            "Surveillance Activity: Ongoing monitoring of contamination controls during installation", 
            "Final Verification: Catalyst loading completeness and distribution uniformity"
          ]
        },
        {
          title: "Risk Assessment Results",
          points: [
            "Contamination Risk: HIGH - $2.3M catalyst value, difficult to detect until startup",
            "Installation Tolerance: HIGH - Affects reactor performance and catalyst life",
            "Personnel Safety: HIGH - Confined space and heavy lifting operations",
            "Schedule Impact: MEDIUM - Critical path activity with limited float"
          ]
        }
      ],
      keyTakeaways: [
        "Effective quality management balances prevention (QA) with verification (QC) based on risk assessment",
        "High-risk, high-value activities require both strong prevention measures and strategic verification points",
        "Prevention measures are more cost-effective than detection, but verification provides essential confidence",
        "Risk-based approach optimizes resource allocation for maximum quality impact"
      ]
    }
  },
  3: {
    id: 3,
    title: "Heat Exchanger ITP Development", 
    description: "Develop the integrated ITP for heat exchanger replacement, incorporating verification points across all disciplines with proper sequencing.",
    fields: [
      {
        id: 'isolation_verification',
        label: 'Phase 1 - Isolation Verification Requirements',
        type: 'textarea',
        placeholder: 'Define isolation verification requirements and acceptance criteria...'
      },
      {
        id: 'rigging_plan_approval',
        label: 'Phase 1 - Rigging Plan Approval Requirements',
        type: 'textarea', 
        placeholder: 'Define rigging plan approval requirements...'
      },
      {
        id: 'foundation_assessment',
        label: 'Phase 1 - Foundation Assessment Requirements',
        type: 'textarea',
        placeholder: 'Define foundation assessment requirements...'
      },
      {
        id: 'foundation_leveling',
        label: 'Phase 2 - Foundation Leveling Verification',
        type: 'textarea',
        placeholder: 'Define foundation leveling verification requirements...'
      },
      {
        id: 'anchor_bolt_torque',
        label: 'Phase 2 - Anchor Bolt Torque Verification',
        type: 'textarea',
        placeholder: 'Define anchor bolt torque verification requirements...'
      },
      {
        id: 'piping_alignment',
        label: 'Phase 2 - Piping Alignment Verification',
        type: 'textarea',
        placeholder: 'Define piping alignment verification requirements...'
      },
      {
        id: 'pressure_testing',
        label: 'Phase 3 - Pressure Testing Requirements',
        type: 'textarea',
        placeholder: 'Define pressure testing requirements...'
      },
      {
        id: 'electrical_continuity',
        label: 'Phase 3 - Electrical Continuity Verification',
        type: 'textarea',
        placeholder: 'Define electrical continuity verification requirements...'
      }
    ],
    modelAnswer: {
      sections: [
        {
          title: "Phase 1: Preparation & Demolition",
          points: [
            "Isolation Verification: Lock-out/tag-out completion, energy isolation confirmed (HOLD POINT) - Zero energy state verified by qualified operator",
            "Rigging Plan Approval: Lift plan review, equipment certification, operator qualification (HOLD POINT) - Signed lift plan, current equipment certs, qualified rigger assigned",
            "Foundation Assessment: Foundation condition, anchor bolt condition, level survey (WITNESS POINT) - No cracks >1/16\", anchor bolts within tolerance, level ±1/16\""
          ]
        },
        {
          title: "Phase 2: Installation & Connection", 
          points: [
            "Foundation Leveling: Grout placement, cure verification, final level check (HOLD POINT) - Grout fully cured, level within ±0.005\"/ft, no voids",
            "Anchor Bolt Torque: Torque verification, thread lubrication, sequence confirmation (WITNESS POINT) - Torque to 185 ft-lbs ±10%, proper thread engagement",
            "Piping Alignment: Flange alignment, bolt hole alignment, stress check (HOLD POINT) - Flange faces parallel ±1/16\", bolt holes align freely, no pipe stress"
          ]
        },
        {
          title: "Phase 3: Testing & Commissioning",
          points: [
            "Pressure Testing: Hydrostatic test, leak check, pressure relief verification (HOLD POINT) - Test pressure held 10 min, no leaks, relief valve set correctly",
            "Electrical Continuity: Circuit continuity, insulation resistance, grounding verification (WITNESS POINT) - <0.1 ohm resistance, >1 megohm insulation, <25 ohm ground",
            "Instrumentation Calibration: Sensor calibration, control loop verification, alarm testing (HOLD POINT) - ±0.5% accuracy, control response <2 sec, alarms functional"
          ]
        }
      ],
      keyTakeaways: [
        "Effective ITPs integrate verification requirements across all disciplines with logical sequencing",
        "Hold points prevent progression when critical verification is incomplete",
        "Witness points provide oversight without stopping work progression",
        "Systematic approach ensures comprehensive verification without workflow disruption"
      ]
    }
  },
  4: {
    id: 4,
    title: "Quality-Integrated Work Package Development",
    description: "Transform a basic piping installation procedure into a quality-integrated work package that embeds requirements seamlessly within execution steps.",
    fields: [
      {
        id: 'material_verification_step',
        label: 'Step 1 - Material and Tool Verification (Quality Integration)',
        type: 'textarea',
        placeholder: 'Enhance: Verify materials and tools are available...'
      },
      {
        id: 'positioning_alignment_step',
        label: 'Step 2 - Positioning and Alignment (Quality Integration)',
        type: 'textarea',
        placeholder: 'Enhance: Position pipe spool and verify alignment...'
      },
      {
        id: 'welding_execution_step',
        label: 'Step 3 - Welding Execution (Quality Integration)',
        type: 'textarea',
        placeholder: 'Enhance: Weld joint per applicable procedure...'
      },
      {
        id: 'documentation_verification_step',
        label: 'Step 4 - Documentation and Verification (Quality Integration)',
        type: 'textarea',
        placeholder: 'Enhance: Complete documentation...'
      },
      {
        id: 'quality_integration_approach',
        label: 'Quality Integration Strategy',
        type: 'textarea',
        placeholder: 'Describe your overall approach to embedding quality requirements...'
      },
      {
        id: 'productivity_considerations',
        label: 'Productivity Impact Considerations',
        type: 'textarea',
        placeholder: 'How does your integration approach support productivity?'
      },
      {
        id: 'compliance_assurance',
        label: 'Compliance Assurance Methods',
        type: 'textarea',
        placeholder: 'How do you ensure consistent quality application?'
      },
      {
        id: 'worker_clarity',
        label: 'Worker Clarity Enhancements',
        type: 'textarea',
        placeholder: 'How do your enhancements improve clarity for field workers?'
      }
    ],
    modelAnswer: {
      sections: [
        {
          title: "Quality-Integrated Work Steps",
          points: [
            "Step 1: ✓ Verify pipe spool matches isometric ISO-1234-A Rev 2 ✓ Check MTR for SA-106 Grade B ✓ Confirm welding rod ER70S-2 within expiry ✓ Verify welder qualification ✓ HOLD POINT: QC inspector verifies material traceability",
            "Step 2: ✓ Position spool using certified rigging per Lift Plan LP-789 ✓ Verify flange faces parallel within 1/16\" ✓ Check bolt holes align freely ✓ Maintain 1/8\" root gap per WPS-456 ✓ QUALITY CHECK: Measure gap at 4 points",
            "Step 3: ✓ Verify preheat to 250°F minimum ✓ Follow WPS-456 for parameters ✓ Stop welding if gap varies >1/32\" ✓ IN-PROCESS VERIFICATION: Visual inspect each pass ✓ HOLD POINT: QC inspector final visual per AWS D1.1",
            "Step 4: ✓ Complete Weld Data Sheet WDS-1234 ✓ Record welder ID and WPS number ✓ QUALITY VERIFICATION: Obtain QC signature ✓ Schedule NDT per ITP within 24 hours ✓ File documentation in quality records"
          ]
        },
        {
          title: "Integration Benefits",
          points: [
            "Workflow Efficiency: Workers don't need to reference separate documents or sections",
            "Higher Compliance: Quality requirements encountered at right moment in process",
            "Reduced Errors: Clear context prevents misapplication of generic requirements",
            "Improved Productivity: Eliminates time spent searching for quality information",
            "Consistent Application: All workers see same integrated requirements regardless of experience"
          ]
        },
        {
          title: "Implementation Success Factors",
          points: [
            "Embed requirements at point of use rather than in separate sections",
            "Use clear, specific language that relates directly to the work step",
            "Include measurable acceptance criteria that workers can verify",
            "Provide visual cues (checkboxes, bold text) to highlight quality requirements",
            "Test with actual field workers to ensure clarity and usability"
          ]
        }
      ],
      keyTakeaways: [
        "Quality-integrated work packages embed requirements directly within execution steps",
        "Quality becomes integral part of workflow rather than separate consideration",
        "This approach maximizes compliance while maintaining productivity and clarity",
        "Workers see quality as natural part of the work process, not additional burden"
      ]
    }
  }
}