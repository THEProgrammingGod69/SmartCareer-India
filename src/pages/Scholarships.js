import React, { useMemo, useState } from 'react';
import { alpha } from '@mui/material/styles';
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Search as SearchIcon, OpenInNew as OpenInNewIcon } from '@mui/icons-material';
import { brand } from '../contexts/ThemeContext';

// Official Government of India portals and schemes for students and young people.
// Descriptions are kept general on purpose: eligibility, amounts and deadlines
// change every year, so the user is always sent to the official portal.
const schemes = [
  {
    name: 'National Scholarship Portal (NSP)',
    body: 'Government of India',
    description: 'One-stop portal to apply for central, state and UGC/AICTE scholarships, including pre-matric, post-matric and merit-cum-means schemes.',
    levels: ['School', 'Class 11-12', 'Undergraduate', 'Postgraduate'],
    groups: ['All students', 'Low income', 'SC/ST/OBC/Minority', 'Merit'],
    type: 'Scholarship',
    url: 'https://scholarships.gov.in',
  },
  {
    name: 'Central Sector Scholarship for College & University Students',
    body: 'Ministry of Education',
    description: 'Merit-based scholarship for top-scoring Class 12 students from lower-income families pursuing regular degree courses. Apply through NSP.',
    levels: ['Undergraduate', 'Postgraduate'],
    groups: ['Merit', 'Low income'],
    type: 'Scholarship',
    url: 'https://scholarships.gov.in',
  },
  {
    name: 'National Means-cum-Merit Scholarship (NMMSS)',
    body: 'Ministry of Education',
    description: 'Support for meritorious students from economically weaker sections to continue school education from Class 9 to 12, selected through a state-level exam in Class 8.',
    levels: ['School', 'Class 11-12'],
    groups: ['Merit', 'Low income'],
    type: 'Scholarship',
    url: 'https://scholarships.gov.in',
  },
  {
    name: 'AICTE Pragati Scholarship for Girls',
    body: 'AICTE',
    description: 'Scholarship for girl students admitted to AICTE-approved degree and diploma programmes in technical education.',
    levels: ['Diploma', 'Undergraduate'],
    groups: ['Girls', 'Low income'],
    type: 'Scholarship',
    url: 'https://www.aicte-india.org/schemes/students-development-schemes',
  },
  {
    name: 'AICTE Saksham Scholarship',
    body: 'AICTE',
    description: 'Scholarship for specially-abled students pursuing AICTE-approved technical degree and diploma programmes.',
    levels: ['Diploma', 'Undergraduate'],
    groups: ['Persons with disability'],
    type: 'Scholarship',
    url: 'https://www.aicte-india.org/schemes/students-development-schemes',
  },
  {
    name: 'INSPIRE Scholarship (SHE)',
    body: 'Department of Science & Technology',
    description: 'Scholarship for high-achieving students who choose natural and basic sciences at the BSc, BS or integrated MSc level.',
    levels: ['Undergraduate', 'Postgraduate'],
    groups: ['Merit'],
    type: 'Scholarship',
    url: 'https://online-inspire.gov.in',
  },
  {
    name: 'PM Internship Scheme',
    body: 'Ministry of Corporate Affairs',
    description: '12-month internships with leading Indian companies for young people who are not in full-time education or employment, with monthly financial assistance.',
    levels: ['Diploma', 'Undergraduate', 'Graduate / job seeker'],
    groups: ['All students', 'Low income'],
    type: 'Internship',
    url: 'https://pminternship.mca.gov.in',
  },
  {
    name: 'Apprenticeship India (NAPS)',
    body: 'Ministry of Skill Development & Entrepreneurship',
    description: 'Paid, on-the-job apprenticeships with industry for Class 10/12 pass-outs, ITI and diploma holders and graduates.',
    levels: ['Class 11-12', 'Diploma', 'Graduate / job seeker'],
    groups: ['All students'],
    type: 'Skilling',
    url: 'https://www.apprenticeshipindia.gov.in',
  },
  {
    name: 'Skill India Digital (PMKVY)',
    body: 'Ministry of Skill Development & Entrepreneurship',
    description: 'Free short-term skill training and certification under Pradhan Mantri Kaushal Vikas Yojana, plus courses and job links on the Skill India Digital Hub.',
    levels: ['School', 'Class 11-12', 'Diploma', 'Graduate / job seeker'],
    groups: ['All students', 'Low income'],
    type: 'Skilling',
    url: 'https://www.skillindiadigital.gov.in',
  },
  {
    name: 'SWAYAM',
    body: 'Ministry of Education',
    description: 'Free online courses taught by faculty from IITs, IIMs and central universities, with certificates and credit transfer for many courses.',
    levels: ['Class 11-12', 'Undergraduate', 'Postgraduate', 'Graduate / job seeker'],
    groups: ['All students'],
    type: 'Learning',
    url: 'https://swayam.gov.in',
  },
  {
    name: 'National Career Service (NCS)',
    body: 'Ministry of Labour & Employment',
    description: 'Government job portal with job listings, career counselling, job fairs and skill-development resources.',
    levels: ['Graduate / job seeker', 'Diploma', 'Undergraduate'],
    groups: ['All students'],
    type: 'Jobs',
    url: 'https://www.ncs.gov.in',
  },
  {
    name: 'Stand-Up India',
    body: 'Department of Financial Services',
    description: 'Bank loans to help women and SC/ST entrepreneurs set up new businesses, with hand-holding support.',
    levels: ['Graduate / job seeker'],
    groups: ['Girls', 'SC/ST/OBC/Minority'],
    type: 'Entrepreneurship',
    url: 'https://www.standupmitra.in',
  },
  {
    name: 'Startup India',
    body: 'DPIIT',
    description: 'Recognition, learning programmes, mentorship and funding networks for founders building startups in India.',
    levels: ['Undergraduate', 'Postgraduate', 'Graduate / job seeker'],
    groups: ['All students'],
    type: 'Entrepreneurship',
    url: 'https://www.startupindia.gov.in',
  },
];

const levelOptions = ['All levels', 'School', 'Class 11-12', 'Diploma', 'Undergraduate', 'Postgraduate', 'Graduate / job seeker'];
const groupOptions = ['Everyone', 'Girls', 'Persons with disability', 'SC/ST/OBC/Minority', 'Low income', 'Merit'];
const typeOptions = ['All types', 'Scholarship', 'Internship', 'Skilling', 'Learning', 'Jobs', 'Entrepreneurship'];

const Scholarships = () => {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('All levels');
  const [group, setGroup] = useState('Everyone');
  const [type, setType] = useState('All types');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return schemes.filter((s) => {
      if (level !== 'All levels' && !s.levels.includes(level)) return false;
      if (group !== 'Everyone' && !s.groups.includes(group)) return false;
      if (type !== 'All types' && s.type !== type) return false;
      if (q && !`${s.name} ${s.body} ${s.description}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, level, group, type]);

  const reset = () => {
    setQuery('');
    setLevel('All levels');
    setGroup('Everyone');
    setType('All types');
  };

  return (
    <Container maxWidth="lg" disableGutters>
      <Box sx={{ pb: 3.5, mb: 3.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          Seva · Opportunities
        </Typography>
        <Typography variant="h4" sx={{ fontSize: { xs: 28, md: 34 }, mb: 1 }}>
          Scholarships &amp; Government Schemes
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 720 }}>
          Find scholarships, internships, free skilling and career programmes from the Government of India that match your education level and background.
        </Typography>
      </Box>

      {/* Filters */}
      <Card sx={{ p: 2.5, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search schemes, e.g. internship, girls, science"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2.5}>
            <TextField select fullWidth size="small" label="Education level" value={level} onChange={(e) => setLevel(e.target.value)}>
              {levelOptions.map((o) => (
                <MenuItem key={o} value={o}>
                  {o}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4} md={2.5}>
            <TextField select fullWidth size="small" label="Who it's for" value={group} onChange={(e) => setGroup(e.target.value)}>
              {groupOptions.map((o) => (
                <MenuItem key={o} value={o}>
                  {o}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <TextField select fullWidth size="small" label="Type" value={type} onChange={(e) => setType(e.target.value)}>
              {typeOptions.map((o) => (
                <MenuItem key={o} value={o}>
                  {o}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Card>

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography sx={{ fontFamily: brand.monoFont, fontSize: 13, color: 'text.secondary' }}>
          {results.length} of {schemes.length} programmes
        </Typography>
        <Button size="small" onClick={reset}>
          Reset filters
        </Button>
      </Stack>

      <Grid container spacing={2}>
        {results.map((s) => (
          <Grid item key={s.name} xs={12} md={6}>
            <Card sx={{ p: 2.75, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2} sx={{ mb: 1 }}>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="h6" sx={{ fontSize: 17, lineHeight: 1.3 }}>
                    {s.name}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary', mt: 0.25 }}>{s.body}</Typography>
                </Box>
                <Chip size="small" color="primary" label={s.type} sx={{ flexShrink: 0 }} />
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65, mb: 2, flexGrow: 1 }}>
                {s.description}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
                {[...s.levels, ...s.groups.filter((g) => g !== 'All students')].map((tag) => (
                  <Box
                    key={tag}
                    component="span"
                    sx={{
                      fontSize: 12,
                      px: 1,
                      py: 0.25,
                      borderRadius: '6px',
                      border: '1px solid',
                      borderColor: 'divider',
                      bgcolor: (t) => alpha(t.palette.text.primary, 0.03),
                      color: 'text.secondary',
                    }}
                  >
                    {tag}
                  </Box>
                ))}
              </Box>
              <Button
                variant="outlined"
                size="small"
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
                sx={{ alignSelf: 'flex-start' }}
              >
                Visit official portal
              </Button>
            </Card>
          </Grid>
        ))}
        {results.length === 0 && (
          <Grid item xs={12}>
            <Card sx={{ p: 4, textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 600, mb: 1 }}>No programmes match these filters</Typography>
              <Button variant="outlined" onClick={reset}>
                Reset filters
              </Button>
            </Card>
          </Grid>
        )}
      </Grid>

      <Alert severity="info" sx={{ mt: 3 }}>
        Eligibility, amounts and deadlines change every year. Always confirm the latest details on the official portal before applying.
      </Alert>
    </Container>
  );
};

export default Scholarships;
