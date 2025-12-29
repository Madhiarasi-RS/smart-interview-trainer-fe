'use client';

import { JSX } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

/**
 * ScoreBreakdown Props
 */
interface ScoreBreakdownProps {
  communicationScore: number; // 0-10
  domainFitScore: number; // 0-10
  confidenceScore: number; // 0-10
  relevanceScore: number; // 0-10
}

/**
 * Individual score category
 */
interface ScoreCategory {
  label: string;
  score: number;
  maxScore: number;
}

/**
 * Get progress bar color based on score percentage
 */
const getScoreColor = (score: number, maxScore: number): string => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return '#22c55e'; // green
  if (percentage >= 60) return '#3b82f6'; // blue
  if (percentage >= 40) return '#eab308'; // yellow
  return '#ef4444'; // red
};

/**
 * ScoreBar Component
 * Individual score display with progress bar
 */
function ScoreBar({ label, score, maxScore }: ScoreCategory): JSX.Element {
  const percentage = (score / maxScore) * 100;
  const color = getScoreColor(score, maxScore);

  return (
    <Box className="mb-6">
      <Box className="flex justify-between items-center mb-2">
        <Typography variant="body1" className="font-semibold text-gray-700">
          {label}
        </Typography>
        <Typography variant="body1" className="font-bold text-gray-900">
          {score}/{maxScore}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        className="h-3 rounded-full bg-gray-200"
        sx={{
          '& .MuiLinearProgress-bar': {
            backgroundColor: color,
            transition: 'width 300ms ease-in-out',
          },
        }}
      />
    </Box>
  );
}

/**
 * ScoreBreakdown Component
 * Displays interview performance scores with visual progress bars
 */
export default function ScoreBreakdown({
  communicationScore,
  domainFitScore,
  confidenceScore,
  relevanceScore,
}: ScoreBreakdownProps): JSX.Element {
  const scoreCategories: ScoreCategory[] = [
    {
      label: 'Communication',
      score: communicationScore,
      maxScore: 10,
    },
    {
      label: 'Domain Fit',
      score: domainFitScore,
      maxScore: 10,
    },
    {
      label: 'Confidence',
      score: confidenceScore,
      maxScore: 10,
    },
    {
      label: 'Answer Relevance',
      score: relevanceScore,
      maxScore: 10,
    },
  ];

  return (
    <Box>
      <Typography variant="h6" className="font-bold text-gray-800 mb-4">
        Score Breakdown
      </Typography>
      {scoreCategories.map((category) => (
        <ScoreBar
          key={category.label}
          label={category.label}
          score={category.score}
          maxScore={category.maxScore}
        />
      ))}
    </Box>
  );
}
