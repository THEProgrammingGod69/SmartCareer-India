import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, MenuItem } from '@mui/material';
import { professionals } from './professionalsData';

const AskProfessional = () => {
  const [selected, setSelected] = useState(0);
  const [questionIdx, setQuestionIdx] = useState('');
  const [answer, setAnswer] = useState('');

  const qaList = professionals[selected].qa;

  const handleAsk = (e) => {
    e.preventDefault();
    if (questionIdx === '') return;
    setAnswer(qaList[questionIdx].a);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 700, mx: 'auto', mt: 6 }}>
      <Typography variant="h5" gutterBottom>
        Ask a Professional
      </Typography>
      <TextField
        select
        label="Choose a Professional"
        fullWidth
        margin="normal"
        value={selected}
        onChange={e => {
          setSelected(Number(e.target.value));
          setAnswer('');
          setQuestionIdx('');
        }}
      >
        {professionals.map((pro, idx) => (
          <MenuItem key={pro.name} value={idx}>
            {pro.avatar} {pro.name} — {pro.career}
          </MenuItem>
        ))}
      </TextField>
      <Box sx={{ mb: 2, mt: 2 }}>
        <Typography variant="subtitle1"><b>{professionals[selected].name}</b> ({professionals[selected].career})</Typography>
        <Typography variant="body2" color="text.secondary">{professionals[selected].bio}</Typography>
      </Box>
      <form onSubmit={handleAsk}>
        <TextField
          select
          label="Select a Question"
          fullWidth
          margin="normal"
          value={questionIdx}
          onChange={e => setQuestionIdx(e.target.value)}
        >
          {qaList.map((qa, idx) => (
            <MenuItem key={idx} value={idx}>
              {qa.q}
            </MenuItem>
          ))}
        </TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 1 }}
          disabled={questionIdx === ''}
        >
          Show Answer
        </Button>
      </form>
      {answer && (
        <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="subtitle2" color="primary">Answer:</Typography>
          <Typography>{answer}</Typography>
        </Box>
      )}
      <Box sx={{ mt: 4 }}>
        <Typography variant="caption" color="text.secondary">
          Note: Questions and answers are unique to each professional.
        </Typography>
      </Box>
    </Paper>
  );
};

export default AskProfessional;