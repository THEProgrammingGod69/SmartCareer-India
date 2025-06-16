/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  LinearProgress,
  Chip,
  Divider,
  Alert
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  Timeline as TimelineIcon,
  Lightbulb as LightbulbIcon,
  Analytics as AnalyticsIcon
} from '@mui/icons-material';

const CareerImpact = () => {
  const { darkMode } = useTheme();
  const [selectedCareer, setSelectedCareer] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  // Career impact analysis data
  const careerImpactsOriginal = {
    1: {
      title: "Data Scientist",
      futureScore: 95,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI Ethics", "Quantum Computing", "Edge Analytics"],
      skillsEvolution: ["AutoML", "Quantum Algorithms", "Edge Computing"],
      industryDemand: 9.5,
      marketSaturation: "Low",
      sustainabilityImpact: "Medium"
    },
    2: {
      title: "UX/UI Designer",
      futureScore: 88,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AR/VR Interfaces", "Voice UI", "Haptic Design"],
      skillsEvolution: ["3D Design", "Voice Interaction", "Biometric UX"],
      industryDemand: 8.8,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    3: {
      title: "Digital Marketing Specialist",
      futureScore: 85,
      automationRisk: "Medium",
      growthTrend: "High", 
      emergingAreas: ["AI Marketing", "Metaverse Branding", "Privacy-First Marketing"],
      skillsEvolution: ["Data Analytics", "AI Tools", "Privacy Compliance"],
      industryDemand: 8.5,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    4: {
      title: "Cybersecurity Analyst",
      futureScore: 90,
      automationRisk: "Low",
      growthTrend: "Very High",
      emergingAreas: ["AI Security", "Quantum Cryptography", "IoT Security"],
      skillsEvolution: ["AI-Driven Security", "Quantum Encryption", "IoT Forensics"],
      industryDemand: 9.0,
      marketSaturation: "Low",
      sustainabilityImpact: "Medium"
    },
    5: {
      title: "Cloud Engineer",
      futureScore: 92,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["Serverless Computing", "Cloud AI", "Edge Cloud"],
      skillsEvolution: ["Kubernetes", "Docker", "Cloud Security"],
      industryDemand: 9.2,
      marketSaturation: "Medium",
      sustainabilityImpact: "High"
    },
    6: {
      title: "AI/ML Engineer",
      futureScore: 94,
      automationRisk: "Low",
      growthTrend: "Very High",
      emergingAreas: ["Deep Learning", "Reinforcement Learning", "AI Ethics"],
      skillsEvolution: ["TensorFlow", "PyTorch", "AI Governance"],
      industryDemand: 9.4,
      marketSaturation: "Low",
      sustainabilityImpact: "Medium"
    },
    7: {
      title: "Blockchain Developer",
      futureScore: 89,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["DeFi", "NFTs", "Blockchain for Supply Chain"],
      skillsEvolution: ["Solidity", "Smart Contracts", "Blockchain Architecture"],
      industryDemand: 8.9,
      marketSaturation: "Medium",
      sustainabilityImpact: "Medium"
    },
    8: {
      title: "DevOps Engineer",
      futureScore: 87,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["GitOps", "CI/CD for AI", "DevSecOps"],
      skillsEvolution: ["Jenkins", "GitLab", "Kubernetes"],
      industryDemand: 8.7,
      marketSaturation: "Medium",
      sustainabilityImpact: "Medium"
    },
    9: {
      title: "Product Manager",
      futureScore: 86,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI-Driven Product Development", "Sustainable Products", "Remote Product Management"],
      skillsEvolution: ["Agile Methodologies", "AI Tools for PM", "Sustainability Assessment"],
      industryDemand: 8.6,
      marketSaturation: "Medium",
      sustainabilityImpact: "High"
    },
    10: {
      title: "Salesforce Developer",
      futureScore: 84,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["Salesforce AI", "No-Code Development", "Salesforce Blockchain"],
      skillsEvolution: ["Apex", "Visualforce", "Salesforce DX"],
      industryDemand: 8.4,
      marketSaturation: "Medium",
      sustainabilityImpact: "Medium"
    },
    11: {
      title: "SEO Specialist",
      futureScore: 82,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["Voice Search Optimization", "AI-Powered SEO", "Video SEO"],
      skillsEvolution: ["SEO Analytics", "Content Optimization", "Technical SEO"],
      industryDemand: 8.2,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    12: {
      title: "Content Strategist",
      futureScore: 81,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI Content Creation", "Content Personalization", "Interactive Content"],
      skillsEvolution: ["Content Management Systems", "SEO", "Data Analytics"],
      industryDemand: 8.1,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    13: {
      title: "HR Specialist",
      futureScore: 80,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["People Analytics", "AI in Recruitment", "Employee Wellbeing Tech"],
      skillsEvolution: ["HRIS Systems", "Data Analysis", "AI Tools for HR"],
      industryDemand: 8.0,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    14: {
      title: "Financial Analyst",
      futureScore: 79,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["Robo-Advisors", "AI in Trading", "Blockchain for Finance"],
      skillsEvolution: ["Financial Modelling", "Data Analysis", "AI Tools for Finance"],
      industryDemand: 7.9,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    15: {
      title: "Operations Manager",
      futureScore: 78,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Supply Chain", "Remote Operations", "Sustainable Operations"],
      skillsEvolution: ["Operations Strategy", "Data Analysis", "AI Tools for Operations"],
      industryDemand: 7.8,
      marketSaturation: "Medium",
      sustainabilityImpact: "Medium"
    },
    16: {
      title: "Logistics Coordinator",
      futureScore: 77,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Logistics", "Blockchain for Supply Chain", "Drones in Delivery"],
      skillsEvolution: ["Logistics Management", "Data Analysis", "AI Tools for Logistics"],
      industryDemand: 7.7,
      marketSaturation: "Medium",
      sustainabilityImpact: "Medium"
    },
    17: {
      title: "Supply Chain Analyst",
      futureScore: 76,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Supply Chain", "Blockchain for Supply Chain", "Sustainable Supply Chain"],
      skillsEvolution: ["Supply Chain Management", "Data Analysis", "AI Tools for Supply Chain"],
      industryDemand: 7.6,
      marketSaturation: "Medium",
      sustainabilityImpact: "High"
    },
    18: {
      title: "Purchasing Manager",
      futureScore: 75,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Procurement", "Blockchain for Procurement", "Sustainable Purchasing"],
      skillsEvolution: ["Procurement Management", "Data Analysis", "AI Tools for Procurement"],
      industryDemand: 7.5,
      marketSaturation: "Medium",
      sustainabilityImpact: "High"
    },
    19: {
      title: "Quality Assurance Analyst",
      futureScore: 74,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Quality Assurance", "Test Automation", "Continuous Testing"],
      skillsEvolution: ["QA Methodologies", "Test Automation Tools", "AI Tools for QA"],
      industryDemand: 7.4,
      marketSaturation: "Medium",
      sustainabilityImpact: "Medium"
    },
    20: {
      title: "Business Analyst",
      futureScore: 73,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Business Analysis", "Data-Driven Decision Making", "Agile Business Analysis"],
      skillsEvolution: ["Business Analysis", "Data Analytics", "AI Tools for Business"],
      industryDemand: 7.3,
      marketSaturation: "Medium",
      sustainabilityImpact: "Medium"
    },
    21: {
      title: "Management Consultant",
      futureScore: 72,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Management Consulting", "Sustainable Business Practices", "Digital Transformation Consulting"],
      skillsEvolution: ["Management Consulting", "Data Analysis", "AI Tools for Consulting"],
      industryDemand: 7.2,
      marketSaturation: "Medium",
      sustainabilityImpact: "High"
    },
    22: {
      title: "Project Coordinator",
      futureScore: 71,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Project Management", "Remote Project Coordination", "Agile Project Management"],
      skillsEvolution: ["Project Management", "Data Analysis", "AI Tools for Project Management"],
      industryDemand: 7.1,
      marketSaturation: "Medium",
      sustainabilityImpact: "Medium"
    },
    23: {
      title: "Administrative Assistant",
      futureScore: 70,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Administration", "Remote Administration", "Virtual Assistance"],
      skillsEvolution: ["Administrative Skills", "Data Entry", "AI Tools for Administration"],
      industryDemand: 7.0,
      marketSaturation: "High",
      sustainabilityImpact: "Low"
    },
    24: {
      title: "Customer Service Representative",
      futureScore: 69,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Customer Service", "Chatbots", "Remote Customer Support"],
      skillsEvolution: ["Customer Service Skills", "Data Analysis", "AI Tools for Customer Service"],
      industryDemand: 6.9,
      marketSaturation: "High",
      sustainabilityImpact: "Low"
    },
    25: {
      title: "Technical Support Specialist",
      futureScore: 68,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Technical Support", "Remote Support", "Technical Documentation"],
      skillsEvolution: ["Technical Skills", "Problem Solving", "AI Tools for Technical Support"],
      industryDemand: 6.8,
      marketSaturation: "High",
      sustainabilityImpact: "Low"
    },
    26: {
      title: "Network Administrator",
      futureScore: 67,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Network Management", "Cybersecurity Mesh", "SD-WAN"],
      skillsEvolution: ["Network Management", "Cybersecurity", "AI Tools for Network Management"],
      industryDemand: 6.7,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    27: {
      title: "Database Administrator",
      futureScore: 66,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Database Management", "Database as a Service", "NoSQL Databases"],
      skillsEvolution: ["Database Management", "SQL", "AI Tools for Database Management"],
      industryDemand: 6.6,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    28: {
      title: "System Administrator",
      futureScore: 65,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in System Management", "Remote System Administration", "Infrastructure as Code"],
      skillsEvolution: ["System Management", "Scripting", "AI Tools for System Management"],
      industryDemand: 6.5,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    29: {
      title: "Web Developer",
      futureScore: 64,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Web Development", "No-Code Development", "Progressive Web Apps"],
      skillsEvolution: ["Web Development", "JavaScript", "AI Tools for Web Development"],
      industryDemand: 6.4,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    30: {
      title: "Mobile App Developer",
      futureScore: 63,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Mobile Development", "Cross-Platform Development", "5G Applications"],
      skillsEvolution: ["Mobile Development", "Java", "AI Tools for Mobile Development"],
      industryDemand: 6.3,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    31: {
      title: "Game Developer",
      futureScore: 62,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Game Development", "AR/VR Games", "Cloud Gaming"],
      skillsEvolution: ["Game Development", "C++", "AI Tools for Game Development"],
      industryDemand: 6.2,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    32: {
      title: "Data Analyst",
      futureScore: 61,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Data Analysis", "Predictive Analytics", "Data Visualization"],
      skillsEvolution: ["Data Analysis", "Excel", "AI Tools for Data Analysis"],
      industryDemand: 6.1,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    33: {
      title: "Business Intelligence Analyst",
      futureScore: 60,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Business Intelligence", "Data Warehousing", "Self-Service BI"],
      skillsEvolution: ["Business Intelligence", "Data Visualization", "AI Tools for BI"],
      industryDemand: 6.0,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    34: {
      title: "Market Research Analyst",
      futureScore: 59,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Market Research", "Consumer Behavior Analytics", "Predictive Modeling"],
      skillsEvolution: ["Market Research", "Data Analysis", "AI Tools for Market Research"],
      industryDemand: 5.9,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    35: {
      title: "Actuary",
      futureScore: 58,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Actuarial Science", "Predictive Analytics", "Risk Management Software"],
      skillsEvolution: ["Actuarial Science", "Statistics", "AI Tools for Actuarial Science"],
      industryDemand: 5.8,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    36: {
      title: "Statistician",
      futureScore: 57,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Statistics", "Data Science", "Biostatistics"],
      skillsEvolution: ["Statistics", "Data Analysis", "AI Tools for Statistics"],
      industryDemand: 5.7,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    37: {
      title: "Data Engineer",
      futureScore: 56,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Data Engineering", "DataOps", "ETL Automation"],
      skillsEvolution: ["Data Engineering", "SQL", "AI Tools for Data Engineering"],
      industryDemand: 5.6,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    38: {
      title: "AI Research Scientist",
      futureScore: 55,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Research", "Machine Learning", "Deep Learning"],
      skillsEvolution: ["Research", "Machine Learning", "AI Tools for Research"],
      industryDemand: 5.5,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    39: {
      title: "Ethical Hacker",
      futureScore: 54,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Cybersecurity", "Penetration Testing", "Vulnerability Assessment"],
      skillsEvolution: ["Ethical Hacking", "Cybersecurity", "AI Tools for Ethical Hacking"],
      industryDemand: 5.4,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    40: {
      title: "Forensic Analyst",
      futureScore: 53,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Forensics", "Digital Forensics", "Cyber Forensics"],
      skillsEvolution: ["Forensic Science", "Cybersecurity", "AI Tools for Forensics"],
      industryDemand: 5.3,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    41: {
      title: "Compliance Officer",
      futureScore: 52,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Compliance", "RegTech", "Automated Compliance Monitoring"],
      skillsEvolution: ["Compliance", "Risk Management", "AI Tools for Compliance"],
      industryDemand: 5.2,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    42: {
      title: "Risk Manager",
      futureScore: 51,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Risk Management", "Predictive Risk Analytics", "Automated Risk Assessment"],
      skillsEvolution: ["Risk Management", "Data Analysis", "AI Tools for Risk Management"],
      industryDemand: 5.1,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    43: {
      title: "Health and Safety Officer",
      futureScore: 50,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Health and Safety", "Predictive Safety Analytics", "Automated Safety Monitoring"],
      skillsEvolution: ["Health and Safety", "Data Analysis", "AI Tools for Health and Safety"],
      industryDemand: 5.0,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    44: {
      title: "Environmental Scientist",
      futureScore: 49,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Environmental Science", "Sustainability Analytics", "Automated Environmental Monitoring"],
      skillsEvolution: ["Environmental Science", "Data Analysis", "AI Tools for Environmental Science"],
      industryDemand: 4.9,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    45: {
      title: "Urban Planner",
      futureScore: 48,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Urban Planning", "Smart Cities", "Sustainable Urban Design"],
      skillsEvolution: ["Urban Planning", "Data Analysis", "AI Tools for Urban Planning"],
      industryDemand: 4.8,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    46: {
      title: "Architect",
      futureScore: 47,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Architecture", "Sustainable Architecture", "Smart Buildings"],
      skillsEvolution: ["Architecture", "Design", "AI Tools for Architecture"],
      industryDemand: 4.7,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    47: {
      title: "Civil Engineer",
      futureScore: 46,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Civil Engineering", "Smart Infrastructure", "Sustainable Construction"],
      skillsEvolution: ["Civil Engineering", "Project Management", "AI Tools for Civil Engineering"],
      industryDemand: 4.6,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    48: {
      title: "Mechanical Engineer",
      futureScore: 45,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Mechanical Engineering", "Smart Manufacturing", "Sustainable Manufacturing"],
      skillsEvolution: ["Mechanical Engineering", "CAD", "AI Tools for Mechanical Engineering"],
      industryDemand: 4.5,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    49: {
      title: "Electrical Engineer",
      futureScore: 44,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Electrical Engineering", "Smart Grids", "Sustainable Energy"],
      skillsEvolution: ["Electrical Engineering", "Power Systems", "AI Tools for Electrical Engineering"],
      industryDemand: 4.4,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    50: {
      title: "Chemical Engineer",
      futureScore: 43,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Chemical Engineering", "Process Automation", "Sustainable Chemicals"],
      skillsEvolution: ["Chemical Engineering", "Process Design", "AI Tools for Chemical Engineering"],
      industryDemand: 4.3,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    51: {
      title: "Petroleum Engineer",
      futureScore: 42,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Petroleum Engineering", "Reservoir Simulation", "Sustainable Energy"],
      skillsEvolution: ["Petroleum Engineering", "Reservoir Engineering", "AI Tools for Petroleum Engineering"],
      industryDemand: 4.2,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    52: {
      title: "Mining Engineer",
      futureScore: 41,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Mining Engineering", "Automation in Mining", "Sustainable Mining Practices"],
      skillsEvolution: ["Mining Engineering", "Geology", "AI Tools for Mining Engineering"],
      industryDemand: 4.1,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    53: {
      title: "Geological Engineer",
      futureScore: 40,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Geological Engineering", "Geospatial Analysis", "Sustainable Resource Management"],
      skillsEvolution: ["Geological Engineering", "GIS", "AI Tools for Geological Engineering"],
      industryDemand: 4.0,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    54: {
      title: "Hydraulic Engineer",
      futureScore: 39,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Hydraulic Engineering", "Water Resources Management", "Sustainable Water Management"],
      skillsEvolution: ["Hydraulic Engineering", "Water Resources", "AI Tools for Hydraulic Engineering"],
      industryDemand: 3.9,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    55: {
      title: "Marine Engineer",
      futureScore: 38,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Marine Engineering", "Offshore Renewable Energy", "Sustainable Marine Practices"],
      skillsEvolution: ["Marine Engineering", "Naval Architecture", "AI Tools for Marine Engineering"],
      industryDemand: 3.8,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    56: {
      title: "Aerospace Engineer",
      futureScore: 37,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Aerospace Engineering", "Space Exploration Technologies", "Sustainable Aviation"],
      skillsEvolution: ["Aerospace Engineering", "Propulsion", "AI Tools for Aerospace Engineering"],
      industryDemand: 3.7,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    57: {
      title: "Nuclear Engineer",
      futureScore: 36,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Nuclear Engineering", "Nuclear Safety", "Sustainable Nuclear Energy"],
      skillsEvolution: ["Nuclear Engineering", "Radiation Safety", "AI Tools for Nuclear Engineering"],
      industryDemand: 3.6,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    58: {
      title: "Biochemical Engineer",
      futureScore: 35,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Biochemical Engineering", "Bioprocessing", "Sustainable Biochemicals"],
      skillsEvolution: ["Biochemical Engineering", "Biotechnology", "AI Tools for Biochemical Engineering"],
      industryDemand: 3.5,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    59: {
      title: "Biomedical Engineer",
      futureScore: 34,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Biomedical Engineering", "Telemedicine", "Sustainable Medical Devices"],
      skillsEvolution: ["Biomedical Engineering", "Clinical Engineering", "AI Tools for Biomedical Engineering"],
      industryDemand: 3.4,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    60: {
      title: "Robotics Engineer",
      futureScore: 33,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Robotics", "Autonomous Systems", "Sustainable Robotics"],
      skillsEvolution: ["Robotics", "Mechatronics", "AI Tools for Robotics"],
      industryDemand: 3.3,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    61: {
      title: "Mechatronics Engineer",
      futureScore: 32,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Mechatronics", "Smart Machines", "Sustainable Mechatronics"],
      skillsEvolution: ["Mechatronics", "Control Systems", "AI Tools for Mechatronics"],
      industryDemand: 3.2,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    62: {
      title: "Automation Engineer",
      futureScore: 31,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Automation", "Industrial IoT", "Sustainable Automation Solutions"],
      skillsEvolution: ["Automation", "Control Systems", "AI Tools for Automation"],
      industryDemand: 3.1,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    63: {
      title: "Control Systems Engineer",
      futureScore: 30,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Control Systems", "Smart Grids", "Sustainable Control Systems"],
      skillsEvolution: ["Control Systems", "Automation", "AI Tools for Control Systems"],
      industryDemand: 3.0,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    64: {
      title: "Instrumentation Engineer",
      futureScore: 29,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Instrumentation", "Smart Sensors", "Sustainable Instrumentation"],
      skillsEvolution: ["Instrumentation", "Control Systems", "AI Tools for Instrumentation"],
      industryDemand: 2.9,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    65: {
      title: "Electrical Technician",
      futureScore: 28,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Electrical Technology", "Smart Electrical Devices", "Sustainable Electrical Solutions"],
      skillsEvolution: ["Electrical Technology", "Installation", "AI Tools for Electrical Technology"],
      industryDemand: 2.8,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    66: {
      title: "Mechanical Technician",
      futureScore: 27,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Mechanical Technology", "Smart Mechanical Devices", "Sustainable Mechanical Solutions"],
      skillsEvolution: ["Mechanical Technology", "Installation", "AI Tools for Mechanical Technology"],
      industryDemand: 2.7,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    67: {
      title: "Civil Engineering Technician",
      futureScore: 26,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Civil Technology", "Smart Infrastructure", "Sustainable Civil Solutions"],
      skillsEvolution: ["Civil Technology", "Surveying", "AI Tools for Civil Technology"],
      industryDemand: 2.6,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    68: {
      title: "Electrical Engineering Technician",
      futureScore: 25,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Electrical Engineering Technology", "Smart Grids", "Sustainable Electrical Solutions"],
      skillsEvolution: ["Electrical Engineering Technology", "Installation", "AI Tools for Electrical Engineering Technology"],
      industryDemand: 2.5,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    69: {
      title: "Mechanical Engineering Technician",
      futureScore: 24,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Mechanical Engineering Technology", "Smart Manufacturing", "Sustainable Mechanical Solutions"],
      skillsEvolution: ["Mechanical Engineering Technology", "Installation", "AI Tools for Mechanical Engineering Technology"],
      industryDemand: 2.4,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    70: {
      title: "Robotics Technician",
      futureScore: 23,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Robotics Technology", "Smart Robots", "Sustainable Robotics Solutions"],
      skillsEvolution: ["Robotics Technology", "Programming", "AI Tools for Robotics Technology"],
      industryDemand: 2.3,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    71: {
      title: "Mechatronics Technician",
      futureScore: 22,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Mechatronics Technology", "Smart Mechatronic Systems", "Sustainable Mechatronics Solutions"],
      skillsEvolution: ["Mechatronics Technology", "Programming", "AI Tools for Mechatronics Technology"],
      industryDemand: 2.2,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    72: {
      title: "Automation Technician",
      futureScore: 21,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Automation Technology", "Smart Automation Systems", "Sustainable Automation Solutions"],
      skillsEvolution: ["Automation Technology", "Programming", "AI Tools for Automation Technology"],
      industryDemand: 2.1,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    73: {
      title: "Control Systems Technician",
      futureScore: 20,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Control Systems Technology", "Smart Control Systems", "Sustainable Control Solutions"],
      skillsEvolution: ["Control Systems Technology", "Programming", "AI Tools for Control Systems Technology"],
      industryDemand: 2.0,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    74: {
      title: "Instrumentation Technician",
      futureScore: 19,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Instrumentation Technology", "Smart Instrumentation", "Sustainable Instrumentation Solutions"],
      skillsEvolution: ["Instrumentation Technology", "Programming", "AI Tools for Instrumentation Technology"],
      industryDemand: 1.9,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    75: {
      title: "Data Center Technician",
      futureScore: 18,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Data Center Management", "Smart Data Centers", "Sustainable Data Center Solutions"],
      skillsEvolution: ["Data Center Management", "Networking", "AI Tools for Data Center Management"],
      industryDemand: 1.8,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    76: {
      title: "Network Technician",
      futureScore: 17,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Network Management Technology", "Smart Networks", "Sustainable Network Solutions"],
      skillsEvolution: ["Network Management Technology", "Networking", "AI Tools for Network Management Technology"],
      industryDemand: 1.7,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    77: {
      title: "Database Technician",
      futureScore: 16,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Database Management Technology", "Smart Databases", "Sustainable Database Solutions"],
      skillsEvolution: ["Database Management Technology", "SQL", "AI Tools for Database Management Technology"],
      industryDemand: 1.6,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    78: {
      title: "System Technician",
      futureScore: 15,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in System Management Technology", "Smart Systems", "Sustainable System Solutions"],
      skillsEvolution: ["System Management Technology", "Networking", "AI Tools for System Management Technology"],
      industryDemand: 1.5,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    79: {
      title: "Web Technician",
      futureScore: 14,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Web Development Technology", "Smart Web Solutions", "Sustainable Web Solutions"],
      skillsEvolution: ["Web Development Technology", "HTML", "AI Tools for Web Development Technology"],
      industryDemand: 1.4,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    80: {
      title: "Mobile App Technician",
      futureScore: 13,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Mobile Development Technology", "Smart Mobile Solutions", "Sustainable Mobile Solutions"],
      skillsEvolution: ["Mobile Development Technology", "Java", "AI Tools for Mobile Development Technology"],
      industryDemand: 1.3,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    81: {
      title: "Game Technician",
      futureScore: 12,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Game Development Technology", "Smart Games", "Sustainable Game Solutions"],
      skillsEvolution: ["Game Development Technology", "C++", "AI Tools for Game Development Technology"],
      industryDemand: 1.2,
      marketSaturation: "High",
      sustainabilityImpact: "High"
    },
    82: {
      title: "Data Analyst Intern",
      futureScore: 11,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Data Analysis", "Internship Programs", "Entry-Level Data Roles"],
      skillsEvolution: ["Data Analysis", "Excel", "AI Tools for Data Analysis"],
      industryDemand: 1.1,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    83: {
      title: "Business Analyst Intern",
      futureScore: 10,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Business Analysis", "Internship Programs", "Entry-Level Business Roles"],
      skillsEvolution: ["Business Analysis", "Data Analysis", "AI Tools for Business"],
      industryDemand: 1.0,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    84: {
      title: "Marketing Assistant",
      futureScore: 9,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Marketing", "Internship Programs", "Entry-Level Marketing Roles"],
      skillsEvolution: ["Marketing", "Data Analysis", "AI Tools for Marketing"],
      industryDemand: 0.9,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    85: {
      title: "Sales Assistant",
      futureScore: 8,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Sales", "Internship Programs", "Entry-Level Sales Roles"],
      skillsEvolution: ["Sales", "Customer Service", "AI Tools for Sales"],
      industryDemand: 0.8,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    86: {
      title: "Customer Support Intern",
      futureScore: 7,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Customer Support", "Internship Programs", "Entry-Level Support Roles"],
      skillsEvolution: ["Customer Support", "Data Analysis", "AI Tools for Customer Support"],
      industryDemand: 0.7,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    87: {
      title: "HR Intern",
      futureScore: 6,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in HR", "Internship Programs", "Entry-Level HR Roles"],
      skillsEvolution: ["HR", "Data Analysis", "AI Tools for HR"],
      industryDemand: 0.6,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    88: {
      title: "Finance Intern",
      futureScore: 5,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Finance", "Internship Programs", "Entry-Level Finance Roles"],
      skillsEvolution: ["Finance", "Data Analysis", "AI Tools for Finance"],
      industryDemand: 0.5,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    89: {
      title: "Operations Intern",
      futureScore: 4,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Operations", "Internship Programs", "Entry-Level Operations Roles"],
      skillsEvolution: ["Operations", "Data Analysis", "AI Tools for Operations"],
      industryDemand: 0.4,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    90: {
      title: "Project Management Intern",
      futureScore: 3,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Project Management", "Internship Programs", "Entry-Level Project Roles"],
      skillsEvolution: ["Project Management", "Data Analysis", "AI Tools for Project Management"],
      industryDemand: 0.3,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    91: {
      title: "Research Intern",
      futureScore: 2,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Research", "Internship Programs", "Entry-Level Research Roles"],
      skillsEvolution: ["Research", "Data Analysis", "AI Tools for Research"],
      industryDemand: 0.2,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    92: {
      title: "Data Entry Clerk",
      futureScore: 1,
      automationRisk: "Medium",
      growthTrend: "Low",
      emergingAreas: ["AI in Data Entry", "Internship Programs", "Entry-Level Data Entry Roles"],
      skillsEvolution: ["Data Entry", "Excel", "AI Tools for Data Entry"],
      industryDemand: 0.1,
      marketSaturation: "High",
      sustainabilityImpact: "Medium"
    },
    93: {
      title: "Freelance Writer",
      futureScore: 85,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI-Assisted Writing", "Content Strategy", "Digital Marketing"],
      skillsEvolution: ["SEO", "Content Management", "AI Writing Tools"],
      industryDemand: 8.5,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    94: {
      title: "Social Media Manager",
      futureScore: 84,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Social Media", "Content Creation", "Social Media Analytics"],
      skillsEvolution: ["Social Media Strategy", "Data Analysis", "AI Tools for Social Media"],
      industryDemand: 8.4,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    95: {
      title: "SEO Specialist",
      futureScore: 83,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["Voice Search Optimization", "AI-Powered SEO", "Video SEO"],
      skillsEvolution: ["SEO Analytics", "Content Optimization", "Technical SEO"],
      industryDemand: 8.3,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    96: {
      title: "Content Creator",
      futureScore: 82,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI Content Creation", "Content Personalization", "Interactive Content"],
      skillsEvolution: ["Content Management Systems", "SEO", "Data Analytics"],
      industryDemand: 8.2,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    97: {
      title: "Brand Strategist",
      futureScore: 81,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Branding", "Sustainable Branding", "Digital Brand Management"],
      skillsEvolution: ["Brand Management", "Data Analysis", "AI Tools for Branding"],
      industryDemand: 8.1,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    98: {
      title: "Market Research Analyst",
      futureScore: 80,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Market Research", "Consumer Behavior Analytics", "Predictive Modeling"],
      skillsEvolution: ["Market Research", "Data Analysis", "AI Tools for Market Research"],
      industryDemand: 8.0,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    99: {
      title: "Public Relations Specialist",
      futureScore: 79,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in PR", "Crisis Management", "Digital PR"],
      skillsEvolution: ["Public Relations", "Media Relations", "AI Tools for PR"],
      industryDemand: 7.9,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    100: {
      title: "Event Planner",
      futureScore: 78,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Event Planning", "Virtual Events", "Sustainable Events"],
      skillsEvolution: ["Event Management", "Data Analysis", "AI Tools for Event Planning"],
      industryDemand: 7.8,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    101: {
      title: "Advertising Specialist",
      futureScore: 77,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Advertising", "Programmatic Advertising", "Sustainable Advertising"],
      skillsEvolution: ["Advertising", "Data Analysis", "AI Tools for Advertising"],
      industryDemand: 7.7,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    102: {
      title: "Sales Engineer",
      futureScore: 76,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Sales Engineering", "Technical Sales", "Sustainable Sales Solutions"],
      skillsEvolution: ["Sales Engineering", "Data Analysis", "AI Tools for Sales Engineering"],
      industryDemand: 7.6,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    103: {
      title: "Customer Success Manager",
      futureScore: 75,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Customer Success", "Customer Journey Analytics", "Sustainable Customer Success"],
      skillsEvolution: ["Customer Success", "Data Analysis", "AI Tools for Customer Success"],
      industryDemand: 7.5,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    104: {
      title: "Business Development Manager",
      futureScore: 74,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Business Development", "Strategic Partnerships", "Sustainable Business Development"],
      skillsEvolution: ["Business Development", "Data Analysis", "AI Tools for Business Development"],
      industryDemand: 7.4,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    105: {
      title: "Account Manager",
      futureScore: 73,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Account Management", "Customer Relationship Management", "Sustainable Account Management"],
      skillsEvolution: ["Account Management", "Data Analysis", "AI Tools for Account Management"],
      industryDemand: 7.3,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    106: {
      title: "Product Marketing Manager",
      futureScore: 72,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Product Marketing", "Go-to-Market Strategy", "Sustainable Product Marketing"],
      skillsEvolution: ["Product Marketing", "Data Analysis", "AI Tools for Product Marketing"],
      industryDemand: 7.2,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    107: {
      title: "Digital Marketing Manager",
      futureScore: 71,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Digital Marketing", "Marketing Automation", "Sustainable Digital Marketing"],
      skillsEvolution: ["Digital Marketing", "Data Analysis", "AI Tools for Digital Marketing"],
      industryDemand: 7.1,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    108: {
      title: "E-commerce Manager",
      futureScore: 70,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in E-commerce", "Personalization Engines", "Sustainable E-commerce"],
      skillsEvolution: ["E-commerce", "Data Analysis", "AI Tools for E-commerce"],
      industryDemand: 7.0,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    109: {
      title: "Affiliate Marketing Manager",
      futureScore: 69,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Affiliate Marketing", "Performance Marketing", "Sustainable Affiliate Marketing"],
      skillsEvolution: ["Affiliate Marketing", "Data Analysis", "AI Tools for Affiliate Marketing"],
      industryDemand: 6.9,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    110: {
      title: "Influencer Marketing Manager",
      futureScore: 68,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Influencer Marketing", "Social Commerce", "Sustainable Influencer Marketing"],
      skillsEvolution: ["Influencer Marketing", "Data Analysis", "AI Tools for Influencer Marketing"],
      industryDemand: 6.8,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    111: {
      title: "Content Marketing Manager",
      futureScore: 67,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Content Marketing", "Content Distribution", "Sustainable Content Marketing"],
      skillsEvolution: ["Content Marketing", "Data Analysis", "AI Tools for Content Marketing"],
      industryDemand: 6.7,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    112: {
      title: "SEO Manager",
      futureScore: 66,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in SEO", "Search Engine Marketing", "Sustainable SEO"],
      skillsEvolution: ["SEO", "Data Analysis", "AI Tools for SEO"],
      industryDemand: 6.6,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    113: {
      title: "PPC Specialist",
      futureScore: 65,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in PPC", "Programmatic Advertising", "Sustainable PPC"],
      skillsEvolution: ["PPC", "Data Analysis", "AI Tools for PPC"],
      industryDemand: 6.5,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    114: {
      title: "Email Marketing Specialist",
      futureScore: 64,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Email Marketing", "Marketing Automation", "Sustainable Email Marketing"],
      skillsEvolution: ["Email Marketing", "Data Analysis", "AI Tools for Email Marketing"],
      industryDemand: 6.4,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    115: {
      title: "Marketing Automation Specialist",
      futureScore: 63,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Marketing Automation", "Customer Journey Automation", "Sustainable Marketing Automation"],
      skillsEvolution: ["Marketing Automation", "Data Analysis", "AI Tools for Marketing Automation"],
      industryDemand: 6.3,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    116: {
      title: "Conversion Rate Optimization Specialist",
      futureScore: 62,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Conversion Rate Optimization", "A/B Testing", "Sustainable Conversion Optimization"],
      skillsEvolution: ["Conversion Rate Optimization", "Data Analysis", "AI Tools for Conversion Rate Optimization"],
      industryDemand: 6.2,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    117: {
      title: "Web Analytics Specialist",
      futureScore: 61,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Web Analytics", "Predictive Analytics", "Sustainable Web Analytics"],
      skillsEvolution: ["Web Analytics", "Data Analysis", "AI Tools for Web Analytics"],
      industryDemand: 6.1,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    118: {
      title: "Data Privacy Officer",
      futureScore: 60,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Data Privacy", "Privacy Compliance", "Sustainable Data Privacy Practices"],
      skillsEvolution: ["Data Privacy", "Legal Compliance", "AI Tools for Data Privacy"],
      industryDemand: 6.0,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    119: {
      title: "Chief Marketing Officer (CMO)",
      futureScore: 59,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Marketing Leadership", "Data-Driven Marketing", "Sustainable Marketing Strategies"],
      skillsEvolution: ["Marketing Leadership", "Data Analysis", "AI Tools for Marketing Leadership"],
      industryDemand: 5.9,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    120: {
      title: "Chief Sales Officer (CSO)",
      futureScore: 58,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Sales Leadership", "Sales Strategy Optimization", "Sustainable Sales Practices"],
      skillsEvolution: ["Sales Leadership", "Data Analysis", "AI Tools for Sales Leadership"],
      industryDemand: 5.8,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    121: {
      title: "Chief Executive Officer (CEO)",
      futureScore: 57,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Executive Leadership", "Strategic Decision Making", "Sustainable Business Practices"],
      skillsEvolution: ["Executive Leadership", "Data Analysis", "AI Tools for Executive Leadership"],
      industryDemand: 5.7,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    122: {
      title: "Chief Technology Officer (CTO)",
      futureScore: 56,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Technology Leadership", "Innovation Management", "Sustainable Technology Practices"],
      skillsEvolution: ["Technology Leadership", "Data Analysis", "AI Tools for Technology Leadership"],
      industryDemand: 5.6,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    123: {
      title: "Chief Financial Officer (CFO)",
      futureScore: 55,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Financial Leadership", "Predictive Financial Analytics", "Sustainable Finance Practices"],
      skillsEvolution: ["Financial Leadership", "Data Analysis", "AI Tools for Financial Leadership"],
      industryDemand: 5.5,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    124: {
      title: "Chief Operating Officer (COO)",
      futureScore: 54,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Operations Leadership", "Operational Efficiency", "Sustainable Operations Practices"],
      skillsEvolution: ["Operations Leadership", "Data Analysis", "AI Tools for Operations Leadership"],
      industryDemand: 5.4,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    125: {
      title: "Chief Human Resources Officer (CHRO)",
      futureScore: 53,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in HR Leadership", "People Analytics", "Sustainable HR Practices"],
      skillsEvolution: ["HR Leadership", "Data Analysis", "AI Tools for HR Leadership"],
      industryDemand: 5.3,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    126: {
      title: "Chief Compliance Officer (CCO)",
      futureScore: 52,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Compliance Leadership", "Regulatory Technology", "Sustainable Compliance Practices"],
      skillsEvolution: ["Compliance Leadership", "Data Analysis", "AI Tools for Compliance Leadership"],
      industryDemand: 5.2,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    127: {
      title: "Chief Risk Officer (CRO)",
      futureScore: 51,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Risk Leadership", "Predictive Risk Analytics", "Sustainable Risk Management Practices"],
      skillsEvolution: ["Risk Leadership", "Data Analysis", "AI Tools for Risk Leadership"],
      industryDemand: 5.1,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    128: {
      title: "Chief Data Officer (CDO)",
      futureScore: 50,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Data Leadership", "Data Governance", "Sustainable Data Practices"],
      skillsEvolution: ["Data Leadership", "Data Analysis", "AI Tools for Data Leadership"],
      industryDemand: 5.0,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    129: {
      title: "Chief Information Officer (CIO)",
      futureScore: 49,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Information Leadership", "IT Strategy", "Sustainable IT Practices"],
      skillsEvolution: ["Information Leadership", "Data Analysis", "AI Tools for Information Leadership"],
      industryDemand: 4.9,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    130: {
      title: "Chief Security Officer (CSO)",
      futureScore: 48,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Security Leadership", "Cybersecurity Strategy", "Sustainable Security Practices"],
      skillsEvolution: ["Security Leadership", "Data Analysis", "AI Tools for Security Leadership"],
      industryDemand: 4.8,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    131: {
      title: "Chief Innovation Officer (CINO)",
      futureScore: 47,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Innovation Leadership", "Digital Transformation", "Sustainable Innovation Practices"],
      skillsEvolution: ["Innovation Leadership", "Data Analysis", "AI Tools for Innovation Leadership"],
      industryDemand: 4.7,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    132: {
      title: "Chief Strategy Officer (CSO)",
      futureScore: 46,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Strategy Leadership", "Business Model Innovation", "Sustainable Strategy Practices"],
      skillsEvolution: ["Strategy Leadership", "Data Analysis", "AI Tools for Strategy Leadership"],
      industryDemand: 4.6,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    133: {
      title: "Chief Sustainability Officer (CSO)",
      futureScore: 45,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Sustainability Leadership", "Corporate Social Responsibility", "Sustainable Business Practices"],
      skillsEvolution: ["Sustainability Leadership", "Data Analysis", "AI Tools for Sustainability Leadership"],
      industryDemand: 4.5,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    134: {
      title: "Chief Diversity Officer (CDO)",
      futureScore: 44,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Diversity Leadership", "Inclusion Strategies", "Sustainable Diversity Practices"],
      skillsEvolution: ["Diversity Leadership", "Data Analysis", "AI Tools for Diversity Leadership"],
      industryDemand: 4.4,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    135: {
      title: "Chief Talent Officer (CTO)",
      futureScore: 43,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Talent Management", "Employee Experience", "Sustainable Talent Practices"],
      skillsEvolution: ["Talent Management", "Data Analysis", "AI Tools for Talent Management"],
      industryDemand: 4.3,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    136: {
      title: "Chief Learning Officer (CLO)",
      futureScore: 42,
      automationRisk: "Low",
      skillsEvolution: ["Learning and Development", "Data Analysis", "AI Tools for Learning and Development"],
      industryDemand: 4.2,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    137: {
      title: "Chief Knowledge Officer (CKO)",
      futureScore: 41,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Knowledge Management", "Knowledge Sharing", "Sustainable Knowledge Practices"],
      skillsEvolution: ["Knowledge Management", "Data Analysis", "AI Tools for Knowledge Management"],
      industryDemand: 4.1,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    138: {
      title: "Chief Information Security Officer (CISO)",
      futureScore: 40,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Information Security", "Cybersecurity Leadership", "Sustainable Security Practices"],
      skillsEvolution: ["Information Security", "Data Analysis", "AI Tools for Information Security"],
      industryDemand: 4.0,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    139: {
      title: "Chief Data Privacy Officer (CDPO)",
      futureScore: 39,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Data Privacy Leadership", "Privacy Risk Management", "Sustainable Data Privacy Practices"],
      skillsEvolution: ["Data Privacy Leadership", "Data Analysis", "AI Tools for Data Privacy Leadership"],
      industryDemand: 3.9,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    140: {
      title: "Chief Compliance and Ethics Officer",
      futureScore: 38,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Compliance and Ethics", "Regulatory Compliance", "Sustainable Compliance Practices"],
      skillsEvolution: ["Compliance and Ethics", "Data Analysis", "AI Tools for Compliance and Ethics"],
      industryDemand: 3.8,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    141: {
      title: "Chief Risk and Assurance Officer",
      futureScore: 37,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Risk and Assurance", "Predictive Risk Management", "Sustainable Risk Practices"],
      skillsEvolution: ["Risk and Assurance", "Data Analysis", "AI Tools for Risk and Assurance"],
      industryDemand: 3.7,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    142: {
      title: "Chief Audit Executive",
      futureScore: 36,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Auditing", "Continuous Auditing", "Sustainable Auditing Practices"],
      skillsEvolution: ["Auditing", "Data Analysis", "AI Tools for Auditing"],
      industryDemand: 3.6,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    143: {
      title: "Chief Internal Controls Officer",
      futureScore: 35,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Internal Controls", "Automated Controls", "Sustainable Internal Controls Practices"],
      skillsEvolution: ["Internal Controls", "Data Analysis", "AI Tools for Internal Controls"],
      industryDemand: 3.5,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    144: {
      title: "Chief Financial Crime Officer",
      futureScore: 34,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Financial Crime Prevention", "Fraud Detection", "Sustainable Financial Crime Practices"],
      skillsEvolution: ["Financial Crime Prevention", "Data Analysis", "AI Tools for Financial Crime Prevention"],
      industryDemand: 3.4,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    145: {
      title: "Chief Anti-Money Laundering Officer",
      futureScore: 33,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in AML", "Transaction Monitoring", "Sustainable AML Practices"],
      skillsEvolution: ["Anti-Money Laundering", "Data Analysis", "AI Tools for AML"],
      industryDemand: 3.3,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    146: {
      title: "Chief Counter-Terrorism Financing Officer",
      futureScore: 32,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in CTF", "Risk Assessment", "Sustainable CTF Practices"],
      skillsEvolution: ["Counter-Terrorism Financing", "Data Analysis", "AI Tools for CTF"],
      industryDemand: 3.2,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    147: {
      title: "Chief Data Governance Officer",
      futureScore: 31,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Data Governance", "Data Stewardship", "Sustainable Data Governance Practices"],
      skillsEvolution: ["Data Governance", "Data Analysis", "AI Tools for Data Governance"],
      industryDemand: 3.1,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    148: {
      title: "Chief Metadata Officer",
      futureScore: 30,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Metadata Management", "Metadata Strategy", "Sustainable Metadata Practices"],
      skillsEvolution: ["Metadata Management", "Data Analysis", "AI Tools for Metadata Management"],
      industryDemand: 3.0,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    149: {
      title: "Chief Master Data Officer",
      futureScore: 29,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Master Data Management", "Data Quality", "Sustainable Master Data Practices"],
      skillsEvolution: ["Master Data Management", "Data Analysis", "AI Tools for Master Data Management"],
      industryDemand: 2.9,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    150: {
      title: "Chief Reference Data Officer",
      futureScore: 28,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Reference Data Management", "Data Consistency", "Sustainable Reference Data Practices"],
      skillsEvolution: ["Reference Data Management", "Data Analysis", "AI Tools for Reference Data Management"],
      industryDemand: 2.8,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    151: {
      title: "Chief Data Quality Officer",
      futureScore: 27,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Data Quality Management", "Data Cleansing", "Sustainable Data Quality Practices"],
      skillsEvolution: ["Data Quality Management", "Data Analysis", "AI Tools for Data Quality Management"],
      industryDemand: 2.7,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    152: {
      title: "Chief Data Architecture Officer",
      futureScore: 26,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Data Architecture", "Data Modeling", "Sustainable Data Architecture Practices"],
      skillsEvolution: ["Data Architecture", "Data Analysis", "AI Tools for Data Architecture"],
      industryDemand: 2.6,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    153: {
      title: "Chief Data Integration Officer",
      futureScore: 25,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Data Integration", "Data Interoperability", "Sustainable Data Integration Practices"],
      skillsEvolution: ["Data Integration", "Data Analysis", "AI Tools for Data Integration"],
      industryDemand: 2.5,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    154: {
      title: "Chief Data Migration Officer",
      futureScore: 24,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Data Migration", "Data Transfer", "Sustainable Data Migration Practices"],
      skillsEvolution: ["Data Migration", "Data Analysis", "AI Tools for Data Migration"],
      industryDemand: 2.4,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    155: {
      title: "Chief Data Warehousing Officer",
      futureScore: 23,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Data Warehousing", "Data Lakes", "Sustainable Data Warehousing Practices"],
      skillsEvolution: ["Data Warehousing", "Data Analysis", "AI Tools for Data Warehousing"],
      industryDemand: 2.3,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    156: {
      title: "Chief Data Visualization Officer",
      futureScore: 22,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Data Visualization", "Data Storytelling", "Sustainable Data Visualization Practices"],
      skillsEvolution: ["Data Visualization", "Data Analysis", "AI Tools for Data Visualization"],
      industryDemand: 2.2,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    157: {
      title: "Chief Data Analytics Officer",
      futureScore: 21,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Data Analytics", "Predictive Analytics", "Sustainable Data Analytics Practices"],
      skillsEvolution: ["Data Analytics", "Data Analysis", "AI Tools for Data Analytics"],
      industryDemand: 2.1,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    158: {
      title: "Chief Business Intelligence Officer",
      futureScore: 20,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Business Intelligence", "Self-Service BI", "Sustainable Business Intelligence Practices"],
      skillsEvolution: ["Business Intelligence", "Data Analysis", "AI Tools for Business Intelligence"],
      industryDemand: 2.0,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    159: {
      title: "Chief Performance Officer",
      futureScore: 19,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Performance Management", "OKR Software", "Sustainable Performance Practices"],
      skillsEvolution: ["Performance Management", "Data Analysis", "AI Tools for Performance Management"],
      industryDemand: 1.9,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    160: {
      title: "Chief Strategy and Innovation Officer",
      futureScore: 18,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Strategy and Innovation", "Business Model Innovation", "Sustainable Strategy Practices"],
      skillsEvolution: ["Strategy and Innovation", "Data Analysis", "AI Tools for Strategy and Innovation"],
      industryDemand: 1.8,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    161: {
      title: "Chief Digital Officer",
      futureScore: 17,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Digital Transformation", "Digital Strategy", "Sustainable Digital Practices"],
      skillsEvolution: ["Digital Transformation", "Data Analysis", "AI Tools for Digital Transformation"],
      industryDemand: 1.7,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    162: {
      title: "Chief Technology and Innovation Officer",
      futureScore: 16,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Technology and Innovation", "Emerging Technologies", "Sustainable Technology Practices"],
      skillsEvolution: ["Technology and Innovation", "Data Analysis", "AI Tools for Technology and Innovation"],
      industryDemand: 1.6,
      marketSaturation: "Medium",
      sustainabilityImpact: "Low"
    },
    163: {
      title: "Chief Research and Development Officer",
      futureScore: 15,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in R&D", "Innovation Management", "Sustainable R&D"],
      skillsEvolution: ["R&D Management", "Innovation Leadership", "AI Tools for R&D"],
      industryDemand: 1.5,
      marketSaturation: "Medium",
      sustainabilityImpact: "High"
    },
    164: {
      title: "Chief Artificial Intelligence Officer",
      futureScore: 14,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI Strategy", "AI Ethics", "Sustainable AI"],
      skillsEvolution: ["AI Governance", "Ethical AI", "AI Tools for Management"],
      industryDemand: 1.4,
      marketSaturation: "Medium",
      sustainabilityImpact: "High"
    },
    165: {
      title: "Chief Data Science Officer",
      futureScore: 13,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Data Science", "Predictive Modeling", "Sustainable Data Science"],
      skillsEvolution: ["Data Science", "Machine Learning", "AI Tools for Data Science"],
      industryDemand: 1.3,
      marketSaturation: "Medium",
      sustainabilityImpact: "High"
    },
    166: {
      title: "Chief Machine Learning Officer",
      futureScore: 12,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Machine Learning", "Automated ML", "Sustainable Machine Learning"],
      skillsEvolution: ["Machine Learning", "Deep Learning", "AI Tools for ML"],
      industryDemand: 1.2,
      marketSaturation: "Medium",
      sustainabilityImpact: "High"
    },
    167: {
      title: "Chief Robotics Officer",
      futureScore: 11,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Robotics", "Autonomous Systems", "Sustainable Robotics"],
      skillsEvolution: ["Robotics", "AI Programming", "AI Tools for Robotics"],
      industryDemand: 1.1,
      marketSaturation: "Medium",
      sustainabilityImpact: "High"
    },
    168: {
      title: "Chief Blockchain Officer",
      futureScore: 10,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Blockchain", "Decentralized Finance", "Sustainable Blockchain Solutions"],
      skillsEvolution: ["Blockchain Development", "Smart Contracts", "AI Tools for Blockchain"],
      industryDemand: 1.0,
      marketSaturation: "Medium",
      sustainabilityImpact: "High"
    },
    169: {
      title: "Chief Cybersecurity Officer",
      futureScore: 9,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Cybersecurity", "Threat Intelligence", "Sustainable Cybersecurity Practices"],
      skillsEvolution: ["Cybersecurity", "AI Security Tools", "Incident Response"],
      industryDemand: 0.9,
      marketSaturation: "Medium",
      sustainabilityImpact: "High"
    },
    170: {
      title: "Chief Cloud Officer",
      futureScore: 8,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Cloud Computing", "Cloud Security", "Sustainable Cloud Solutions"],
      skillsEvolution: ["Cloud Computing", "AI Cloud Services", "Cloud Architecture"],
      industryDemand: 0.8,
      marketSaturation: "Medium",
      sustainabilityImpact: "High"
    },
    171: {
      title: "Chief IoT Officer",
      futureScore: 7,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in IoT", "Smart Devices", "Sustainable IoT Solutions"],
      skillsEvolution: ["IoT Development", "AI Integration", "IoT Security"],
      industryDemand: 0.7,
      marketSaturation: "Medium",
      sustainabilityImpact: "High"
    },
    172: {
      title: "Chief AR/VR Officer",
      futureScore: 6,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in AR/VR", "Immersive Experiences", "Sustainable AR/VR Solutions"],
      skillsEvolution: ["AR/VR Development", "3D Modeling", "AI Tools for AR/VR"],
      industryDemand: 0.6,
      marketSaturation: "Medium",
      sustainabilityImpact: "High"
    },
    173: {
      title: "Chief Quantum Computing Officer",
      futureScore: 5,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Quantum Computing", "Quantum Algorithms", "Sustainable Quantum Solutions"],
      skillsEvolution: ["Quantum Computing", "Quantum Cryptography", "AI Tools for Quantum Computing"],
      industryDemand: 0.5,
      marketSaturation: "Medium",
      sustainabilityImpact: "High"
    },
    174: {
      title: "Chief 5G Officer",
      futureScore: 4,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in 5G Technology", "Network Slicing", "Sustainable 5G Solutions"],
      skillsEvolution: ["5G Technology", "AI Network Management", "Telecommunications"],
      industryDemand: 0.4,
      marketSaturation: "Medium",
      sustainabilityImpact: "High"
    },
    175: {
      title: "Chief Smart Cities Officer",
      futureScore: 3,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Smart Cities", "Urban AI Solutions", "Sustainable Urban Development"],
      skillsEvolution: ["Smart City Technologies", "Data Analysis", "AI Tools for Urban Planning"],
      industryDemand: 0.3,
      marketSaturation: "Medium",
      sustainabilityImpact: "High"
    },
    176: {
      title: "Chief Digital Twin Officer",
      futureScore: 2,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Digital Twins", "Simulation Technologies", "Sustainable Digital Twin Solutions"],
      skillsEvolution: ["Digital Twin Technology", "AI Simulation", "Data Analysis"],
      industryDemand: 0.2,
      marketSaturation: "Medium",
      sustainabilityImpact: "High"
    },
    177: {
      title: "Chief Metaverse Officer",
      futureScore: 1,
      automationRisk: "Low",
      growthTrend: "Medium",
      emergingAreas: ["AI in Metaverse", "Virtual Economies", "Sustainable Metaverse Development"],
      skillsEvolution: ["Metaverse Development", "Blockchain", "AI Tools for Metaverse"],
      industryDemand: 0.1,
      marketSaturation: "Medium",
      sustainabilityImpact: "High"
    },
    178: {
      title: "ENT Specialist",
      futureScore: 86,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in ENT Diagnosis", "Telemedicine", "Personalized Medicine"],
      skillsEvolution: ["ENT Diagnostic Tools", "Telehealth Platforms", "Genomic Medicine"],
      industryDemand: 8.6,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    179: {
      title: "Neurosurgeon",
      futureScore: 89,
      automationRisk: "Low",
      growthTrend: "High", 
      emergingAreas: ["AI-Assisted Surgery", "Brain-Computer Interfaces", "Precision Neurology"],
      skillsEvolution: ["Robotic Surgery", "Neural Imaging", "BCI Technology"],
      industryDemand: 8.9,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    180: {
      title: "Cardiologist",
      futureScore: 88,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI-Assisted Diagnosis", "Remote Monitoring", "Precision Medicine"],
      skillsEvolution: ["Digital Health Tools", "AI Diagnostics", "Preventive Cardiology"],
      industryDemand: 8.8,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    181: {
      title: "Dermatologist",
      futureScore: 87,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["Teledermatology", "AI Skin Analysis", "Personalized Skincare"],
      skillsEvolution: ["Dermatological AI Tools", "Telemedicine", "Skin Cancer Detection"],
      industryDemand: 8.7,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    182: {
      title: "Pediatrician",
      futureScore: 90,
      automationRisk: "Low",
      growthTrend: "Very High",
      emergingAreas: ["AI in Pediatric Care", "Remote Monitoring for Kids", "Personalized Pediatric Medicine"],
      skillsEvolution: ["Pediatric AI Tools", "Telehealth for Children", "Child Development Analytics"],
      industryDemand: 9.0,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    183: {
      title: "Geriatrician",
      futureScore: 89,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Geriatric Care", "Remote Health Monitoring", "Aging Analytics"],
      skillsEvolution: ["Geriatric AI Tools", "Telehealth for Seniors", "Chronic Disease Management"],
      industryDemand: 8.9,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    184: {
      title: "Oncologist",
      futureScore: 91,
      automationRisk: "Low",
      growthTrend: "Very High",
      emergingAreas: ["AI in Oncology", "Precision Cancer Treatment", "Remote Patient Monitoring"],
      skillsEvolution: ["Oncology AI Tools", "Telemedicine", "Cancer Genomics"],
      industryDemand: 9.1,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    185: {
      title: "Radiologist",
      futureScore: 92,
      automationRisk: "Low",
      growthTrend: "Very High",
      emergingAreas: ["AI in Radiology", "Tele-radiology", "Automated Image Analysis"],
      skillsEvolution: ["Radiology AI Tools", "Telemedicine", "Image Interpretation Algorithms"],
      industryDemand: 9.2,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    186: {
      title: "Pathologist",
      futureScore: 90,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Pathology", "Digital Pathology", "Automated Diagnostic Systems"],
      skillsEvolution: ["Pathology AI Tools", "Telepathology", "Diagnostic Algorithm Development"],
      industryDemand: 9.0,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    187: {
      title: "Pharmacist",
      futureScore: 88,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Pharmacy", "Personalized Medicine", "Telepharmacy"],
      skillsEvolution: ["Pharmacy AI Tools", "Telemedicine", "Medication Therapy Management"],
      industryDemand: 8.8,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    188: {
      title: "Occupational Therapist",
      futureScore: 87,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Occupational Therapy", "Remote Rehabilitation", "Smart Prosthetics"],
      skillsEvolution: ["OT AI Tools", "Tele-rehabilitation", "Prosthetic Design and Management"],
      industryDemand: 8.7,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    189: {
      title: "Physical Therapist",
      futureScore: 86,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Physical Therapy", "Remote Patient Monitoring", "Smart Rehabilitation Devices"],
      skillsEvolution: ["PT AI Tools", "Telehealth", "Rehabilitation Robotics"],
      industryDemand: 8.6,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    190: {
      title: "Speech-Language Pathologist",
      futureScore: 85,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Speech Therapy", "Telepractice", "Augmentative and Alternative Communication (AAC)"],
      skillsEvolution: ["Speech Therapy AI Tools", "Telepractice Platforms", "AAC Device Management"],
      industryDemand: 8.5,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    191: {
      title: "Dietitian/Nutritionist",
      futureScore: 84,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Nutrition", "Personalized Diet Plans", "Telehealth Nutrition Counseling"],
      skillsEvolution: ["Nutrition AI Tools", "Telehealth", "Dietary Analysis Software"],
      industryDemand: 8.4,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    192: {
      title: "Fitness Trainer",
      futureScore: 83,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Fitness Coaching", "Virtual Fitness Training", "Wearable Fitness Technology"],
      skillsEvolution: ["Fitness AI Tools", "Virtual Training Platforms", "Wearable Tech Integration"],
      industryDemand: 8.3,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    193: {
      title: "Wellness Coach",
      futureScore: 82,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Wellness Coaching", "Telewellness", "Personalized Wellness Plans"],
      skillsEvolution: ["Wellness AI Tools", "Telehealth", "Behavioral Analytics"],
      industryDemand: 8.2,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    194: {
      title: "Mental Health Counselor",
      futureScore: 81,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Mental Health", "Teletherapy", "Mental Health Analytics"],
      skillsEvolution: ["Mental Health AI Tools", "Teletherapy Platforms", "Psychometric Analysis"],
      industryDemand: 8.1,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    195: {
      title: "Substance Abuse Counselor",
      futureScore: 80,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Addiction Treatment", "Telehealth for Substance Abuse", "Predictive Analytics for Relapse Prevention"],
      skillsEvolution: ["Addiction Counseling AI Tools", "Telehealth", "Relapse Prevention Analytics"],
      industryDemand: 8.0,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    196: {
      title: "Marriage and Family Therapist",
      futureScore: 79,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Couples Therapy", "Teletherapy for Families", "Predictive Analytics for Relationship Counseling"],
      skillsEvolution: ["Couples Therapy AI Tools", "Teletherapy", "Relationship Dynamics Analysis"],
      industryDemand: 7.9,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    197: {
      title: "School Counselor",
      futureScore: 78,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in School Counseling", "Teletherapy for Students", "Behavioral Analytics"],
      skillsEvolution: ["School Counseling AI Tools", "Teletherapy", "Student Performance Analytics"],
      industryDemand: 7.8,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    198: {
      title: "Career Counselor",
      futureScore: 77,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Career Counseling", "Telecounseling", "Labor Market Analytics"],
      skillsEvolution: ["Career Counseling AI Tools", "Telecounseling", "Job Market Analysis"],
      industryDemand: 7.7,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    199: {
      title: "Academic Advisor",
      futureScore: 76,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Academic Advising", "Teleadvising", "Student Success Analytics"],
      skillsEvolution: ["Academic Advising AI Tools", "Teleadvising", "Student Engagement Analytics"],
      industryDemand: 7.6,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    200: {
      title: "Financial Advisor",
      futureScore: 75,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Financial Planning", "Robo-Advisors", "Sustainable Investing"],
      skillsEvolution: ["Financial Planning AI Tools", "Robo-Advisory Platforms", "Sustainable Investment Analysis"],
      industryDemand: 7.5,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    201: {
      title: "Investment Banker",
      futureScore: 74,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Investment Banking", "Algorithmic Trading", "Blockchain for Banking"],
      skillsEvolution: ["Investment Banking AI Tools", "Algorithmic Trading Platforms", "Blockchain Integration"],
      industryDemand: 7.4,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    202: {
      title: "Real Estate Agent",
      futureScore: 73,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Real Estate", "Virtual Property Tours", "Blockchain for Real Estate"],
      skillsEvolution: ["Real Estate AI Tools", "Virtual Tour Software", "Blockchain for Transactions"],
      industryDemand: 7.3,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    203: {
      title: "Property Manager",
      futureScore: 72,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Property Management", "Smart Building Technology", "Sustainable Property Practices"],
      skillsEvolution: ["Property Management AI Tools", "Smart Building Systems", "Sustainability Assessment"],
      industryDemand: 7.2,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    204: {
      title: "Construction Manager",
      futureScore: 71,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Construction Management", "Building Information Modeling (BIM)", "Sustainable Construction Practices"],
      skillsEvolution: ["Construction Management AI Tools", "BIM Software", "Sustainability in Construction"],
      industryDemand: 7.1,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    205: {
      title: "Surveyor",
      futureScore: 70,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Surveying", "Drones for Land Surveying", "Geographic Information Systems (GIS)"],
      skillsEvolution: ["Surveying AI Tools", "Drone Operation", "GIS Software"],
      industryDemand: 7.0,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    206: {
      title: "Urban Designer",
      futureScore: 69,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Urban Design", "3D City Modeling", "Sustainable Urban Development"],
      skillsEvolution: ["Urban Design AI Tools", "3D Modeling Software", "Sustainability in Urban Planning"],
      industryDemand: 6.9,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    207: {
      title: "Transport Planner",
      futureScore: 68,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Transport Planning", "Smart Mobility Solutions", "Sustainable Transport Systems"],
      skillsEvolution: ["Transport Planning AI Tools", "Smart Mobility Software", "Sustainability in Transport"],
      industryDemand: 6.8,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    208: {
      title: "Logistics Manager",
      futureScore: 67,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Logistics", "Supply Chain Optimization", "Sustainable Logistics Practices"],
      skillsEvolution: ["Logistics Management AI Tools", "Supply Chain Software", "Sustainability in Logistics"],
      industryDemand: 6.7,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    209: {
      title: "Warehouse Manager",
      futureScore: 66,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Warehouse Management", "Automated Inventory Systems", "Sustainable Warehouse Practices"],
      skillsEvolution: ["Warehouse Management AI Tools", "Automation Software", "Sustainability in Warehousing"],
      industryDemand: 6.6,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    210: {
      title: "Supply Chain Manager",
      futureScore: 65,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Supply Chain Management", "Blockchain for Supply Chain", "Sustainable Supply Chain Solutions"],
      skillsEvolution: ["Supply Chain Management AI Tools", "Blockchain Technology", "Sustainability in Supply Chain"],
      industryDemand: 6.5,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    211: {
      title: "Procurement Specialist",
      futureScore: 64,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Procurement", "E-Procurement Solutions", "Sustainable Procurement Practices"],
      skillsEvolution: ["Procurement AI Tools", "E-Procurement Software", "Sustainability in Procurement"],
      industryDemand: 6.4,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    212: {
      title: "Purchasing Agent",
      futureScore: 63,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Purchasing", "Automated Sourcing", "Sustainable Purchasing Solutions"],
      skillsEvolution: ["Purchasing AI Tools", "Automation Software", "Sustainability in Purchasing"],
      industryDemand: 6.3,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    213: {
      title: "Inventory Manager",
      futureScore: 62,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Inventory Management", "Smart Inventory Systems", "Sustainable Inventory Practices"],
      skillsEvolution: ["Inventory Management AI Tools", "Smart Systems", "Sustainability in Inventory Management"],
      industryDemand: 6.2,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    214: {
      title: "Quality Control Inspector",
      futureScore: 61,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Quality Control", "Automated Inspection Systems", "Sustainable Quality Practices"],
      skillsEvolution: ["Quality Control AI Tools", "Automation Software", "Sustainability in Quality Control"],
      industryDemand: 6.1,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    215: {
      title: "Health and Safety Manager",
      futureScore: 60,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Health and Safety Management", "Predictive Safety Analytics", "Sustainable Safety Practices"],
      skillsEvolution: ["Health and Safety Management AI Tools", "Predictive Analytics", "Sustainability in Health and Safety"],
      industryDemand: 6.0,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    216: {
      title: "Environmental Consultant",
      futureScore: 59,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Environmental Consulting", "Sustainability Reporting", "Green Building Certification"],
      skillsEvolution: ["Environmental Consulting AI Tools", "Sustainability Software", "Green Building Standards"],
      industryDemand: 5.9,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    217: {
      title: "Sustainability Consultant",
      futureScore: 58,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Sustainability Consulting", "Corporate Sustainability Strategies", "Sustainable Business Certification"],
      skillsEvolution: ["Sustainability Consulting AI Tools", "Corporate Sustainability Standards", "Sustainable Business Practices"],
      industryDemand: 5.8,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    218: {
      title: "Renewable Energy Consultant",
      futureScore: 57,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Renewable Energy Consulting", "Sustainable Energy Solutions", "Green Energy Certification"],
      skillsEvolution: ["Renewable Energy Consulting AI Tools", "Sustainable Energy Standards", "Green Energy Practices"],
      industryDemand: 5.7,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    219: {
      title: "Climate Change Analyst",
      futureScore: 56,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Climate Change Mitigation", "Sustainable Development Goals (SDGs)", "Carbon Footprint Analysis"],
      skillsEvolution: ["Climate Change AI Tools", "SDG Reporting", "Carbon Footprint Reduction Strategies"],
      industryDemand: 5.6,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    220: {
      title: "Urban Farmer",
      futureScore: 55,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Urban Farming", "Vertical Farming Technology", "Sustainable Agriculture Practices"],
      skillsEvolution: ["Urban Farming AI Tools", "Vertical Farming Systems", "Sustainability in Agriculture"],
      industryDemand: 5.5,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    221: {
      title: "Wildlife Biologist",
      futureScore: 54,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Wildlife Conservation", "Remote Sensing for Wildlife", "Sustainable Wildlife Management"],
      skillsEvolution: ["Wildlife Biology AI Tools", "Remote Sensing Technology", "Sustainability in Wildlife Conservation"],
      industryDemand: 5.4,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    222: {
      title: "Marine Biologist",
      futureScore: 53,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Marine Conservation", "Ocean Monitoring Technology", "Sustainable Fisheries Management"],
      skillsEvolution: ["Marine Biology AI Tools", "Ocean Monitoring Systems", "Sustainability in Marine Conservation"],
      industryDemand: 5.3,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    223: {
      title: "Environmental Engineer",
      futureScore: 52,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Environmental Engineering", "Pollution Control Technology", "Sustainable Resource Management"],
      skillsEvolution: ["Environmental Engineering AI Tools", "Pollution Control Systems", "Sustainability in Resource Management"],
      industryDemand: 5.2,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    224: {
      title: "Sustainability Engineer",
      futureScore: 51,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Sustainability Engineering", "Green Building Technology", "Sustainable Infrastructure Development"],
      skillsEvolution: ["Sustainability Engineering AI Tools", "Green Building Systems", "Sustainability in Infrastructure"],
      industryDemand: 5.1,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    225: {
      title: "Renewable Energy Technician",
      futureScore: 50,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Renewable Energy Technology", "Solar Panel Installation", "Wind Turbine Maintenance"],
      skillsEvolution: ["Renewable Energy Technology AI Tools", "Solar Installation", "Wind Turbine Technology"],
      industryDemand: 5.0,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    226: {
      title: "Energy Auditor",
      futureScore: 49,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Energy Auditing", "Building Energy Management", "Sustainable Energy Solutions"],
      skillsEvolution: ["Energy Auditing AI Tools", "Building Energy Management Systems", "Sustainability in Energy Use"],
      industryDemand: 4.9,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    227: {
      title: "Carbon Analyst",
      futureScore: 48,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Carbon Management", "Sustainability Reporting", "Greenhouse Gas Accounting"],
      skillsEvolution: ["Carbon Management AI Tools", "Sustainability Reporting Standards", "GHG Accounting Software"],
      industryDemand: 4.8,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    228: {
      title: "Sustainable Design Consultant",
      futureScore: 47,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Sustainable Design", "Green Building Certification", "Energy-Efficient Design"],
      skillsEvolution: ["Sustainable Design AI Tools", "Green Building Standards", "Energy Modeling Software"],
      industryDemand: 4.7,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    229: {
      title: "LEED Consultant",
      futureScore: 46,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in LEED Certification", "Sustainable Building Practices", "Green Building Consulting"],
      skillsEvolution: ["LEED Consulting AI Tools", "Sustainable Building Standards", "Green Consulting Practices"],
      industryDemand: 4.6,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    230: {
      title: "BREEAM Consultant",
      futureScore: 45,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in BREEAM Certification", "Sustainable Building Design", "Green Building Assessment"],
      skillsEvolution: ["BREEAM Consulting AI Tools", "Sustainable Design Standards", "Green Building Assessment Tools"],
      industryDemand: 4.5,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    231: {
      title: "Energy Manager",
      futureScore: 44,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Energy Management", "Smart Energy Solutions", "Sustainable Energy Practices"],
      skillsEvolution: ["Energy Management AI Tools", "Smart Energy Systems", "Sustainability in Energy Management"],
      industryDemand: 4.4,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    232: {
      title: "Sustainability Analyst",
      futureScore: 43,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Sustainability Analysis", "Corporate Sustainability Reporting", "Sustainable Business Practices"],
      skillsEvolution: ["Sustainability Analysis AI Tools", "Corporate Reporting Standards", "Sustainability Consulting"],
      industryDemand: 4.3,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    233: {
      title: "Environmental Health and Safety (EHS) Manager",
      futureScore: 42,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in EHS Management", "Predictive EHS Analytics", "Sustainable EHS Practices"],
      skillsEvolution: ["EHS Management AI Tools", "Predictive Analytics", "Sustainability in EHS"],
      industryDemand: 4.2,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    234: {
      title: "Chief Sustainability Officer",
      futureScore: 41,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Corporate Sustainability", "Sustainable Business Strategies", "ESG Reporting"],
      skillsEvolution: ["Corporate Sustainability AI Tools", "Sustainable Business Models", "ESG Reporting Standards"],
      industryDemand: 4.1,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    235: {
      title: "Chief Compliance Officer",
      futureScore: 40,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Regulatory Compliance", "Automated Compliance Monitoring", "Sustainable Compliance Practices"],
      skillsEvolution: ["Regulatory Compliance AI Tools", "Automated Monitoring Systems", "Sustainability in Compliance"],
      industryDemand: 4.0,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    236: {
      title: "Chief Risk Officer",
      futureScore: 39,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Enterprise Risk Management", "Predictive Risk Analytics", "Sustainable Risk Management"],
      skillsEvolution: ["Enterprise Risk Management AI Tools", "Predictive Analytics", "Sustainability in Risk Management"],
      industryDemand: 3.9,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    237: {
      title: "Chief Data Officer",
      futureScore: 38,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Data Governance", "Data Quality Management", "Sustainable Data Practices"],
      skillsEvolution: ["Data Governance AI Tools", "Data Quality Management Systems", "Sustainability in Data Management"],
      industryDemand: 3.8,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    238: {
      title: "Chief Technology Officer",
      futureScore: 37,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Technology Innovation", "Digital Transformation", "Sustainable Technology Solutions"],
      skillsEvolution: ["Technology Innovation AI Tools", "Digital Transformation Strategies", "Sustainability in Technology"],
      industryDemand: 3.7,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    239: {
      title: "Chief Marketing Officer",
      futureScore: 36,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Marketing Strategy", "Customer Experience Innovation", "Sustainable Marketing Practices"],
      skillsEvolution: ["Marketing Strategy AI Tools", "Customer Experience Management", "Sustainability in Marketing"],
      industryDemand: 3.6,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    240: {
      title: "Chief Sales Officer",
      futureScore: 35,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Sales Strategy", "Customer Relationship Management", "Sustainable Sales Practices"],
      skillsEvolution: ["Sales Strategy AI Tools", "CRM Systems", "Sustainability in Sales"],
      industryDemand: 3.5,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    241: {
      title: "Chief Financial Officer",
      futureScore: 34,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Financial Strategy", "Predictive Financial Analytics", "Sustainable Finance Practices"],
      skillsEvolution: ["Financial Strategy AI Tools", "Predictive Analytics", "Sustainability in Finance"],
      industryDemand: 3.4,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    242: {
      title: "Chief Operations Officer",
      futureScore: 33,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Operations Strategy", "Process Optimization", "Sustainable Operations Practices"],
      skillsEvolution: ["Operations Strategy AI Tools", "Process Optimization Techniques", "Sustainability in Operations"],
      industryDemand: 3.3,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    243: {
      title: "Chief Human Resources Officer",
      futureScore: 32,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in HR Strategy", "Talent Management", "Sustainable HR Practices"],
      skillsEvolution: ["HR Strategy AI Tools", "Talent Management Systems", "Sustainability in HR"],
      industryDemand: 3.2,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    244: {
      title: "Chief Compliance and Ethics Officer",
      futureScore: 31,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Compliance and Ethics", "Regulatory Technology", "Sustainable Compliance Practices"],
      skillsEvolution: ["Compliance and Ethics AI Tools", "Regulatory Technology", "Sustainability in Compliance"],
      industryDemand: 3.1,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    245: {
      title: "Chief Risk and Assurance Officer",
      futureScore: 30,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Risk and Assurance", "Predictive Risk Management", "Sustainable Risk Practices"],
      skillsEvolution: ["Risk and Assurance AI Tools", "Predictive Analytics", "Sustainability in Risk"],
      industryDemand: 3.0,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    246: {
      title: "Chief Audit Executive",
      futureScore: 29,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Auditing", "Continuous Auditing", "Sustainable Auditing Practices"],
      skillsEvolution: ["Auditing AI Tools", "Continuous Auditing Systems", "Sustainability in Auditing"],
      industryDemand: 2.9,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    247: {
      title: "Chief Internal Controls Officer",
      futureScore: 28,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Internal Controls", "Automated Controls", "Sustainable Internal Controls Practices"],
      skillsEvolution: ["Internal Controls AI Tools", "Automated Control Systems", "Sustainability in Internal Controls"],
      industryDemand: 2.8,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    248: {
      title: "Chief Financial Crime Officer",
      futureScore: 27,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Financial Crime Prevention", "Fraud Detection", "Sustainable Financial Crime Practices"],
      skillsEvolution: ["Financial Crime Prevention AI Tools", "Fraud Detection Software", "Sustainability in Financial Crime Prevention"],
      industryDemand: 2.7,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    249: {
      title: "Chief Anti-Money Laundering Officer",
      futureScore: 26,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in AML", "Transaction Monitoring", "Sustainable AML Practices"],
      skillsEvolution: ["AML AI Tools", "Transaction Monitoring Systems", "Sustainability in AML"],
      industryDemand: 2.6,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    250: {
      title: "Chief Counter-Terrorism Financing Officer",
      futureScore: 25,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in CTF", "Risk Assessment", "Sustainable CTF Practices"],
      skillsEvolution: ["CTF AI Tools", "Risk Assessment Software", "Sustainability in CTF"],
      industryDemand: 2.5,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    251: {
      title: "Chief Data Governance Officer",
      futureScore: 24,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Data Governance", "Data Stewardship", "Sustainable Data Governance Practices"],
      skillsEvolution: ["Data Governance AI Tools", "Data Stewardship Practices", "Sustainability in Data Governance"],
      industryDemand: 2.4,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    252: {
      title: "Chief Metadata Officer",
      futureScore: 23,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Metadata Management", "Metadata Strategy", "Sustainable Metadata Practices"],
      skillsEvolution: ["Metadata Management AI Tools", "Metadata Strategy Development", "Sustainability in Metadata Management"],
      industryDemand: 2.3,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    253: {
      title: "Chief Master Data Officer",
      futureScore: 22,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Master Data Management", "Data Quality", "Sustainable Master Data Practices"],
      skillsEvolution: ["Master Data Management AI Tools", "Data Quality Management", "Sustainability in Master Data Management"],
      industryDemand: 2.2,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    254: {
      title: "Chief Reference Data Officer",
      futureScore: 21,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Reference Data Management", "Data Consistency", "Sustainable Reference Data Practices"],
      skillsEvolution: ["Reference Data Management AI Tools", "Data Consistency Techniques", "Sustainability in Reference Data Management"],
      industryDemand: 2.1,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    255: {
      title: "Chief Data Quality Officer",
      futureScore: 20,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Data Quality Management", "Data Cleansing", "Sustainable Data Quality Practices"],
      skillsEvolution: ["Data Quality Management AI Tools", "Data Cleansing Techniques", "Sustainability in Data Quality Management"],
      industryDemand: 2.0,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    256: {
      title: "Chief Data Architecture Officer",
      futureScore: 19,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Data Architecture", "Data Modeling", "Sustainable Data Architecture Practices"],
      skillsEvolution: ["Data Architecture AI Tools", "Data Modeling Techniques", "Sustainability in Data Architecture"],
      industryDemand: 1.9,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    257: {
      title: "Chief Data Integration Officer",
      futureScore: 18,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Data Integration", "Data Interoperability", "Sustainable Data Integration Practices"],
      skillsEvolution: ["Data Integration AI Tools", "Data Interoperability Standards", "Sustainability in Data Integration"],
      industryDemand: 1.8,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    258: {
      title: "Chief Data Migration Officer",
      futureScore: 17,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Data Migration", "Data Transfer", "Sustainable Data Migration Practices"],
      skillsEvolution: ["Data Migration AI Tools", "Data Transfer Techniques", "Sustainability in Data Migration"],
      industryDemand: 1.7,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    259: {
      title: "Chief Data Warehousing Officer",
      futureScore: 16,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Data Warehousing", "Data Lakes", "Sustainable Data Warehousing Practices"],
      skillsEvolution: ["Data Warehousing AI Tools", "Data Lakes Management", "Sustainability in Data Warehousing"],
      industryDemand: 1.6,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    260: {
      title: "Quantum Machine Learning Engineer",
      futureScore: 94,
      automationRisk: "Low",
      growthTrend: "Very High",
      emergingAreas: ["Quantum AI", "Quantum Algorithms", "Quantum Error Correction"],
      skillsEvolution: ["Quantum Computing", "ML Engineering", "Quantum Programming"],
      industryDemand: 9.4,
      marketSaturation: "Low", 
      sustainabilityImpact: "High"
    },
    261: {
      title: "Geophysicist",
      futureScore: 82,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Geophysical Analysis", "Remote Sensing", "Climate Modeling"],
      skillsEvolution: ["Geophysical AI Tools", "Data Analysis", "Advanced Modeling Software"],
      industryDemand: 8.2,
      marketSaturation: "Low",
      sustainabilityImpact: "High"
    },
    262: {
      title: "Horticulturist",
      futureScore: 81,
      automationRisk: "Low", 
      growthTrend: "High",
      emergingAreas: ["Smart Agriculture", "Sustainable Farming", "Urban Horticulture"],
      skillsEvolution: ["Plant Science", "Agricultural Technology", "Sustainability Practices"],
      industryDemand: 8.1,
      marketSaturation: "Medium",
      sustainabilityImpact: "High"
    },
    263: {
      title: "Hydrotherapist",
      futureScore: 83,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Hydrotherapy", "Smart Water Treatment", "Therapeutic Innovation"],
      skillsEvolution: ["Advanced Hydrotherapy Techniques", "Digital Health Integration", "Patient Care Technology"],
      industryDemand: 8.3,
      marketSaturation: "Low",
      sustainabilityImpact: "Medium"
    },
    264: {
      title: "Makeup Artist",
      futureScore: 85,
      automationRisk: "Low",
      growthTrend: "High",
      emergingAreas: ["AI in Beauty", "Augmented Reality Makeup", "Sustainable Cosmetics"],
      skillsEvolution: ["Digital Makeup Tools", "AR/VR Technologies", "Eco-friendly Products"],
      industryDemand: 8.5,
      marketSaturation: "Medium",
      sustainabilityImpact: "Medium"
    }
  };

  // Get all careers in an array
  const careers = Object.values(careerImpactsOriginal).sort((a, b) => 
    a.title.localeCompare(b.title)
  );

  // Reassign IDs in alphabetical order
  const careerImpacts = {};
  careers.forEach((career, index) => {
    careerImpacts[index + 1] = career;
  });

  const handleCareerChange = (event) => {
    const careerId = event.target.value;
    setSelectedCareer(careerId);
    setAnalysis(null);

    if (careerId) {
      setLoading(true);
      setTimeout(() => {
        setAnalysis(careerImpacts[careerId]);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Career Impact Analysis
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Select a Career
            </Typography>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="career-select-label">Career</InputLabel>
              <Select
                labelId="career-select-label"
                value={selectedCareer}
                onChange={handleCareerChange}
                label="Career"
              >
                {Object.keys(careerImpacts).map((key) => (
                  <MenuItem key={key} value={key}>
                    {careerImpacts[key].title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {loading && <LinearProgress />}
            {analysis && (
              <Box mt={4}>
                <Divider />
                <Typography variant="h6" gutterBottom>
                  Analysis for {analysis.title}
                </Typography>
                <Chip label={`Future Score: ${analysis.futureScore}`} color="primary" />
                <Chip label={`Automation Risk: ${analysis.automationRisk}`} color="secondary" />
                <Chip label={`Growth Trend: ${analysis.growthTrend}`} color="success" />
                <Typography variant="body1" paragraph>
                  Emerging Areas: {analysis.emergingAreas.join(", ")}
                </Typography>
                <Typography variant="body1" paragraph>
                  Skills Evolution: {analysis.skillsEvolution.join(", ")}
                </Typography>
                <Typography variant="body1" paragraph>
                  Industry Demand: {analysis.industryDemand}
                </Typography>
                <Typography variant="body1" paragraph>
                  Market Saturation: {analysis.marketSaturation}
                </Typography>
                <Typography variant="body1" paragraph>
                  Sustainability Impact: {analysis.sustainabilityImpact}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default CareerImpact;
