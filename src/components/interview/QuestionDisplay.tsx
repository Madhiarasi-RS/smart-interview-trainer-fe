'use client';

import { JSX } from 'react';
import { Box, Typography, Chip } from '@mui/material';

/**
 * QuestionDisplay Props
 */
interface QuestionDisplayProps {
  questionText: string;
  questionIndex: number;
  totalQuestions: number;
}

/**
 * QuestionDisplay Component
 * Displays the current interview question with context
 */
export default function QuestionDisplay({
  questionText,
  questionIndex,
  totalQuestions,
}: QuestionDisplayProps): JSX.Element {
  return (
    <Box>
      {/* Question Counter */}
      <Box className="flex items-center gap-3 mb-4">
        <Chip
          label={`Question ${questionIndex} of ${totalQuestions}`}
          color="primary"
          variant="outlined"
          size="small"
        />
      </Box>

      {/* Question Text */}
      <Typography
        variant="h6"
        component="div"
        className="text-white leading-relaxed"
      >
        {questionText}
      </Typography>
    </Box>
  );
}
