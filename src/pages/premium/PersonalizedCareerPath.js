import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
  List,
  ListItem,
  Autocomplete,
  Chip,
  Divider,
  Avatar,
  Stack
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Expanded and improved career goals with detailed, actionable steps
// ...existing imports...

const careerGoals = {
  "Data Scientist": [
    { skill: "Python", step: "Start with Python basics using freeCodeCamp or Coursera. Build small scripts and automate simple tasks to get comfortable." },
    { skill: "Statistics", step: "Master statistics fundamentals (mean, median, standard deviation, probability, distributions) using Khan Academy. Apply concepts to real datasets." },
    { skill: "SQL", step: "Learn SQL syntax and practice queries on LeetCode or W3Schools. Build a mini project to extract insights from a sample database." },
    { skill: "Data Visualization", step: "Use Matplotlib or Seaborn to create charts. Analyze public datasets and present findings visually." },
    { skill: "Machine Learning", step: "Take Andrew Ng's Machine Learning course on Coursera. Implement regression, classification, and clustering models using scikit-learn." },
    { skill: "Data Cleaning", step: "Practice cleaning messy datasets with Pandas. Handle missing values, outliers, and data types." },
    { skill: "Big Data Tools", step: "Get familiar with Hadoop or Spark basics. Try running simple data processing jobs." },
    { skill: "Portfolio Projects", step: "Build and publish 2-3 end-to-end data science projects on GitHub, including data collection, cleaning, analysis, modeling, and visualization." },
    { skill: "Communication", step: "Develop the ability to explain complex data insights to non-technical stakeholders through presentations and storytelling." },
    { skill: "Cloud Platforms", step: "Learn basics of AWS, GCP, or Azure for deploying data science models and handling cloud-based datasets." }
  ],
  "Web Developer": [
    { skill: "HTML", step: "Learn HTML5 structure and semantics on MDN. Build a personal homepage as your first project." },
    { skill: "CSS", step: "Master CSS for layouts, colors, and responsive design. Use Flexbox and Grid to create modern layouts." },
    { skill: "JavaScript", step: "Understand ES6+ features, DOM manipulation, and event handling. Build interactive features for your homepage." },
    { skill: "Version Control", step: "Learn Git basics. Push your code to GitHub and collaborate on open-source projects." },
    { skill: "React", step: "Follow the official React docs and build a to-do app. Learn about components, props, state, and hooks." },
    { skill: "Node.js", step: "Create a simple REST API with Express. Connect your backend to a MongoDB or SQL database." },
    { skill: "Testing", step: "Write unit and integration tests using Jest or Mocha. Ensure your code is reliable and maintainable." },
    { skill: "Deployment", step: "Deploy your full-stack app to platforms like Vercel, Netlify, or Heroku. Learn about CI/CD basics." },
    { skill: "Accessibility", step: "Learn web accessibility standards (WCAG) and make your sites usable for everyone." },
    { skill: "TypeScript", step: "Get comfortable with TypeScript for scalable and type-safe JavaScript development." }
  ],
  "Financial Analyst": [
    { skill: "Financial Modeling", step: "Take a financial modeling course (CFI, Wall Street Prep). Build models for real or sample companies in Excel." },
    { skill: "Excel", step: "Master advanced Excel functions (VLOOKUP, PivotTables, macros). Automate repetitive tasks and create dashboards." },
    { skill: "Accounting", step: "Understand financial statements and accounting principles. Analyze balance sheets, income statements, and cash flows." },
    { skill: "Investment Analysis", step: "Study investment principles, portfolio management, and risk analysis. Read 'The Intelligent Investor' and follow financial news." },
    { skill: "Data Analysis", step: "Analyze financial data using Excel or Power BI. Visualize trends and create reports." },
    { skill: "Business Communication", step: "Practice writing clear financial reports and presenting findings to non-finance audiences." },
    { skill: "Certifications", step: "Pursue CFA Level 1 or other relevant certifications to boost your profile." },
    { skill: "Internships", step: "Gain practical experience through internships in banks, investment firms, or corporate finance teams." },
    { skill: "PowerPoint", step: "Learn to create compelling presentations and pitch decks for financial data." }
  ],
  "Cybersecurity Analyst": [
    { skill: "Network Security", step: "Study network protocols, firewalls, and intrusion detection systems. Set up a secure home network as practice." },
    { skill: "Linux", step: "Learn Linux fundamentals. Use the command line for file management and scripting." },
    { skill: "Threat Detection", step: "Practice identifying and responding to threats using tools like Wireshark and Splunk." },
    { skill: "Ethical Hacking", step: "Take the CEH (Certified Ethical Hacker) course. Practice penetration testing in a virtual lab." },
    { skill: "Cryptography", step: "Understand cryptography principles and implement basic encryption algorithms in Python." },
    { skill: "Incident Response", step: "Simulate cyber attacks and practice incident response procedures." },
    { skill: "Certifications", step: "Earn CompTIA Security+ or CISSP to validate your skills." },
    { skill: "Continuous Learning", step: "Stay updated with the latest threats by following cybersecurity news, blogs, and advisories." },
    { skill: "Cloud Security", step: "Learn about securing cloud environments (AWS, Azure, GCP) and managing cloud-based threats." }
  ],
  "Product Manager": [
    { skill: "Product Strategy", step: "Learn to define product vision and strategy. Study successful product case studies and write your own product briefs." },
    { skill: "User Research", step: "Conduct user interviews and surveys. Analyze feedback to identify user needs and pain points." },
    { skill: "Roadmapping", step: "Use tools like Trello or Jira to create product roadmaps. Prioritize features based on impact and feasibility." },
    { skill: "Agile Methodologies", step: "Understand Scrum and Kanban. Participate in Agile workshops or simulations." },
    { skill: "Market Analysis", step: "Analyze competitors and market trends. Create SWOT analyses for products." },
    { skill: "Cross-functional Leadership", step: "Lead small projects, coordinate with engineering, design, and marketing teams." },
    { skill: "Data Analysis", step: "Use Google Analytics or Mixpanel to track product metrics and make data-driven decisions." },
    { skill: "Portfolio", step: "Document your product management experiences and case studies in a portfolio." },
    { skill: "Presentation Skills", step: "Develop strong presentation and storytelling skills to pitch your product ideas." }
  ],
  // ...keep the rest of the careers as before, or add more skills to each as above...
  // Example for Teacher:
  "Teacher": [
    { skill: "Subject Knowledge", step: "Deepen your subject knowledge through advanced courses and certifications." },
    { skill: "Communication", step: "Develop clear communication by teaching peers or tutoring." },
    { skill: "Classroom Management", step: "Learn classroom management strategies from experienced teachers and online workshops." },
    { skill: "Empathy", step: "Practice empathy by understanding student perspectives and needs." },
    { skill: "Lesson Planning", step: "Create detailed lesson plans and learning objectives for your subject." },
    { skill: "Assessment", step: "Design quizzes, assignments, and feedback mechanisms to evaluate student progress." },
    { skill: "Technology Integration", step: "Use digital tools (Google Classroom, Kahoot) to enhance learning." },
    { skill: "Professional Development", step: "Attend teacher training programs and join educator communities." },
    { skill: "Inclusive Education", step: "Learn strategies for teaching students with diverse backgrounds and abilities." }
  ],
  "UI/UX Designer": [
    { skill: "Design Thinking", step: "Learn design thinking principles and apply them to real-world problems." },
    { skill: "Figma", step: "Master Figma by designing mobile and web app prototypes. Share your designs for feedback." },
    { skill: "User Research", step: "Conduct usability tests and interviews to understand user needs." },
    { skill: "Wireframing", step: "Create wireframes and user flows for various scenarios." },
    { skill: "Prototyping", step: "Build interactive prototypes and test them with users." },
    { skill: "Visual Design", step: "Study color theory, typography, and layout. Apply these to your projects." },
    { skill: "Portfolio", step: "Document your design process and showcase projects on Behance or your own website." },
    { skill: "Feedback & Iteration", step: "Seek feedback from peers and iterate on your designs." }
  ],
  "Business Analyst": [
    { skill: "Excel", step: "Master Excel for data analysis, pivot tables, and dashboards." },
    { skill: "SQL", step: "Practice SQL for business data queries. Build dashboards using SQL data." },
    { skill: "Data Analysis", step: "Analyze business datasets and present insights using charts and reports." },
    { skill: "Business Communication", step: "Write clear business reports and deliver presentations." },
    { skill: "Requirement Gathering", step: "Learn to conduct stakeholder interviews and document requirements." },
    { skill: "Process Mapping", step: "Create process maps and flowcharts using tools like Lucidchart." },
    { skill: "Problem Solving", step: "Work on case studies and propose solutions to business problems." },
    { skill: "Certifications", step: "Consider CBAP or PMI-PBA certifications for career growth." }
  ],
  "Marketing Manager": [
    { skill: "Digital Marketing", step: "Take Google Digital Garage courses. Run a small ad campaign as practice." },
    { skill: "SEO", step: "Learn SEO fundamentals. Optimize a blog or website for search engines." },
    { skill: "Content Creation", step: "Create content for social media or blogs. Analyze engagement metrics." },
    { skill: "Analytics", step: "Use Google Analytics to track and interpret marketing data." },
    { skill: "Brand Management", step: "Study successful brand campaigns and develop your own brand strategy." },
    { skill: "Campaign Planning", step: "Plan and execute a marketing campaign from start to finish." },
    { skill: "Market Research", step: "Conduct surveys and analyze market trends." },
    { skill: "Team Leadership", step: "Lead a small marketing team or project to develop leadership skills." }
  ],
  "Chef": [
    { skill: "Cooking", step: "Practice cooking various cuisines and document your recipes." },
    { skill: "Creativity", step: "Experiment with new recipes and plating techniques." },
    { skill: "Time Management", step: "Improve kitchen time management by timing your dishes." },
    { skill: "Food Safety", step: "Learn food safety and hygiene through online certifications." },
    { skill: "Knife Skills", step: "Master knife techniques for speed and safety." },
    { skill: "Menu Planning", step: "Design balanced menus for different occasions." },
    { skill: "Internships", step: "Work in restaurant kitchens to gain real-world experience." },
    { skill: "Presentation", step: "Focus on food presentation and plating for visual appeal." }
  ],
  "Lawyer": [
    { skill: "Legal Knowledge", step: "Study law fundamentals and read landmark cases." },
    { skill: "Research", step: "Practice legal research using online databases." },
    { skill: "Argumentation", step: "Develop argumentation skills through debates and moot courts." },
    { skill: "Communication", step: "Enhance legal communication by drafting legal documents and presenting cases." },
    { skill: "Internships", step: "Intern with law firms or courts to gain practical exposure." },
    { skill: "Ethics", step: "Understand legal ethics and professional responsibility." },
    { skill: "Specialization", step: "Choose a specialization (corporate, criminal, civil, etc.) and pursue advanced courses." },
    { skill: "Networking", step: "Join bar associations and attend legal seminars for networking." }
  ],
  "Architect": [
    { skill: "Design", step: "Learn architectural design principles and sketch buildings." },
    { skill: "AutoCAD", step: "Master AutoCAD for architecture by designing floor plans." },
    { skill: "Mathematics", step: "Strengthen math for design, especially geometry." },
    { skill: "Creativity", step: "Work on creative architectural projects and competitions." },
    { skill: "Building Codes", step: "Study local building codes and regulations." },
    { skill: "Model Making", step: "Build physical or digital models of your designs." },
    { skill: "Internships", step: "Intern at architecture firms to gain practical experience." },
    { skill: "Portfolio", step: "Compile your best work into a professional portfolio." }
  ],
  // Add more careers as needed, following the same detailed structure
};

const goalOptions = Object.keys(careerGoals);

const allSkills = Array.from(
  new Set(
    Object.values(careerGoals)
      .flat()
      .map(({ skill }) => skill)
  )
);

const PersonalizedCareerPath = () => {
  const [skills, setSkills] = useState([]);
  const [goal, setGoal] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goal || !careerGoals[goal]) {
      setResult({ error: 'Please select a valid career goal.' });
      return;
    }
    const userSkills = new Set(skills);
    const requiredSteps = careerGoals[goal];
    const missingSteps = requiredSteps.filter(({ skill }) => !userSkills.has(skill));
    setResult({
      goal,
      currentSkills: [...userSkills],
      careerPath: missingSteps.map((stepObj, idx) => ({
        stepNumber: idx + 1,
        ...stepObj
      }))
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #fff 100%)',
        py: 6
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 2, sm: 4 },
          maxWidth: 650,
          mx: 'auto',
          borderRadius: 4,
          background: 'rgba(255,255,255,0.95)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Avatar sx={{ bgcolor: "#6366f1" }}>
            <SchoolIcon />
          </Avatar>
          <Typography variant="h4" fontWeight={700} color="#3730a3">
            Personalized Career Path
          </Typography>
        </Stack>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          Select your current skills and your dream career to get a step-by-step roadmap!
        </Typography>
        <form onSubmit={handleSubmit}>
          <Autocomplete
            multiple
            options={allSkills}
            value={skills}
            onChange={(event, newValue) => setSkills(newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  color="primary"
                  label={option}
                  {...getTagProps({ index })}
                  key={option}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Your Skills"
                margin="normal"
                fullWidth
                variant="outlined"
                placeholder="Type to search skills"
              />
            )}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Career Goal"
            fullWidth
            margin="normal"
            value={goal}
            onChange={e => setGoal(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          >
            {goalOptions.map(g => (
              <MenuItem key={g} value={g}>
                <WorkIcon sx={{ mr: 1, color: "#6366f1" }} fontSize="small" />
                {g}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              mt: 2,
              width: '100%',
              background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
              fontWeight: 600,
              letterSpacing: 1
            }}
          >
            Show My Path
          </Button>
        </form>
        {result && (
          result.error ? (
            <Typography color="error" sx={{ mt: 3, fontWeight: 600 }}>{result.error}</Typography>
          ) : (
            <Box sx={{ mt: 5 }}>
              <Divider sx={{ mb: 3 }} />
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <EmojiEventsIcon color="primary" />
                <Typography variant="h6" fontWeight={700}>
                  Personalized Career Path to {result.goal}
                </Typography>
              </Stack>
              <Typography sx={{ mb: 1 }}>
                <b>Current Skills:</b>{' '}
                {result.currentSkills.length > 0
                  ? result.currentSkills.map(skill => (
                      <Chip
                        key={skill}
                        label={skill}
                        color="success"
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))
                  : <Chip label="None" color="warning" size="small" />}
              </Typography>
              <Typography sx={{ mt: 2, mb: 1 }} color="text.secondary">
                <b>Your Next Steps:</b>
              </Typography>
              <List>
                {result.careerPath.length === 0 ? (
                  <ListItem>
                    <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                    <Typography color="success.main" fontWeight={600}>
                      Congratulations! You already have all the key skills for this career.
                    </Typography>
                  </ListItem>
                ) : (
                  result.careerPath.map(({ stepNumber, skill, step }) => (
                    <ListItem
                      key={skill}
                      sx={{
                        mb: 2,
                        alignItems: 'flex-start',
                        background: '#f1f5fd',
                        borderRadius: 2,
                        boxShadow: '0 2px 8px 0 rgba(99,102,241,0.05)'
                      }}
                    >
                      <Avatar sx={{ bgcolor: "#818cf8", mr: 2, mt: 0.5, width: 32, height: 32, fontSize: 18 }}>
                        {stepNumber}
                      </Avatar>
                      <Box>
                        <Typography fontWeight={600} color="#3730a3">
                          {skill}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {step}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))
                )}
              </List>
            </Box>
          )
        )}
      </Paper>
    </Box>
  );
};

export default PersonalizedCareerPath;