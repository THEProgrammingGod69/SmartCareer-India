import React, { useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Button
} from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Use MUI's useTheme

// Your careers array (truncated for brevity; use your full array)
const careers = [
  {
    id: 1,
    title: 'Data Scientist',
    riskLevel: 4,
    rewardLevel: 9,
    risks: [
      'Rapidly changing technology',
      'Continuous upskilling required',
      'Project deadline pressure'
    ],
    rewards: [
      'High salary',
      'Strong job demand',
      'Opportunities across industries'
    ]
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Fast-changing trends',
      'Client-driven revisions',
      'Portfolio-driven hiring'
    ],
    rewards: [
      'Creative satisfaction',
      'Remote work options',
      'High demand in tech'
    ]
  },
  {
    id: 3,
    title: 'Digital Marketing Specialist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Algorithm changes impact work',
      'Performance pressure',
      'High competition'
    ],
    rewards: [
      'Diverse industry options',
      'Good salary',
      'Remote/freelance opportunities'
    ]
  },
  {
    id: 4,
    title: 'Full Stack Developer',
    riskLevel: 4,
    rewardLevel: 9,
    risks: [
      'Continuous learning required',
      'Long hours',
      'High competition'
    ],
    rewards: [
      'High salary',
      'Remote work options',
      'Strong job demand'
    ]
  },
  {
    id: 5,
    title: 'Financial Analyst',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Market volatility',
      'High stress',
      'Long hours'
    ],
    rewards: [
      'Good salary',
      'Prestige',
      'Opportunities for advancement'
    ]
  },
  {
    id: 6,
    title: 'Human Resources Manager',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Handling conflicts',
      'Changing labor laws',
      'High responsibility'
    ],
    rewards: [
      'Central role in organizations',
      'Job security',
      'Opportunities for advancement'
    ]
  },
  {
    id: 7,
    title: 'Cybersecurity Analyst',
    riskLevel: 4,
    rewardLevel: 9,
    risks: [
      'Continuous upskilling required',
      'High responsibility',
      'On-call for emergencies'
    ],
    rewards: [
      'High salary',
      'Strong job growth',
      'Critical to business security'
    ]
  },
  {
    id: 8,
    title: 'Product Manager',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'High responsibility',
      'Tight deadlines',
      'Cross-team pressure'
    ],
    rewards: [
      'Leadership opportunities',
      'High earning potential',
      'Influence on product direction'
    ]
  },
  {
    id: 9,
    title: 'Healthcare Administrator',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'High responsibility',
      'Regulatory complexity',
      'Long hours'
    ],
    rewards: [
      'Leadership roles',
      'Good salary',
      'Impact on healthcare delivery'
    ]
  },
  {
    id: 10,
    title: 'Renewable Energy Engineer',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Evolving technology',
      'Project-based work',
      'Fieldwork hazards'
    ],
    rewards: [
      'Contribution to sustainability',
      'High demand',
      'Innovation opportunities'
    ]
  },
  {
    id: 11,
    title: 'Accountant',
    riskLevel: 3,
    rewardLevel: 6,
    risks: [
      'High stress during tax season',
      'Long hours',
      'Continuous learning required'
    ],
    rewards: [
      'Good salary',
      'Job security',
      'Opportunities for advancement'
    ]
  },
  {
    id: 12,
    title: 'Actuarial Scientist',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Demanding certification exams',
      'High mathematical complexity',
      'Continuous learning required'
    ],
    rewards: [
      'High salary',
      'Job security',
      'Prestige in financial sector'
    ]
  },
  {
    id: 13,
    title: 'Acupressure Therapist',
    riskLevel: 3,
    rewardLevel: 6,
    risks: [
      'Income instability (private practice)',
      'Client trust required',
      'Continuous education'
    ],
    rewards: [
      'Helping others',
      'Flexible hours',
      'Growing wellness industry'
    ]
  },
  {
    id: 14,
    title: 'Acupuncturist',
    riskLevel: 3,
    rewardLevel: 6,
    risks: [
      'Income instability (private practice)',
      'Client trust required',
      'Continuous education'
    ],
    rewards: [
      'Helping others',
      'Flexible hours',
      'Growing wellness industry'
    ]
  },
  {
    id: 15,
    title: 'Adventure Sports Instructor',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Physical danger',
      'Seasonal work',
      'Income instability'
    ],
    rewards: [
      'Exciting work',
      'Travel opportunities',
      'Helping others'
    ]
  },
  {
    id: 16,
    title: 'Adventure Tourism Guide',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Physical danger',
      'Seasonal work',
      'Income instability'
    ],
    rewards: [
      'Exciting work',
      'Travel opportunities',
      'Helping others'
    ]
  },
  {
    id: 17,
    title: 'Advertising Executive',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Client-driven deadlines',
      'High competition',
      'Performance pressure'
    ],
    rewards: [
      'Creative work',
      'Good salary',
      'Opportunities for advancement'
    ]
  },
  {
    id: 18,
    title: 'Advocate General',
    riskLevel: 5,
    rewardLevel: 9,
    risks: [
      'High stress',
      'Long hours',
      'Public scrutiny'
    ],
    rewards: [
      'Prestige',
      'Influence',
      'High earning potential'
    ]
  },
  {
    id: 19,
    title: 'Paint Technology',
    riskLevel: 3,
    rewardLevel: 6,
    risks: [
      'Exposure to chemicals',
      'Technical complexity',
      'Continuous learning'
    ],
    rewards: [
      'Good salary',
      'Industry demand',
      'Innovation opportunities'
    ]
  },
  {
    id: 20,
    title: 'Painting',
    riskLevel: 3,
    rewardLevel: 6,
    risks: [
      'Income instability',
      'High competition',
      'Subjective success'
    ],
    rewards: [
      'Creative satisfaction',
      'Flexible work options',
      'Potential for recognition'
    ]
  },
  {
    id: 21,
    title: 'Paleontology',
    riskLevel: 3,
    rewardLevel: 6,
    risks: [
      'Limited job openings',
      'Fieldwork in remote areas',
      'Funding uncertainties'
    ],
    rewards: [
      'Contribution to science',
      'Research satisfaction',
      'Travel opportunities'
    ]
  },
  {
    id: 22,
    title: 'Paramilitary Forces',
    riskLevel: 5,
    rewardLevel: 7,
    risks: [
      'Physical danger',
      'Irregular hours',
      'High stress'
    ],
    rewards: [
      'Job security',
      'Prestige',
      'Serving the nation'
    ]
  },
  {
    id: 23,
    title: 'Patent Attorney',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Complex legal work',
      'Certification required',
      'Long hours'
    ],
    rewards: [
      'High earning potential',
      'Prestige',
      'Specialized expertise'
    ]
  },
  {
    id: 24,
    title: 'Pathology',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Lab safety hazards',
      'Long education path',
      'Emotional demands'
    ],
    rewards: [
      'Good salary',
      'Contribution to healthcare',
      'Job security'
    ]
  },
  {
    id: 25,
    title: 'Pediatrics',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Long education path',
      'Emotional demands',
      'High responsibility'
    ],
    rewards: [
      'High salary',
      'Helping children',
      'Prestige'
    ]
  },
  {
    id: 26,
    title: 'Perfusionist',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Technical complexity',
      'Long hours',
      'High responsibility'
    ],
    rewards: [
      'Good salary',
      'Critical healthcare role',
      'Job demand'
    ]
  },
  {
    id: 27,
    title: 'Pet Grooming',
    riskLevel: 2,
    rewardLevel: 5,
    risks: [
      'Physical demands',
      'Income instability',
      'Client management'
    ],
    rewards: [
      'Helping animals',
      'Flexible hours',
      'Growing industry'
    ]
  },
  {
    id: 28,
    title: 'Petroleum Engineering',
    riskLevel: 5,
    rewardLevel: 9,
    risks: [
      'On-site hazards',
      'Remote locations',
      'Market volatility'
    ],
    rewards: [
      'Very high salary',
      'Job variety',
      'Opportunities for advancement'
    ]
  },
  {
    id: 29,
    title: 'Pharmaceutical Engineering/Technology',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Technical complexity',
      'Regulatory requirements',
      'Continuous learning'
    ],
    rewards: [
      'High salary',
      'Innovation opportunities',
      'Industry demand'
    ]
  },
  {
    id: 30,
    title: 'Pharmacy',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Long education',
      'Regulatory requirements',
      'Attention to detail required'
    ],
    rewards: [
      'Good salary',
      'Job security',
      'Opportunities in multiple sectors'
    ]
  },
  {
    id: 31,
    title: 'Photography',
    riskLevel: 3,
    rewardLevel: 6,
    risks: [
      'Income instability',
      'High competition',
      'Client-driven deadlines'
    ],
    rewards: [
      'Creative satisfaction',
      'Flexible work options',
      'Potential for recognition'
    ]
  },
  {
    id: 32,
    title: 'Photojournalism',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Physical danger',
      'Tight deadlines',
      'Job insecurity'
    ],
    rewards: [
      'Travel opportunities',
      'Influence public opinion',
      'Prestige'
    ]
  },
  {
    id: 33,
    title: 'Photonics',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Technical complexity',
      'Continuous learning',
      'Research funding uncertainty'
    ],
    rewards: [
      'High salary',
      'Cutting-edge research',
      'Growing industry'
    ]
  },
  {
    id: 34,
    title: 'Physics',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'High competition in academia',
      'May require advanced degrees',
      'Funding uncertainties'
    ],
    rewards: [
      'Intellectual satisfaction',
      'Opportunities in research and teaching',
      'Contribution to science'
    ]
  },
  {
    id: 35,
    title: 'Physiotherapy',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Physical strain',
      'Emotional demands',
      'Regulatory requirements'
    ],
    rewards: [
      'Ability to help people',
      'Job security',
      'Growing field'
    ]
  },
  {
    id: 36,
    title: 'Pisciculture',
    riskLevel: 3,
    rewardLevel: 6,
    risks: [
      'Exposure to outdoor work',
      'Market volatility',
      'Physical demands'
    ],
    rewards: [
      'Contribution to food security',
      'Job variety',
      'Industry demand'
    ]
  },
  {
    id: 37,
    title: 'Plant Pathology',
    riskLevel: 3,
    rewardLevel: 6,
    risks: [
      'Fieldwork in challenging environments',
      'Research funding uncertainty',
      'High competition'
    ],
    rewards: [
      'Contribution to agriculture',
      'Job variety',
      'Growing field'
    ]
  },
  {
    id: 38,
    title: 'Plant Taxonomy',
    riskLevel: 3,
    rewardLevel: 6,
    risks: [
      'Fieldwork in remote locations',
      'Limited job openings',
      'Research funding uncertainty'
    ],
    rewards: [
      'Contribution to science',
      'Job variety',
      'Research satisfaction'
    ]
  },
  {
    id: 39,
    title: 'Plastic Surgery',
    riskLevel: 5,
    rewardLevel: 9,
    risks: [
      'Long education path',
      'High responsibility',
      'Emotional demands'
    ],
    rewards: [
      'Very high salary',
      'Prestige',
      'Helping patients'
    ]
  },
  {
    id: 40,
    title: 'Police Services',
    riskLevel: 5,
    rewardLevel: 7,
    risks: [
      'Physical danger',
      'Irregular hours',
      'High stress'
    ],
    rewards: [
      'Job security',
      'Prestige',
      'Serving the nation'
    ]
  },
  {
    id: 41,
    title: 'Political Science',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Limited job openings',
      'High competition',
      'May require advanced degrees'
    ],
    rewards: [
      'Opportunities in research and teaching',
      'Influence on policy',
      'Intellectual satisfaction'
    ]
  },
  {
    id: 42,
    title: 'Polymer/Plastic Engineering',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Technical complexity',
      'Exposure to chemicals',
      'Continuous learning'
    ],
    rewards: [
      'Good salary',
      'Industry demand',
      'Innovation opportunities'
    ]
  },
  {
    id: 43,
    title: 'Print Technology',
    riskLevel: 3,
    rewardLevel: 6,
    risks: [
      'Changing industry trends',
      'Technical complexity',
      'Project deadlines'
    ],
    rewards: [
      'Job variety',
      'Industry demand',
      'Opportunities for advancement'
    ]
  },
  {
    id: 44,
    title: 'Prosthetics and Orthotics',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Technical complexity',
      'High responsibility',
      'Continuous learning'
    ],
    rewards: [
      'Helping others',
      'Job security',
      'Growing field'
    ]
  },
  {
    id: 45,
    title: 'Psychiatry',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Long education path',
      'Emotional demands',
      'High responsibility'
    ],
    rewards: [
      'High salary',
      'Helping others',
      'Prestige'
    ]
  },
  {
    id: 46,
    title: 'Psychology',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Emotional demands',
      'May require advanced degrees',
      'High competition'
    ],
    rewards: [
      'Ability to help people',
      'Diverse career paths',
      'Growing field'
    ]
  },
  {
    id: 47,
    title: 'Public Health',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Fieldwork in challenging environments',
      'High responsibility',
      'Regulatory complexity'
    ],
    rewards: [
      'Contribution to community health',
      'Job security',
      'Growing field'
    ]
  },
  {
    id: 48,
    title: 'Public Prosecutor',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'High stress',
      'Long hours',
      'Public scrutiny'
    ],
    rewards: [
      'Prestige',
      'Influence',
      'Job security'
    ]
  },
  {
    id: 49,
    title: 'Public Relation',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'High pressure during crises',
      'Client demands',
      'Fast-paced environment'
    ],
    rewards: [
      'Networking opportunities',
      'Creative work',
      'Diverse industries'
    ]
  },
  {
    id: 50,
    title: 'Purchase Management',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'High responsibility',
      'Tight deadlines',
      'Complex supply chains'
    ],
    rewards: [
      'Job variety',
      'Good salary',
      'Opportunities for advancement'
    ]
  },
  {
    id: 51,
    title: 'Quality Assurance Management',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'High responsibility for product quality',
      'Strict regulatory compliance',
      'Pressure to meet deadlines'
    ],
    rewards: [
      'Job security',
      'Opportunities for advancement',
      'Critical role in organizations'
    ]
  },
  {
    id: 52,
    title: 'Radio Jockey',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Irregular working hours',
      'Performance pressure',
      'High competition'
    ],
    rewards: [
      'Creative expression',
      'Public recognition',
      'Diverse opportunities in media'
    ]
  },
  {
    id: 53,
    title: 'Radiography',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Exposure to radiation',
      'Physical demands',
      'Emotional stress'
    ],
    rewards: [
      'Job security',
      'Contribution to healthcare',
      'Growing demand'
    ]
  },
  {
    id: 54,
    title: 'Railway Protective Force (RPF)',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Physical danger',
      'Irregular hours',
      'High stress'
    ],
    rewards: [
      'Job security',
      'Prestige',
      'Serving the public'
    ]
  },
  {
    id: 55,
    title: 'Railway Engineer',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Technical complexity',
      'Fieldwork hazards',
      'Project deadlines'
    ],
    rewards: [
      'Good salary',
      'Job security',
      'Opportunities for advancement'
    ]
  },
  {
    id: 56,
    title: 'Agricultural Economist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Market fluctuations',
      'Fieldwork in rural areas',
      'Research funding uncertainty'
    ],
    rewards: [
      'Impact on food policy',
      'Diverse job opportunities',
      'Job security'
    ]
  },
  {
    id: 57,
    title: 'Agricultural Engineer',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Exposure to outdoor work',
      'Fluctuating industry demand',
      'Continuous learning required'
    ],
    rewards: [
      'Good salary',
      'Impact on food security',
      'Job variety'
    ]
  },
  {
    id: 58,
    title: 'Agricultural Scientist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Fieldwork in rural areas',
      'Research funding uncertainty',
      'High competition'
    ],
    rewards: [
      'Contribution to food security',
      'Job variety',
      'Growing demand'
    ]
  },
  {
    id: 59,
    title: 'Agronomist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Fieldwork in rural areas',
      'Research funding uncertainty',
      'High competition'
    ],
    rewards: [
      'Contribution to agriculture',
      'Job variety',
      'Growing demand'
    ]
  },
  {
    id: 60,
    title: 'Air Hostess/Flight Attendant',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Irregular hours',
      'Physical and emotional demands',
      'Job insecurity during downturns'
    ],
    rewards: [
      'Travel opportunities',
      'Good salary',
      'Prestige'
    ]
  },
  {
    id: 61,
    title: 'Air Traffic Controller',
    riskLevel: 5,
    rewardLevel: 8,
    risks: [
      'High stress',
      'Irregular hours',
      'High responsibility'
    ],
    rewards: [
      'High salary',
      'Prestige',
      'Critical role in aviation safety'
    ]
  },
  {
    id: 62,
    title: 'Anchor/Presenter',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Performance pressure',
      'High competition',
      'Public scrutiny'
    ],
    rewards: [
      'Public recognition',
      'Creative expression',
      'Opportunities in media'
    ]
  },
  {
    id: 63,
    title: 'Anesthesiologist',
    riskLevel: 5,
    rewardLevel: 9,
    risks: [
      'High responsibility',
      'Long and irregular hours',
      'Emotional stress'
    ],
    rewards: [
      'Very high salary',
      'Prestige',
      'Critical healthcare role'
    ]
  },
  {
    id: 64,
    title: 'Animal Trainer',
    riskLevel: 3,
    rewardLevel: 6,
    risks: [
      'Physical demands',
      'Risk of injury',
      'Income instability'
    ],
    rewards: [
      'Working with animals',
      'Job satisfaction',
      'Flexible hours'
    ]
  },
  {
    id: 65,
    title: 'Animator',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Long hours',
      'Tight deadlines',
      'High competition'
    ],
    rewards: [
      'Creative work',
      'Growing industry',
      'Opportunities in film/games'
    ]
  },
  {
    id: 66,
    title: 'Anthropologist',
    riskLevel: 3,
    rewardLevel: 6,
    risks: [
      'Limited job openings',
      'Fieldwork in remote areas',
      'Research funding uncertainty'
    ],
    rewards: [
      'Academic prestige',
      'Travel opportunities',
      'Contribution to human knowledge'
    ]
  },
  {
    id: 67,
    title: 'Aquaculture Specialist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Fieldwork in challenging environments',
      'Market fluctuations',
      'Physical demands'
    ],
    rewards: [
      'Contribution to food security',
      'Job variety',
      'Growing demand'
    ]
  },
  {
    id: 68,
    title: 'Archaeologist',
    riskLevel: 3,
    rewardLevel: 6,
    risks: [
      'Fieldwork in remote locations',
      'Funding uncertainties',
      'Limited job openings'
    ],
    rewards: [
      'Contribution to history',
      'Travel opportunities',
      'Research satisfaction'
    ]
  },
  {
    id: 69,
    title: 'Architectural Engineer',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Technical complexity',
      'Long hours',
      'Project deadlines'
    ],
    rewards: [
      'Creative satisfaction',
      'Good salary',
      'Impact on built environment'
    ]
  },
  {
    id: 70,
    title: 'Archivist',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Limited job openings',
      'Low salary in some regions',
      'Changing technology'
    ],
    rewards: [
      'Job security',
      'Intellectual satisfaction',
      'Preserving history'
    ]
  },
  {
    id: 71,
    title: 'Aromatherapist',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Income instability',
      'Client trust required',
      'Regulatory uncertainty'
    ],
    rewards: [
      'Helping others',
      'Flexible hours',
      'Growing wellness industry'
    ]
  },
  {
    id: 72,
    title: 'Assistant District Attorney',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'High stress',
      'Long hours',
      'Public scrutiny'
    ],
    rewards: [
      'Prestige',
      'Influence',
      'Job security'
    ]
  },
  {
    id: 73,
    title: 'Astronomer',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Limited job openings',
      'Requires advanced degrees',
      'Funding uncertainties'
    ],
    rewards: [
      'Academic prestige',
      'Research opportunities',
      'Contribution to science'
    ]
  },
  {
    id: 74,
    title: 'Attorney General',
    riskLevel: 5,
    rewardLevel: 9,
    risks: [
      'High stress',
      'Long hours',
      'Public scrutiny'
    ],
    rewards: [
      'Prestige',
      'Influence',
      'High earning potential'
    ]
  },
  {
    id: 75,
    title: 'Audio Engineer',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Long hours',
      'Tight deadlines',
      'Income instability (freelancers)'
    ],
    rewards: [
      'Creative work',
      'Opportunities in media/music',
      'Growing industry'
    ]
  },
  {
    id: 76,
    title: 'Auditor',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'High responsibility',
      'Long hours during audit season',
      'Continuous learning'
    ],
    rewards: [
      'Good salary',
      'Job security',
      'Opportunities for advancement'
    ]
  },
  {
    id: 77,
    title: 'Automobile Engineer',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Technical complexity',
      'On-site hazards',
      'Changing industry trends'
    ],
    rewards: [
      'Good salary',
      'Innovation opportunities',
      'Diverse job roles'
    ]
  },
  {
    id: 78,
    title: 'Ayurvedic Practitioner',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Income instability (private practice)',
      'Regulatory requirements',
      'Client trust required'
    ],
    rewards: [
      'Helping others',
      'Flexible hours',
      'Growing wellness industry'
    ]
  },
  {
    id: 79,
    title: 'Accountancy',
    riskLevel: 3,
    rewardLevel: 6,
    risks: [
      'High stress during tax season',
      'Long hours',
      'Continuous learning required'
    ],
    rewards: [
      'Good salary',
      'Job security',
      'Opportunities for advancement'
    ]
  },
  {
    id: 80,
    title: 'Actuarial Science',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'High mathematical complexity',
      'Demanding certification exams',
      'Continuous learning required'
    ],
    rewards: [
      'High salary',
      'Job security',
      'Prestige in financial sector'
    ]
  },
  {
    id: 81,
    title: 'Acupressure Therapy',
    riskLevel: 3,
    rewardLevel: 6,
    risks: [
      'Income instability (private practice)',
      'Client trust required',
      'Continuous education'
    ],
    rewards: [
      'Helping others',
      'Flexible hours',
      'Growing wellness industry'
    ]
  },
  {
    id: 82,
    title: 'Acupuncture',
    riskLevel: 3,
    rewardLevel: 6,
    risks: [
      'Income instability (private practice)',
      'Client trust required',
      'Continuous education'
    ],
    rewards: [
      'Helping others',
      'Flexible hours',
      'Growing wellness industry'
    ]
  },
  {
    id: 83,
    title: 'Adventure Sports',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Physical danger',
      'Seasonal work',
      'Income instability'
    ],
    rewards: [
      'Exciting work',
      'Travel opportunities',
      'Helping others'
    ]
  },
  {
    id: 84,
    title: 'Adventure Tourism',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Physical danger',
      'Seasonal work',
      'Income instability'
    ],
    rewards: [
      'Exciting work',
      'Travel opportunities',
      'Helping others'
    ]
  },
  {
    id: 85,
    title: 'Advertising',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Client-driven deadlines',
      'High competition',
      'Performance pressure'
    ],
    rewards: [
      'Creative work',
      'Good salary',
      'Opportunities for advancement'
    ]
  },
  {
    id: 86,
    title: 'Ecologist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Fieldwork in challenging environments',
      'Research funding uncertainty',
      'High competition'
    ],
    rewards: [
      'Contribution to sustainability',
      'Job variety',
      'Growing field'
    ]
  },
  {
    id: 87,
    title: 'Economist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'High competition in academia',
      'May require advanced degrees',
      'Economic cycles affect demand'
    ],
    rewards: [
      'Good salary',
      'Opportunities in public and private sectors',
      'Influence on policy'
    ]
  },
  {
    id: 88,
    title: 'Electrical Engineer',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Technical complexity',
      'On-site hazards',
      'Continuous upskilling required'
    ],
    rewards: [
      'Good salary',
      'Diverse job opportunities',
      'Innovation potential'
    ]
  },
  {
    id: 89,
    title: 'Electrician',
    riskLevel: 3,
    rewardLevel: 6,
    risks: [
      'Physical danger',
      'Irregular hours',
      'Income instability (self-employed)'
    ],
    rewards: [
      'Job variety',
      'Practical skills',
      'Job security'
    ]
  },
  {
    id: 90,
    title: 'Electrologist',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Income instability (private practice)',
      'Client trust required',
      'Regulatory uncertainty'
    ],
    rewards: [
      'Helping others',
      'Flexible hours',
      'Growing wellness industry'
    ]
  },
  {
    id: 91,
    title: 'Electronics Engineer',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Technical complexity',
      'Continuous upskilling required',
      'Project deadlines'
    ],
    rewards: [
      'Good salary',
      'Diverse job opportunities',
      'Innovation potential'
    ]
  },
  {
    id: 92,
    title: 'Engineer',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Technical complexity',
      'Project deadlines',
      'Continuous upskilling required'
    ],
    rewards: [
      'Good salary',
      'Diverse job opportunities',
      'Innovation potential'
    ]
  },
  {
    id: 93,
    title: 'Entomologist',
    riskLevel: 3,
    rewardLevel: 6,
    risks: [
      'Fieldwork in challenging environments',
      'Research funding uncertainty',
      'High competition'
    ],
    rewards: [
      'Contribution to science',
      'Job variety',
      'Research satisfaction'
    ]
  },
  {
    id: 94,
    title: 'Insurance Underwriter',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Market volatility',
      'Performance pressure',
      'Continuous learning'
    ],
    rewards: [
      'Job security',
      'Good salary',
      'Opportunities for advancement'
    ]
  },
  {
    id: 95,
    title: 'Intellectual Property Attorney',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Complex legal work',
      'Certification required',
      'Long hours'
    ],
    rewards: [
      'High earning potential',
      'Prestige',
      'Specialized expertise'
    ]
  },
  {
    id: 96,
    title: 'Intelligence Service Officer',
    riskLevel: 5,
    rewardLevel: 8,
    risks: [
      'Physical danger',
      'High stress',
      'Irregular hours'
    ],
    rewards: [
      'Prestige',
      'Serving the nation',
      'Job security'
    ]
  },
  {
    id: 97,
    title: 'Interior Designer',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Client-driven deadlines',
      'Income instability (for freelancers)',
      'Changing trends'
    ],
    rewards: [
      'Creative satisfaction',
      'Flexible work options',
      'Diverse projects'
    ]
  },
  {
    id: 98,
    title: 'International Business Specialist',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Travel requirements',
      'Cultural adaptation',
      'Market volatility'
    ],
    rewards: [
      'High salary',
      'Global exposure',
      'Opportunities for advancement'
    ]
  },
  {
    id: 99,
    title: 'IoT Developer',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Rapidly changing technology',
      'Continuous upskilling required',
      'Security challenges'
    ],
    rewards: [
      'High salary',
      'Strong job demand',
      'Opportunities across industries'
    ]
  },
  {
    id: 100,
    title: 'Investment Manager',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Market volatility',
      'High responsibility',
      'Performance pressure'
    ],
    rewards: [
      'High salary',
      'Prestige',
      'Opportunities for advancement'
    ]
  },
  {
    id: 101,
    title: 'Jewellery Designer',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'High competition',
      'Changing fashion trends',
      'Income instability (freelancers)'
    ],
    rewards: [
      'Creative satisfaction',
      'Potential for recognition',
      'Flexible work options'
    ]
  },
  {
    id: 102,
    title: 'Journalist',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Tight deadlines',
      'Job insecurity',
      'Exposure to dangerous situations'
    ],
    rewards: [
      'Influence public opinion',
      'Travel opportunities',
      'Prestige'
    ]
  },
  {
    id: 103,
    title: 'Judge',
    riskLevel: 5,
    rewardLevel: 9,
    risks: [
      'High responsibility',
      'Public scrutiny',
      'Emotional stress'
    ],
    rewards: [
      'Prestige',
      'Job security',
      'Influence on society'
    ]
  },
  {
    id: 104,
    title: 'Law Professional',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Long hours',
      'High stress',
      'Competitive field'
    ],
    rewards: [
      'High earning potential',
      'Prestige',
      'Ability to make a difference'
    ]
  },
  {
    id: 105,
    title: 'Leather Technologist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Exposure to chemicals',
      'Changing industry trends',
      'Technical complexity'
    ],
    rewards: [
      'Good salary',
      'Industry demand',
      'Innovation opportunities'
    ]
  },
  {
    id: 106,
    title: 'Lexicographer',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Limited job openings',
      'High competition',
      'Niche field'
    ],
    rewards: [
      'Intellectual satisfaction',
      'Contribution to language',
      'Flexible work options'
    ]
  },
  {
    id: 107,
    title: 'Librarian',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Limited job openings',
      'Low salary in some regions',
      'Changing technology'
    ],
    rewards: [
      'Job security',
      'Intellectual satisfaction',
      'Community impact'
    ]
  },
  {
    id: 108,
    title: 'Lift Technician',
    riskLevel: 3,
    rewardLevel: 6,
    risks: [
      'Physical danger',
      'Irregular hours',
      'Technical complexity'
    ],
    rewards: [
      'Job security',
      'Practical skills',
      'Industry demand'
    ]
  },
  {
    id: 109,
    title: 'Linguist',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Limited job openings',
      'High competition',
      'Niche field'
    ],
    rewards: [
      'Intellectual satisfaction',
      'Opportunities in research and teaching',
      'Flexible work options'
    ]
  },
  {
    id: 110,
    title: 'Logistics Manager',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'High responsibility',
      'Tight deadlines',
      'Complex supply chains'
    ],
    rewards: [
      'Job variety',
      'Good salary',
      'Opportunities for advancement'
    ]
  },
  {
    id: 111,
    title: 'Magnetic Therapist',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Income instability',
      'Client trust required',
      'Regulatory uncertainty'
    ],
    rewards: [
      'Helping others',
      'Flexible hours',
      'Growing wellness industry'
    ]
  },
  {
    id: 112,
    title: 'Makeup Artist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'High competition',
      'Changing fashion trends',
      'Income instability (freelancers)'
    ],
    rewards: [
      'Creative satisfaction',
      'Potential for recognition',
      'Flexible work options'
    ]
  },
  {
    id: 113,
    title: 'Marine Biologist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Fieldwork in remote locations',
      'Funding uncertainties',
      'Exposure to hazards'
    ],
    rewards: [
      'Contribution to science',
      'Opportunities in research and teaching',
      'Work with marine life'
    ]
  },
  {
    id: 114,
    title: 'Marine Engineer',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'On-site hazards',
      'Remote locations',
      'Technical complexity'
    ],
    rewards: [
      'High salary',
      'Job variety',
      'Opportunities for advancement'
    ]
  },
  {
    id: 115,
    title: 'Marketing Manager',
    riskLevel: 3,
    rewardLevel: 8,
    risks: [
      'Performance pressure',
      'Changing trends',
      'Client demands'
    ],
    rewards: [
      'Leadership opportunities',
      'Good salary',
      'Diverse industries'
    ]
  },
  {
    id: 116,
    title: 'Mathematician',
    riskLevel: 2,
    rewardLevel: 7,
    risks: [
      'High competition in academia',
      'May require advanced degrees',
      'Limited job openings'
    ],
    rewards: [
      'Intellectual satisfaction',
      'Opportunities in research and teaching',
      'Critical thinking skills'
    ]
  },
  {
    id: 117,
    title: 'Mechanical Engineer',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Technical complexity',
      'On-site hazards',
      'Project deadlines'
    ],
    rewards: [
      'Good salary',
      'Diverse job opportunities',
      'Innovation potential'
    ]
  },
  {
    id: 118,
    title: 'Mechatronics Engineer',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Technical complexity',
      'Continuous upskilling required',
      'Project deadlines'
    ],
    rewards: [
      'High salary',
      'Innovation opportunities',
      'Growing industry'
    ]
  },
  {
    id: 119,
    title: 'Medical Doctor',
    riskLevel: 5,
    rewardLevel: 9,
    risks: [
      'Long and expensive education',
      'High stress and responsibility',
      'Long hours'
    ],
    rewards: [
      'Very high salary',
      'Prestige',
      'Ability to save lives'
    ]
  },
  {
    id: 120,
    title: 'Medical Lab Technologist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Lab safety hazards',
      'Irregular hours',
      'Attention to detail required'
    ],
    rewards: [
      'Job security',
      'Contribution to healthcare',
      'Diverse job settings'
    ]
  },
  {
    id: 121,
    title: 'Medical Tourism Coordinator',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Travel requirements',
      'Client management stress',
      'Market fluctuations'
    ],
    rewards: [
      'Global exposure',
      'Job variety',
      'Growing industry'
    ]
  },
  {
    id: 122,
    title: 'Medical Transcriptionist',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Repetitive work',
      'Tight deadlines',
      'Income instability (freelancers)'
    ],
    rewards: [
      'Flexible work options',
      'Remote work',
      'Job security'
    ]
  },
  {
    id: 123,
    title: 'Merchant Navy Officer',
    riskLevel: 5,
    rewardLevel: 8,
    risks: [
      'Long periods away from home',
      'Physical danger',
      'Irregular hours'
    ],
    rewards: [
      'High salary',
      'Travel opportunities',
      'Prestige'
    ]
  },
  {
    id: 124,
    title: 'Metallurgical Engineer',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Exposure to hazardous materials',
      'Technical complexity',
      'Project deadlines'
    ],
    rewards: [
      'Good salary',
      'Industry demand',
      'Innovation opportunities'
    ]
  },
  {
    id: 125,
    title: 'Meteorologist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Irregular hours',
      'Fieldwork in harsh conditions',
      'Public scrutiny'
    ],
    rewards: [
      'Contribution to science',
      'Job variety',
      'Growing demand'
    ]
  },
  {
    id: 126,
    title: 'Microbiologist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Lab safety hazards',
      'May require advanced degrees',
      'Funding uncertainties'
    ],
    rewards: [
      'Opportunities in research and industry',
      'Contribution to science',
      'Job variety'
    ]
  },
  {
    id: 127,
    title: 'Mining Engineer',
    riskLevel: 5,
    rewardLevel: 8,
    risks: [
      'On-site hazards',
      'Remote locations',
      'Economic cycles affect demand'
    ],
    rewards: [
      'High salary',
      'Job variety',
      'Opportunities for advancement'
    ]
  },
  {
    id: 128,
    title: 'Model',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Income instability',
      'High competition',
      'Subjective success'
    ],
    rewards: [
      'Potential for fame',
      'Creative satisfaction',
      'Travel opportunities'
    ]
  },
  {
    id: 129,
    title: 'Museologist',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Limited job openings',
      'Low salary in some regions',
      'Niche field'
    ],
    rewards: [
      'Job security',
      'Preserving history',
      'Intellectual satisfaction'
    ]
  },
  {
    id: 130,
    title: 'Musician',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Income instability',
      'High competition',
      'Subjective success'
    ],
    rewards: [
      'Creative satisfaction',
      'Potential for fame',
      'Flexible work options'
    ]
  },
  {
    id: 131,
    title: 'Music Composer',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Income instability',
      'High competition',
      'Subjective success'
    ],
    rewards: [
      'Creative satisfaction',
      'Potential for fame',
      'Flexible work options'
    ]
  },
  {
    id: 132,
    title: 'Music Therapist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Income instability',
      'Client trust required',
      'Regulatory uncertainty'
    ],
    rewards: [
      'Helping others',
      'Creative satisfaction',
      'Growing wellness industry'
    ]
  },
  {
    id: 133,
    title: 'Nanotechnologist',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Technical complexity',
      'Requires advanced degrees',
      'Funding uncertainties'
    ],
    rewards: [
      'High salary',
      'Cutting-edge research',
      'Growing field'
    ]
  },
  {
    id: 134,
    title: 'National Security Guard',
    riskLevel: 5,
    rewardLevel: 8,
    risks: [
      'Physical danger',
      'High stress',
      'Irregular hours'
    ],
    rewards: [
      'Prestige',
      'Serving the nation',
      'Job security'
    ]
  },
  {
    id: 135,
    title: 'Naturopath',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Income instability (private practice)',
      'Regulatory requirements',
      'Client trust required'
    ],
    rewards: [
      'Helping others',
      'Flexible hours',
      'Growing wellness industry'
    ]
  },
  {
    id: 136,
    title: 'Nephrologist',
    riskLevel: 5,
    rewardLevel: 9,
    risks: [
      'Long education path',
      'High responsibility',
      'Emotional demands'
    ],
    rewards: [
      'Very high salary',
      'Prestige',
      'Helping patients'
    ]
  },
  {
    id: 137,
    title: 'Neurologist',
    riskLevel: 5,
    rewardLevel: 9,
    risks: [
      'Long education path',
      'High responsibility',
      'Emotional demands'
    ],
    rewards: [
      'Very high salary',
      'Prestige',
      'Helping patients'
    ]
  },
  {
    id: 138,
    title: 'Notary',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Limited job openings',
      'Regulatory requirements',
      'Repetitive work'
    ],
    rewards: [
      'Job security',
      'Public trust',
      'Flexible work options'
    ]
  },
  {
    id: 139,
    title: 'Nuclear Engineer',
    riskLevel: 5,
    rewardLevel: 9,
    risks: [
      'On-site hazards',
      'Technical complexity',
      'Regulatory scrutiny'
    ],
    rewards: [
      'Very high salary',
      'Job variety',
      'Opportunities for advancement'
    ]
  },
  {
    id: 140,
    title: 'Nursery Teacher',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Modest salary',
      'Emotional demands',
      'Workload outside classroom'
    ],
    rewards: [
      'Job security',
      'Ability to shape young minds',
      'Prestige in community'
    ]
  },
  {
    id: 141,
    title: 'Nurse',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Long shifts',
      'Emotional and physical demands',
      'Exposure to illness'
    ],
    rewards: [
      'High job demand',
      'Ability to help others',
      'Job security'
    ]
  },
  {
    id: 142,
    title: 'Nutritionist',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Client compliance issues',
      'May require advanced degrees',
      'Income instability (for private practice)'
    ],
    rewards: [
      'Ability to help people',
      'Growing field',
      'Diverse job settings'
    ]
  },
  {
    id: 143,
    title: 'Oath Commissioner',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Limited job openings',
      'Regulatory requirements',
      'Repetitive work'
    ],
    rewards: [
      'Job security',
      'Public trust',
      'Flexible work options'
    ]
  },
  {
    id: 144,
    title: 'Occupational Therapist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Emotional demands',
      'Physical strain',
      'Regulatory requirements'
    ],
    rewards: [
      'Ability to help people',
      'Job security',
      'Growing field'
    ]
  },
  {
    id: 145,
    title: 'Ocean Engineer',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'On-site hazards',
      'Remote locations',
      'Technical complexity'
    ],
    rewards: [
      'High salary',
      'Job variety',
      'Opportunities for advancement'
    ]
  },
  {
    id: 146,
    title: 'Oceanographer',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Fieldwork in remote locations',
      'Funding uncertainties',
      'Exposure to hazards'
    ],
    rewards: [
      'Contribution to science',
      'Opportunities in research and teaching',
      'Work with marine environments'
    ]
  },
  {
    id: 147,
    title: 'Oenologist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Seasonal work',
      'Market fluctuations',
      'Physical demands'
    ],
    rewards: [
      'Creative satisfaction',
      'Job variety',
      'Industry demand'
    ]
  },
  {
    id: 148,
    title: 'Online Tutor',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Income instability (freelancers)',
      'High competition',
      'Client deadlines'
    ],
    rewards: [
      'Flexible work options',
      'Remote work',
      'Helping others'
    ]
  },
  {
    id: 149,
    title: 'Optometrist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Requires advanced degrees',
      'Regulatory requirements',
      'Patient management stress'
    ],
    rewards: [
      'Good salary',
      'Job security',
      'Ability to run own practice'
    ]
  },
  {
    id: 150,
    title: 'Oral Surgeon',
    riskLevel: 5,
    rewardLevel: 9,
    risks: [
      'Long education path',
      'High responsibility',
      'Emotional demands'
    ],
    rewards: [
      'Very high salary',
      'Prestige',
      'Helping patients'
    ]
  },
  {
    id: 101,
    title: 'Jewellery Designer',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'High competition',
      'Changing fashion trends',
      'Income instability (freelancers)'
    ],
    rewards: [
      'Creative satisfaction',
      'Potential for recognition',
      'Flexible work options'
    ]
  },
  {
    id: 102,
    title: 'Journalist',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Tight deadlines',
      'Job insecurity',
      'Exposure to dangerous situations'
    ],
    rewards: [
      'Influence public opinion',
      'Travel opportunities',
      'Prestige'
    ]
  },
  {
    id: 103,
    title: 'Judge',
    riskLevel: 5,
    rewardLevel: 9,
    risks: [
      'High responsibility',
      'Public scrutiny',
      'Emotional stress'
    ],
    rewards: [
      'Prestige',
      'Job security',
      'Influence on society'
    ]
  },
  {
    id: 104,
    title: 'Law Professional',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Long hours',
      'High stress',
      'Competitive field'
    ],
    rewards: [
      'High earning potential',
      'Prestige',
      'Ability to make a difference'
    ]
  },
  {
    id: 105,
    title: 'Leather Technologist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Exposure to chemicals',
      'Changing industry trends',
      'Technical complexity'
    ],
    rewards: [
      'Good salary',
      'Industry demand',
      'Innovation opportunities'
    ]
  },
  {
    id: 106,
    title: 'Lexicographer',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Limited job openings',
      'High competition',
      'Niche field'
    ],
    rewards: [
      'Intellectual satisfaction',
      'Contribution to language',
      'Flexible work options'
    ]
  },
  {
    id: 107,
    title: 'Librarian',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Limited job openings',
      'Low salary in some regions',
      'Changing technology'
    ],
    rewards: [
      'Job security',
      'Intellectual satisfaction',
      'Community impact'
    ]
  },
  {
    id: 108,
    title: 'Lift Technician',
    riskLevel: 3,
    rewardLevel: 6,
    risks: [
      'Physical danger',
      'Irregular hours',
      'Technical complexity'
    ],
    rewards: [
      'Job security',
      'Practical skills',
      'Industry demand'
    ]
  },
  {
    id: 109,
    title: 'Linguist',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Limited job openings',
      'High competition',
      'Niche field'
    ],
    rewards: [
      'Intellectual satisfaction',
      'Opportunities in research and teaching',
      'Flexible work options'
    ]
  },
  {
    id: 110,
    title: 'Logistics Manager',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'High responsibility',
      'Tight deadlines',
      'Complex supply chains'
    ],
    rewards: [
      'Job variety',
      'Good salary',
      'Opportunities for advancement'
    ]
  },
  {
    id: 111,
    title: 'Magnetic Therapist',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Income instability',
      'Client trust required',
      'Regulatory uncertainty'
    ],
    rewards: [
      'Helping others',
      'Flexible hours',
      'Growing wellness industry'
    ]
  },
  {
    id: 112,
    title: 'Makeup Artist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'High competition',
      'Changing fashion trends',
      'Income instability (freelancers)'
    ],
    rewards: [
      'Creative satisfaction',
      'Potential for recognition',
      'Flexible work options'
    ]
  },
  {
    id: 113,
    title: 'Marine Biologist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Fieldwork in remote locations',
      'Funding uncertainties',
      'Exposure to hazards'
    ],
    rewards: [
      'Contribution to science',
      'Opportunities in research and teaching',
      'Work with marine life'
    ]
  },
  {
    id: 114,
    title: 'Marine Engineer',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'On-site hazards',
      'Remote locations',
      'Technical complexity'
    ],
    rewards: [
      'High salary',
      'Job variety',
      'Opportunities for advancement'
    ]
  },
  {
    id: 115,
    title: 'Marketing Manager',
    riskLevel: 3,
    rewardLevel: 8,
    risks: [
      'Performance pressure',
      'Changing trends',
      'Client demands'
    ],
    rewards: [
      'Leadership opportunities',
      'Good salary',
      'Diverse industries'
    ]
  },
  {
    id: 116,
    title: 'Mathematician',
    riskLevel: 2,
    rewardLevel: 7,
    risks: [
      'High competition in academia',
      'May require advanced degrees',
      'Limited job openings'
    ],
    rewards: [
      'Intellectual satisfaction',
      'Opportunities in research and teaching',
      'Critical thinking skills'
    ]
  },
  {
    id: 117,
    title: 'Mechanical Engineer',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Technical complexity',
      'On-site hazards',
      'Project deadlines'
    ],
    rewards: [
      'Good salary',
      'Diverse job opportunities',
      'Innovation potential'
    ]
  },
  {
    id: 118,
    title: 'Mechatronics Engineer',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Technical complexity',
      'Continuous upskilling required',
      'Project deadlines'
    ],
    rewards: [
      'High salary',
      'Innovation opportunities',
      'Growing industry'
    ]
  },
  {
    id: 119,
    title: 'Medical Doctor',
    riskLevel: 5,
    rewardLevel: 9,
    risks: [
      'Long and expensive education',
      'High stress and responsibility',
      'Long hours'
    ],
    rewards: [
      'Very high salary',
      'Prestige',
      'Ability to save lives'
    ]
  },
  {
    id: 120,
    title: 'Medical Lab Technologist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Lab safety hazards',
      'Irregular hours',
      'Attention to detail required'
    ],
    rewards: [
      'Job security',
      'Contribution to healthcare',
      'Diverse job settings'
    ]
  },
  {
    id: 121,
    title: 'Medical Tourism Coordinator',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Travel requirements',
      'Client management stress',
      'Market fluctuations'
    ],
    rewards: [
      'Global exposure',
      'Job variety',
      'Growing industry'
    ]
  },
  {
    id: 122,
    title: 'Medical Transcriptionist',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Repetitive work',
      'Tight deadlines',
      'Income instability (freelancers)'
    ],
    rewards: [
      'Flexible work options',
      'Remote work',
      'Job security'
    ]
  },
  {
    id: 123,
    title: 'Merchant Navy Officer',
    riskLevel: 5,
    rewardLevel: 8,
    risks: [
      'Long periods away from home',
      'Physical danger',
      'Irregular hours'
    ],
    rewards: [
      'High salary',
      'Travel opportunities',
      'Prestige'
    ]
  },
  {
    id: 124,
    title: 'Metallurgical Engineer',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Exposure to hazardous materials',
      'Technical complexity',
      'Project deadlines'
    ],
    rewards: [
      'Good salary',
      'Industry demand',
      'Innovation opportunities'
    ]
  },
  {
    id: 125,
    title: 'Meteorologist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Irregular hours',
      'Fieldwork in harsh conditions',
      'Public scrutiny'
    ],
    rewards: [
      'Contribution to science',
      'Job variety',
      'Growing demand'
    ]
  },
  {
    id: 126,
    title: 'Microbiologist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Lab safety hazards',
      'May require advanced degrees',
      'Funding uncertainties'
    ],
    rewards: [
      'Opportunities in research and industry',
      'Contribution to science',
      'Job variety'
    ]
  },
  {
    id: 127,
    title: 'Mining Engineer',
    riskLevel: 5,
    rewardLevel: 8,
    risks: [
      'On-site hazards',
      'Remote locations',
      'Economic cycles affect demand'
    ],
    rewards: [
      'High salary',
      'Job variety',
      'Opportunities for advancement'
    ]
  },
  {
    id: 128,
    title: 'Model',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Income instability',
      'High competition',
      'Subjective success'
    ],
    rewards: [
      'Potential for fame',
      'Creative satisfaction',
      'Travel opportunities'
    ]
  },
  {
    id: 129,
    title: 'Museologist',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Limited job openings',
      'Low salary in some regions',
      'Niche field'
    ],
    rewards: [
      'Job security',
      'Preserving history',
      'Intellectual satisfaction'
    ]
  },
  {
    id: 130,
    title: 'Musician',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Income instability',
      'High competition',
      'Subjective success'
    ],
    rewards: [
      'Creative satisfaction',
      'Potential for fame',
      'Flexible work options'
    ]
  },
  {
    id: 131,
    title: 'Music Composer',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Income instability',
      'High competition',
      'Subjective success'
    ],
    rewards: [
      'Creative satisfaction',
      'Potential for fame',
      'Flexible work options'
    ]
  },
  {
    id: 132,
    title: 'Music Therapist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Income instability',
      'Client trust required',
      'Regulatory uncertainty'
    ],
    rewards: [
      'Helping others',
      'Creative satisfaction',
      'Growing wellness industry'
    ]
  },
  {
    id: 133,
    title: 'Nanotechnologist',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Technical complexity',
      'Requires advanced degrees',
      'Funding uncertainties'
    ],
    rewards: [
      'High salary',
      'Cutting-edge research',
      'Growing field'
    ]
  },
  {
    id: 134,
    title: 'National Security Guard',
    riskLevel: 5,
    rewardLevel: 8,
    risks: [
      'Physical danger',
      'High stress',
      'Irregular hours'
    ],
    rewards: [
      'Prestige',
      'Serving the nation',
      'Job security'
    ]
  },
  {
    id: 135,
    title: 'Naturopath',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Income instability (private practice)',
      'Regulatory requirements',
      'Client trust required'
    ],
    rewards: [
      'Helping others',
      'Flexible hours',
      'Growing wellness industry'
    ]
  },
  {
    id: 136,
    title: 'Nephrologist',
    riskLevel: 5,
    rewardLevel: 9,
    risks: [
      'Long education path',
      'High responsibility',
      'Emotional demands'
    ],
    rewards: [
      'Very high salary',
      'Prestige',
      'Helping patients'
    ]
  },
  {
    id: 137,
    title: 'Neurologist',
    riskLevel: 5,
    rewardLevel: 9,
    risks: [
      'Long education path',
      'High responsibility',
      'Emotional demands'
    ],
    rewards: [
      'Very high salary',
      'Prestige',
      'Helping patients'
    ]
  },
  {
    id: 138,
    title: 'Notary',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Limited job openings',
      'Regulatory requirements',
      'Repetitive work'
    ],
    rewards: [
      'Job security',
      'Public trust',
      'Flexible work options'
    ]
  },
  {
    id: 139,
    title: 'Nuclear Engineer',
    riskLevel: 5,
    rewardLevel: 9,
    risks: [
      'On-site hazards',
      'Technical complexity',
      'Regulatory scrutiny'
    ],
    rewards: [
      'Very high salary',
      'Job variety',
      'Opportunities for advancement'
    ]
  },
  {
    id: 140,
    title: 'Nursery Teacher',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Modest salary',
      'Emotional demands',
      'Workload outside classroom'
    ],
    rewards: [
      'Job security',
      'Ability to shape young minds',
      'Prestige in community'
    ]
  },
  {
    id: 141,
    title: 'Nurse',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Long shifts',
      'Emotional and physical demands',
      'Exposure to illness'
    ],
    rewards: [
      'High job demand',
      'Ability to help others',
      'Job security'
    ]
  },
  {
    id: 142,
    title: 'Nutritionist',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Client compliance issues',
      'May require advanced degrees',
      'Income instability (for private practice)'
    ],
    rewards: [
      'Ability to help people',
      'Growing field',
      'Diverse job settings'
    ]
  },
  {
    id: 143,
    title: 'Oath Commissioner',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Limited job openings',
      'Regulatory requirements',
      'Repetitive work'
    ],
    rewards: [
      'Job security',
      'Public trust',
      'Flexible work options'
    ]
  },
  {
    id: 144,
    title: 'Occupational Therapist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Emotional demands',
      'Physical strain',
      'Regulatory requirements'
    ],
    rewards: [
      'Ability to help people',
      'Job security',
      'Growing field'
    ]
  },
  {
    id: 145,
    title: 'Ocean Engineer',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'On-site hazards',
      'Remote locations',
      'Technical complexity'
    ],
    rewards: [
      'High salary',
      'Job variety',
      'Opportunities for advancement'
    ]
  },
  {
    id: 146,
    title: 'Oceanographer',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Fieldwork in remote locations',
      'Funding uncertainties',
      'Exposure to hazards'
    ],
    rewards: [
      'Contribution to science',
      'Opportunities in research and teaching',
      'Work with marine environments'
    ]
  },
  {
    id: 147,
    title: 'Oenologist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Seasonal work',
      'Market fluctuations',
      'Physical demands'
    ],
    rewards: [
      'Creative satisfaction',
      'Job variety',
      'Industry demand'
    ]
  },
  {
    id: 148,
    title: 'Online Tutor',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Income instability (freelancers)',
      'High competition',
      'Client deadlines'
    ],
    rewards: [
      'Flexible work options',
      'Remote work',
      'Helping others'
    ]
  },
  {
    id: 149,
    title: 'Optometrist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Requires advanced degrees',
      'Regulatory requirements',
      'Patient management stress'
    ],
    rewards: [
      'Good salary',
      'Job security',
      'Ability to run own practice'
    ]
  },
  {
    id: 150,
    title: 'Oral Surgeon',
    riskLevel: 5,
    rewardLevel: 9,
    risks: [
      'Long education path',
      'High responsibility',
      'Emotional demands'
    ],
    rewards: [
      'Very high salary',
      'Prestige',
      'Helping patients'
    ]
  },
  {
    id: 151,
    title: 'Orthodontist',
    riskLevel: 5,
    rewardLevel: 9,
    risks: [
      'Long education path',
      'High responsibility',
      'Emotional demands'
    ],
    rewards: [
      'Very high salary',
      'Prestige',
      'Helping patients'
    ]
  },
  {
    id: 152,
    title: 'Orthopaedic Surgeon',
    riskLevel: 5,
    rewardLevel: 9,
    risks: [
      'Long education path',
      'High responsibility',
      'Emotional demands'
    ],
    rewards: [
      'Very high salary',
      'Prestige',
      'Helping patients'
    ]
  },
  {
    id: 153,
    title: 'Osteopath',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Income instability (private practice)',
      'Regulatory requirements',
      'Client trust required'
    ],
    rewards: [
      'Helping others',
      'Flexible hours',
      'Growing wellness industry'
    ]
  },
  {
    id: 154,
    title: 'ENT Specialist',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Long education path',
      'High responsibility',
      'Emotional demands'
    ],
    rewards: [
      'High salary',
      'Prestige',
      'Helping patients'
    ]
  },
  {
    id: 155,
    title: 'Environmental Engineer',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Fieldwork in challenging environments',
      'Project delays',
      'Complex regulations'
    ],
    rewards: [
      'Contribution to sustainability',
      'Job security',
      'Diverse projects'
    ]
  },
  {
    id: 156,
    title: 'Environmental Scientist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Fieldwork in challenging environments',
      'Research funding uncertainty',
      'High competition'
    ],
    rewards: [
      'Contribution to sustainability',
      'Job variety',
      'Growing field'
    ]
  },
  {
    id: 157,
    title: 'Epidemiologist',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Fieldwork during outbreaks',
      'High responsibility',
      'Emotional demands'
    ],
    rewards: [
      'Contribution to public health',
      'Job security',
      'Research opportunities'
    ]
  },
  {
    id: 158,
    title: 'Ethical Hacker',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Continuous upskilling required',
      'High responsibility',
      'Legal and ethical challenges'
    ],
    rewards: [
      'High salary',
      'Strong job demand',
      'Opportunities across industries'
    ]
  },
  {
    id: 159,
    title: 'Event Manager',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Long and irregular hours',
      'High stress',
      'Client-driven deadlines'
    ],
    rewards: [
      'Creative work',
      'Networking opportunities',
      'Potential for high earnings'
    ]
  },
  {
    id: 160,
    title: 'Fashion Choreographer',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'High competition',
      'Changing fashion trends',
      'Income instability (freelancers)'
    ],
    rewards: [
      'Creative satisfaction',
      'Potential for recognition',
      'Flexible work options'
    ]
  },
  {
    id: 161,
    title: 'Fashion Designer',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Highly competitive',
      'Unpredictable income',
      'Changing trends'
    ],
    rewards: [
      'Creative expression',
      'Potential for fame',
      'Diverse opportunities'
    ]
  },
  {
    id: 162,
    title: 'Filmmaker',
    riskLevel: 5,
    rewardLevel: 9,
    risks: [
      'Highly competitive',
      'Unpredictable income',
      'Long hours'
    ],
    rewards: [
      'Creative expression',
      'Potential for fame',
      'Diverse opportunities'
    ]
  },
  {
    id: 163,
    title: 'Finance Manager',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Market volatility',
      'High responsibility',
      'Performance pressure'
    ],
    rewards: [
      'High salary',
      'Prestige',
      'Opportunities for advancement'
    ]
  },
  {
    id: 164,
    title: 'Fire Engineer',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'On-site hazards',
      'High responsibility',
      'Irregular hours'
    ],
    rewards: [
      'Job security',
      'Public service',
      'Innovation opportunities'
    ]
  },
  {
    id: 165,
    title: 'Fishery Scientist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Fieldwork in challenging environments',
      'Market fluctuations',
      'Physical demands'
    ],
    rewards: [
      'Contribution to food security',
      'Job variety',
      'Growing demand'
    ]
  },
  {
    id: 166,
    title: 'Fitness Trainer',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Income instability (private practice)',
      'Physical strain',
      'Client trust required'
    ],
    rewards: [
      'Helping others',
      'Flexible hours',
      'Growing wellness industry'
    ]
  },
  {
    id: 167,
    title: 'Floriculturist',
    riskLevel: 3,
    rewardLevel: 6,
    risks: [
      'Market fluctuations',
      'Physical demands',
      'Seasonal work'
    ],
    rewards: [
      'Creative satisfaction',
      'Job variety',
      'Growing industry'
    ]
  },
  {
    id: 168,
    title: 'Food Critic',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'High competition',
      'Subjective success',
      'Income instability (freelancers)'
    ],
    rewards: [
      'Creative satisfaction',
      'Flexible work options',
      'Potential for recognition'
    ]
  },
  {
    id: 169,
    title: 'Food Flavorist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Technical complexity',
      'Exposure to chemicals',
      'Niche field'
    ],
    rewards: [
      'Creative satisfaction',
      'Industry demand',
      'Innovation opportunities'
    ]
  },
  {
    id: 170,
    title: 'Food Technologist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Technical complexity',
      'Continuous learning',
      'Project deadlines'
    ],
    rewards: [
      'Job security',
      'Industry demand',
      'Innovation opportunities'
    ]
  },
  {
    id: 171,
    title: 'Footwear Technologist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Technical complexity',
      'Changing fashion trends',
      'Project deadlines'
    ],
    rewards: [
      'Creative satisfaction',
      'Industry demand',
      'Innovation opportunities'
    ]
  },
  {
    id: 172,
    title: 'Foreign Language Specialist',
    riskLevel: 2,
    rewardLevel: 7,
    risks: [
      'High competition',
      'Client deadlines',
      'Income instability (freelancers)'
    ],
    rewards: [
      'Flexible work options',
      'Opportunities in many industries',
      'Intellectual satisfaction'
    ]
  },
  {
    id: 173,
    title: 'Gaming Developer',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Long hours',
      'Tight deadlines',
      'High competition'
    ],
    rewards: [
      'Creative work',
      'Growing industry',
      'Opportunities in tech/entertainment'
    ]
  },
  {
    id: 174,
    title: 'Gastroenterologist',
    riskLevel: 5,
    rewardLevel: 9,
    risks: [
      'Long education path',
      'High responsibility',
      'Emotional demands'
    ],
    rewards: [
      'Very high salary',
      'Prestige',
      'Helping patients'
    ]
  },
  {
    id: 175,
    title: 'Gemmologist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Niche field',
      'Market fluctuations',
      'Technical complexity'
    ],
    rewards: [
      'Industry demand',
      'Job variety',
      'Potential for high earnings'
    ]
  },
  {
    id: 176,
    title: 'Genetic Engineer',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Technical complexity',
      'Ethical/regulatory challenges',
      'Research funding uncertainty'
    ],
    rewards: [
      'Cutting-edge research',
      'High salary',
      'Growing field'
    ]
  },
  {
    id: 177,
    title: 'Geographer',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Fieldwork in remote locations',
      'Funding uncertainties',
      'High competition'
    ],
    rewards: [
      'Contribution to science',
      'Job variety',
      'Research satisfaction'
    ]
  },
  {
    id: 178,
    title: 'Geologist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Fieldwork in remote areas',
      'Exposure to hazards',
      'Economic cycles affect demand'
    ],
    rewards: [
      'Contribution to science',
      'Opportunities in research and industry',
      'Job variety'
    ]
  },
  {
    id: 179,
    title: 'Geophysicist',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Fieldwork in remote areas',
      'Technical complexity',
      'Research funding uncertainty'
    ],
    rewards: [
      'High salary',
      'Contribution to science',
      'Job variety'
    ]
  },
  {
    id: 180,
    title: 'Gerontologist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Emotional demands',
      'High responsibility',
      'Niche field'
    ],
    rewards: [
      'Helping others',
      'Growing demand',
      'Job security'
    ]
  },
  {
    id: 181,
    title: 'Graphic Designer',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Client-driven deadlines',
      'High competition',
      'Income instability (freelancers)'
    ],
    rewards: [
      'Creative work',
      'Flexible work options',
      'Diverse industries'
    ]
  },
  {
    id: 182,
    title: 'Graphologist',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Niche field',
      'High competition',
      'Income instability'
    ],
    rewards: [
      'Unique expertise',
      'Flexible work options',
      'Potential for recognition'
    ]
  },
  {
    id: 183,
    title: 'Gynecologist',
    riskLevel: 5,
    rewardLevel: 9,
    risks: [
      'Long education path',
      'High responsibility',
      'Emotional demands'
    ],
    rewards: [
      'Very high salary',
      'Prestige',
      'Helping patients'
    ]
  },
  {
    id: 184,
    title: 'Home Science Specialist',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Limited job openings',
      'High competition',
      'Niche field'
    ],
    rewards: [
      'Job security',
      'Helping others',
      'Flexible work options'
    ]
  },
  {
    id: 185,
    title: 'Horticulturist',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Market fluctuations',
      'Physical demands',
      'Seasonal work'
    ],
    rewards: [
      'Creative satisfaction',
      'Job variety',
      'Growing industry'
    ]
  },
  {
    id: 186,
    title: 'Hospital Manager',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'High responsibility',
      'Regulatory complexity',
      'Long hours'
    ],
    rewards: [
      'Leadership roles',
      'Good salary',
      'Impact on healthcare delivery'
    ]
  },
  {
    id: 187,
    title: 'Hotel Manager',
    riskLevel: 3,
    rewardLevel: 8,
    risks: [
      'Long hours',
      'Customer service stress',
      'Economic cycles affect demand'
    ],
    rewards: [
      'Job variety',
      'Opportunities for advancement',
      'International opportunities'
    ]
  },
  {
    id: 188,
    title: 'Human Resource Manager',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Handling conflicts',
      'Changing labor laws',
      'High responsibility'
    ],
    rewards: [
      'Central role in organizations',
      'Job security',
      'Opportunities for advancement'
    ]
  },
  {
    id: 189,
    title: 'Hydrotherapist',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Income instability',
      'Client trust required',
      'Regulatory uncertainty'
    ],
    rewards: [
      'Helping others',
      'Flexible hours',
      'Growing wellness industry'
    ]
  },
  {
    id: 190,
    title: 'IAF Air Man',
    riskLevel: 5,
    rewardLevel: 7,
    risks: [
      'Physical danger',
      'Irregular hours',
      'High stress'
    ],
    rewards: [
      'Job security',
      'Prestige',
      'Serving the nation'
    ]
  },
  {
    id: 191,
    title: 'IAF Officer',
    riskLevel: 5,
    rewardLevel: 8,
    risks: [
      'Physical danger',
      'High responsibility',
      'Irregular hours'
    ],
    rewards: [
      'Prestige',
      'Serving the nation',
      'Job security'
    ]
  },
  {
    id: 192,
    title: 'ICWAI (ICAI)',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Demanding certification exams',
      'Continuous learning required',
      'High responsibility'
    ],
    rewards: [
      'High salary',
      'Job security',
      'Prestige in financial sector'
    ]
  },
  {
    id: 193,
    title: 'Image Consultant',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Income instability (private practice)',
      'High competition',
      'Client trust required'
    ],
    rewards: [
      'Helping others',
      'Flexible hours',
      'Growing industry'
    ]
  },
  {
    id: 194,
    title: 'Indian Army Officer',
    riskLevel: 5,
    rewardLevel: 8,
    risks: [
      'Physical danger',
      'High responsibility',
      'Irregular hours'
    ],
    rewards: [
      'Prestige',
      'Serving the nation',
      'Job security'
    ]
  },
  {
    id: 195,
    title: 'Indian Coast Guard Officer',
    riskLevel: 5,
    rewardLevel: 8,
    risks: [
      'Physical danger',
      'High responsibility',
      'Irregular hours'
    ],
    rewards: [
      'Prestige',
      'Serving the nation',
      'Job security'
    ]
  },
  {
    id: 196,
    title: 'Indian Economic/Statistical Service',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Highly competitive exams',
      'High responsibility',
      'Public scrutiny'
    ],
    rewards: [
      'Prestige',
      'Job security',
      'Ability to impact policy'
    ]
  },
  {
    id: 197,
    title: 'Indian Foreign Service Officer',
    riskLevel: 4,
    rewardLevel: 9,
    risks: [
      'Highly competitive exams',
      'Frequent relocations',
      'High responsibility'
    ],
    rewards: [
      'Prestige',
      'Global exposure',
      'Serving the nation'
    ]
  },
  {
    id: 198,
    title: 'Indian Navy Officer',
    riskLevel: 5,
    rewardLevel: 8,
    risks: [
      'Physical danger',
      'High responsibility',
      'Irregular hours'
    ],
    rewards: [
      'Prestige',
      'Serving the nation',
      'Job security'
    ]
  },
  {
    id: 199,
    title: 'Indian Postal Service Officer',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Public scrutiny',
      'High responsibility',
      'Changing technology'
    ],
    rewards: [
      'Prestige',
      'Job security',
      'Serving the nation'
    ]
  },
  {
    id: 200,
    title: 'Indian Revenue Service Officer',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Highly competitive exams',
      'High responsibility',
      'Public scrutiny'
    ],
    rewards: [
      'Prestige',
      'Job security',
      'Ability to impact policy'
    ]
  },
  {
    id: 201,
    title: 'Indo Tibetan Border Police Force Officer',
    riskLevel: 5,
    rewardLevel: 8,
    risks: [
      'Physical danger',
      'Harsh working conditions',
      'Irregular hours'
    ],
    rewards: [
      'Prestige',
      'Serving the nation',
      'Job security'
    ]
  },
  {
    id: 202,
    title: 'Industrial Engineer',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Technical complexity',
      'Project deadlines',
      'Continuous upskilling required'
    ],
    rewards: [
      'Good salary',
      'Diverse job opportunities',
      'Innovation potential'
    ]
  },
  {
    id: 203,
    title: 'Instrumentation Engineer',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Technical complexity',
      'Project deadlines',
      'Continuous upskilling required'
    ],
    rewards: [
      'Good salary',
      'Diverse job opportunities',
      'Innovation potential'
    ]
  },
  {
    id: 204,
    title: 'Insurance Agent',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Income instability (commission-based)',
      'Performance pressure',
      'Client acquisition challenges'
    ],
    rewards: [
      'Flexible work options',
      'Potential for high earnings',
      'Diverse industries'
    ]
  },
  {
    id: 205,
    title: 'Radio Jockey',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Irregular working hours',
      'Performance pressure',
      'High competition'
    ],
    rewards: [
      'Creative expression',
      'Public recognition',
      'Diverse opportunities in media'
    ]
  },
  {
    id: 206,
    title: 'Radiography',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Exposure to radiation',
      'Physical demands',
      'Emotional stress'
    ],
    rewards: [
      'Job security',
      'Contribution to healthcare',
      'Growing demand'
    ]
  },
  {
    id: 207,
    title: 'Railway Protective Force (RPF)',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Physical danger',
      'Irregular hours',
      'High stress'
    ],
    rewards: [
      'Job security',
      'Prestige',
      'Serving the public'
    ]
  },
  {
    id: 208,
    title: 'Railway Services',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Public scrutiny',
      'High responsibility',
      'Irregular hours'
    ],
    rewards: [
      'Job security',
      'Prestige',
      'Serving the public'
    ]
  },
  {
    id: 209,
    title: 'Railway Ticket Collector',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Irregular hours',
      'Public interaction stress',
      'Routine work'
    ],
    rewards: [
      'Job security',
      'Public service',
      'Stable income'
    ]
  },
  {
    id: 210,
    title: 'Real Estate Management',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Market volatility',
      'Income instability',
      'High competition'
    ],
    rewards: [
      'Potential for high earnings',
      'Flexible work options',
      'Networking opportunities'
    ]
  },
  {
    id: 211,
    title: 'Reflexology',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Income instability',
      'Client trust required',
      'Regulatory uncertainty'
    ],
    rewards: [
      'Helping others',
      'Flexible hours',
      'Growing wellness industry'
    ]
  },
  {
    id: 212,
    title: 'Rehabilitation',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Emotional demands',
      'Physical strain',
      'Client trust required'
    ],
    rewards: [
      'Helping others',
      'Job security',
      'Growing field'
    ]
  },
  {
    id: 213,
    title: 'Respiratory Therapy',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'High responsibility',
      'Emotional demands',
      'Exposure to illness'
    ],
    rewards: [
      'Job security',
      'Helping others',
      'Growing demand'
    ]
  },
  {
    id: 214,
    title: 'Retail Management',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Long hours',
      'Customer service stress',
      'Economic cycles affect demand'
    ],
    rewards: [
      'Job variety',
      'Opportunities for advancement',
      'Industry demand'
    ]
  },
  {
    id: 215,
    title: 'Rheumatology',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Long education path',
      'High responsibility',
      'Emotional demands'
    ],
    rewards: [
      'High salary',
      'Prestige',
      'Helping patients'
    ]
  },
  {
    id: 216,
    title: 'Robotics',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Technical complexity',
      'Fast-changing technology',
      'Continuous learning required'
    ],
    rewards: [
      'High salary',
      'Cutting-edge technology',
      'Growing field'
    ]
  },
  {
    id: 217,
    title: 'Rotoscoping',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Long hours',
      'Tight deadlines',
      'High competition'
    ],
    rewards: [
      'Creative work',
      'Growing industry',
      'Opportunities in film/games'
    ]
  },
  {
    id: 218,
    title: 'Rubber Technology',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Technical complexity',
      'Exposure to chemicals',
      'Project deadlines'
    ],
    rewards: [
      'Good salary',
      'Industry demand',
      'Innovation opportunities'
    ]
  },
  {
    id: 219,
    title: 'Rural Management',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Fieldwork in rural areas',
      'Market fluctuations',
      'High responsibility'
    ],
    rewards: [
      'Impact on communities',
      'Job variety',
      'Growing sector'
    ]
  },
  {
    id: 220,
    title: 'Safety Management',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'High responsibility',
      'Regulatory compliance',
      'Stress during emergencies'
    ],
    rewards: [
      'Job security',
      'Critical role in organizations',
      'Opportunities for advancement'
    ]
  },
  {
    id: 221,
    title: 'Sashastra Seema Bal (SSB)',
    riskLevel: 5,
    rewardLevel: 8,
    risks: [
      'Physical danger',
      'Harsh working conditions',
      'Irregular hours'
    ],
    rewards: [
      'Prestige',
      'Serving the nation',
      'Job security'
    ]
  },
  {
    id: 222,
    title: 'Scuba Diving',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'Physical danger',
      'Seasonal work',
      'Income instability'
    ],
    rewards: [
      'Exciting work',
      'Travel opportunities',
      'Helping others'
    ]
  },
  {
    id: 223,
    title: 'Securities Analysts',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Market volatility',
      'High responsibility',
      'Performance pressure'
    ],
    rewards: [
      'High salary',
      'Prestige',
      'Opportunities for advancement'
    ]
  },
  {
    id: 224,
    title: 'Sericulture',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Market fluctuations',
      'Physical demands',
      'Seasonal work'
    ],
    rewards: [
      'Job variety',
      'Industry demand',
      'Growing sector'
    ]
  },
  {
    id: 225,
    title: 'Shipping and Port Management',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Long hours',
      'High responsibility',
      'Market volatility'
    ],
    rewards: [
      'Job variety',
      'Opportunities for advancement',
      'Industry demand'
    ]
  },
  {
    id: 226,
    title: 'Siddha',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Income instability (private practice)',
      'Regulatory requirements',
      'Client trust required'
    ],
    rewards: [
      'Helping others',
      'Flexible hours',
      'Growing wellness industry'
    ]
  },
  {
    id: 227,
    title: 'Social Work',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Emotional demands',
      'Modest salary',
      'High responsibility'
    ],
    rewards: [
      'Ability to help people',
      'Job security',
      'Community impact'
    ]
  },
  {
    id: 228,
    title: 'Sociology',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Limited job openings',
      'High competition',
      'May require advanced degrees'
    ],
    rewards: [
      'Opportunities in research and teaching',
      'Community impact',
      'Intellectual satisfaction'
    ]
  },
  {
    id: 229,
    title: 'Sommelier / Wine Taster',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Niche field',
      'Income instability',
      'Changing trends'
    ],
    rewards: [
      'Prestige',
      'Travel opportunities',
      'Creative satisfaction'
    ]
  },
  {
    id: 230,
    title: 'Spa/ Massage Therapy',
    riskLevel: 2,
    rewardLevel: 6,
    risks: [
      'Income instability',
      'Client trust required',
      'Physical strain'
    ],
    rewards: [
      'Helping others',
      'Flexible hours',
      'Growing wellness industry'
    ]
  },
  {
    id: 231,
    title: 'Special Education',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Emotional demands',
      'High responsibility',
      'Workload outside classroom'
    ],
    rewards: [
      'Ability to help children',
      'Job security',
      'Community impact'
    ]
  },
  {
    id: 232,
    title: 'Speech Pathology and Audiology',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Requires advanced degrees',
      'Client trust required',
      'Regulatory requirements'
    ],
    rewards: [
      'Helping others',
      'Job security',
      'Growing field'
    ]
  },
  {
    id: 233,
    title: 'Sports Commentator',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'High competition',
      'Irregular hours',
      'Public scrutiny'
    ],
    rewards: [
      'Public recognition',
      'Creative work',
      'Opportunities in media'
    ]
  },
  {
    id: 234,
    title: 'Sports Management',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Highly competitive',
      'Long hours',
      'Performance-based results'
    ],
    rewards: [
      'Exciting work environment',
      'Networking opportunities',
      'Potential for high earnings'
    ]
  },
  {
    id: 235,
    title: 'Sports/Physical Fitness',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Physical strain',
      'Income instability',
      'High competition'
    ],
    rewards: [
      'Helping others',
      'Flexible hours',
      'Growing wellness industry'
    ]
  },
  {
    id: 236,
    title: 'Statistician',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'High mathematical complexity',
      'May require advanced degrees',
      'Continuous learning required'
    ],
    rewards: [
      'Good salary',
      'Opportunities in many industries',
      'Growing field'
    ]
  },
  {
    id: 237,
    title: 'Structural Engineering',
    riskLevel: 4,
    rewardLevel: 8,
    risks: [
      'Technical complexity',
      'Project deadlines',
      'High responsibility'
    ],
    rewards: [
      'Good salary',
      'Impact on built environment',
      'Opportunities for advancement'
    ]
  },
  {
    id: 238,
    title: 'Sugar Technology',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Technical complexity',
      'Market fluctuations',
      'Project deadlines'
    ],
    rewards: [
      'Industry demand',
      'Job variety',
      'Opportunities for advancement'
    ]
  },
  {
    id: 239,
    title: 'Supply Chain Management',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'High responsibility',
      'Tight deadlines',
      'Complex supply chains'
    ],
    rewards: [
      'Job variety',
      'Good salary',
      'Opportunities for advancement'
    ]
  },
  {
    id: 240,
    title: 'Surgical Technology',
    riskLevel: 4,
    rewardLevel: 7,
    risks: [
      'High responsibility',
      'Emotional demands',
      'Exposure to illness'
    ],
    rewards: [
      'Job security',
      'Helping others',
      'Growing demand'
    ]
  },
  {
    id: 241,
    title: 'Surveying',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Fieldwork in challenging environments',
      'Technical complexity',
      'Market fluctuations'
    ],
    rewards: [
      'Job variety',
      'Industry demand',
      'Opportunities for advancement'
    ]
  },
  {
    id: 242,
    title: 'Taxation',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'High stress during tax season',
      'Continuous learning required',
      'Regulatory complexity'
    ],
    rewards: [
      'Good salary',
      'Job security',
      'Opportunities for advancement'
    ]
  },
  {
    id: 243,
    title: 'Tea Production',
    riskLevel: 3,
    rewardLevel: 7,
    risks: [
      'Market fluctuations',
      'Physical demands',
      'Seasonal work'
    ],
    rewards: [
      'Job variety',
      'Industry demand',
      'Growing sector'
    ]
  }
];

const RiskVsRewardAnalyzer = () => {
  const theme = useTheme(); // Get the theme object

  const [selectedId, setSelectedId] = useState('');
  const selectedCareer = careers.find(c => c.id === Number(selectedId));

  let ratio = null, interpretation = "";
  if (selectedCareer) {
    ratio = (selectedCareer.riskLevel / selectedCareer.rewardLevel).toFixed(2);
    if (ratio < 0.5) interpretation = "Low risk, high reward, good for risk-averse.";
    else if (ratio < 1.5) interpretation = "Moderate risk and reward, for those willing to take some risk.";
    else interpretation = "High risk, low reward, less desirable for risk-averse.";
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 3,
        bgcolor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" gutterBottom color="primary">
        Risk vs Reward Analyzer
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Select a career to analyze its risks and rewards.
      </Typography>
      <Select
        fullWidth
        value={selectedId}
        onChange={e => setSelectedId(e.target.value)}
        displayEmpty
        sx={{ mb: 3, bgcolor: theme.palette.background.default }}
      >
        <MenuItem value="">
          <em>Select a career</em>
        </MenuItem>
        {careers.map(career => (
          <MenuItem key={career.id} value={career.id}>
            {career.title}
          </MenuItem>
        ))}
      </Select>

      {selectedCareer && (
        <Paper elevation={2} sx={{ p: 2, bgcolor: theme.palette.background.default }}>
          <Typography variant="h6" color="secondary">
            {selectedCareer.title}
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            Risk Level: <b>{selectedCareer.riskLevel} / 10</b>
            <br />
            Reward Level: <b>{selectedCareer.rewardLevel} / 10</b>
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
            Risks:
          </Typography>
          <List dense>
            {selectedCareer.risks.map((risk, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={risk} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Rewards:
          </Typography>
          <List dense>
            {selectedCareer.rewards.map((reward, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={reward} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1">
            <b>Risk/Reward Ratio:</b> {ratio}
            <br />
            <b>Interpretation:</b> {interpretation}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default RiskVsRewardAnalyzer;
