'use client';

import { JSX } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography, Paper, LinearProgress } from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import { InterviewScorecard } from '../../../types/interview';

/**
 * Mock scorecard data
 * TODO: Replace with actual data from backend API
 */
const MOCK_SCORECARD: InterviewScorecard = {
  sessionId: 'session-123',
  communicationScore: 8,
  domainFitScore: 7,
  confidenceScore: 9,
  relevanceScore: 8,
  fillerWordCount: 12,
  finalScore: 32,
  performanceSummary:
    'Strong performance overall. You demonstrated clear communication and confidence throughout the interview. Your technical knowledge was evident, and you structured your answers well using concrete examples.',
  improvementSuggestions: [
    'Reduce filler words ("um", "uh") to enhance clarity',
    'Provide more domain-specific technical details in your examples',
    'Take brief pauses before answering to organize thoughts',
    'Practice the STAR method for behavioral questions',
  ],
  domain: 'behavioral',
  completedAt: Date.now(),
};

/**
 * Score category definition
 */
interface ScoreCategory {
  label: string;
  score: number;
  maxScore: number;
  color: string;
}

/**
 * Get score color based on percentage
 */
const getScoreColor = (score: number, maxScore: number): string => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return 'bg-green-500';
  if (percentage >= 60) return 'bg-blue-500';
  if (percentage >= 40) return 'bg-yellow-500';
  return 'bg-red-500';
};

/**
 * Get overall performance level
 */
const getPerformanceLevel = (finalScore: number, maxScore: number): string => {
  const percentage = (finalScore / maxScore) * 100;
  if (percentage >= 80) return 'Excellent';
  if (percentage >= 60) return 'Good';
  if (percentage >= 40) return 'Fair';
  return 'Needs Improvement';
};

/**
 * ScoreBar Component
 * Displays individual score with progress bar
 */
function ScoreBar({ label, score, maxScore, color }: ScoreCategory): JSX.Element {
  const percentage = (score / maxScore) * 100;

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
      <Box className="relative">
        <LinearProgress
          variant="determinate"
          value={percentage}
          className="h-3 rounded-full bg-gray-200"
          sx={{
            '& .MuiLinearProgress-bar': {
              backgroundColor:
                percentage >= 80
                  ? '#22c55e'
                  : percentage >= 60
                  ? '#3b82f6'
                  : percentage >= 40
                  ? '#eab308'
                  : '#ef4444',
            },
          }}
        />
      </Box>
    </Box>
  );
}

/**
 * Interview Review Screen Component
 * Displays interview performance scorecard and improvement suggestions
 */
export default function InterviewReviewPage(): JSX.Element {
  const router = useRouter();

  const scoreCategories: ScoreCategory[] = [
    {
      label: 'Communication',
      score: MOCK_SCORECARD.communicationScore,
      maxScore: 10,
      color: getScoreColor(MOCK_SCORECARD.communicationScore, 10),
    },
    {
      label: 'Domain Fit',
      score: MOCK_SCORECARD.domainFitScore,
      maxScore: 10,
      color: getScoreColor(MOCK_SCORECARD.domainFitScore, 10),
    },
    {
      label: 'Confidence',
      score: MOCK_SCORECARD.confidenceScore,
      maxScore: 10,
      color: getScoreColor(MOCK_SCORECARD.confidenceScore, 10),
    },
    {
      label: 'Answer Relevance',
      score: MOCK_SCORECARD.relevanceScore,
      maxScore: 10,
      color: getScoreColor(MOCK_SCORECARD.relevanceScore, 10),
    },
  ];

  const maxFinalScore = 50;
  const performanceLevel = getPerformanceLevel(MOCK_SCORECARD.finalScore, maxFinalScore);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <Paper elevation={3} className="p-8 mb-6 text-center">
          <Box className="flex items-center justify-center mb-4">
            <TrophyIcon className="text-6xl text-yellow-500" />
          </Box>
          <Typography variant="h4" component="h1" className="font-bold text-gray-800 mb-2">
            Interview Review
          </Typography>
          <Typography variant="body1" className="text-gray-600 mb-6">
            Your performance analysis and improvement recommendations
          </Typography>

          {/* Final Score Display */}
          <Box className="bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-6 inline-block">
            <Typography variant="h6" className="uppercase tracking-wide mb-2">
              Final Score
            </Typography>
            <Typography variant="h2" className="font-bold">
              {MOCK_SCORECARD.finalScore}/{maxFinalScore}
            </Typography>
            <Typography variant="body1" className="mt-2 opacity-90">
              {performanceLevel}
            </Typography>
          </Box>
        </Paper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Score Breakdown Section */}
          <Paper elevation={2} className="p-6">
            <Typography variant="h6" className="font-bold text-gray-800 mb-4">
              Score Breakdown
            </Typography>
            {scoreCategories.map((category) => (
              <ScoreBar
                key={category.label}
                label={category.label}
                score={category.score}
                maxScore={category.maxScore}
                color={category.color}
              />
            ))}
          </Paper>

          {/* Key Insights Section */}
          <Paper elevation={2} className="p-6">
            <Typography variant="h6" className="font-bold text-gray-800 mb-4">
              Key Insights
            </Typography>

            {/* Filler Word Count */}
            <Box className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded">
              <Box className="flex items-center gap-2 mb-2">
                <CheckCircleIcon className="text-blue-600" />
                <Typography variant="subtitle1" className="font-semibold text-blue-900">
                  Filler Words
                </Typography>
              </Box>
              <Typography variant="body2" className="text-gray-700">
                You used <strong>{MOCK_SCORECARD.fillerWordCount} filler words</strong> during
                the interview. Try to reduce these for clearer communication.
              </Typography>
            </Box>

            {/* Performance Summary */}
            <Box className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <Box className="flex items-center gap-2 mb-2">
                <TrendingUpIcon className="text-green-600" />
                <Typography variant="subtitle1" className="font-semibold text-green-900">
                  Overall Performance
                </Typography>
              </Box>
              <Typography variant="body2" className="text-gray-700 leading-relaxed">
                {MOCK_SCORECARD.performanceSummary}
              </Typography>
            </Box>
          </Paper>
        </div>

        {/* Improvement Plan Section */}
        <Paper elevation={2} className="p-6 mt-6">
          <Typography variant="h6" className="font-bold text-gray-800 mb-4">
            Improvement Plan
          </Typography>
          <Typography variant="body2" className="text-gray-600 mb-4">
            Based on your performance, here are personalized recommendations to help you improve:
          </Typography>
          <ul className="space-y-3">
            {MOCK_SCORECARD.improvementSuggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-3">
                <Box className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-1">
                  <Typography variant="caption" className="font-bold">
                    {index + 1}
                  </Typography>
                </Box>
                <Typography variant="body2" className="text-gray-700 leading-relaxed">
                  {suggestion}
                </Typography>
              </li>
            ))}
          </ul>

          {/* Domain-Specific Recommendation */}
          <Box className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mt-6">
            <Typography variant="subtitle2" className="font-semibold text-indigo-900 mb-2">
              Recommended Practice
            </Typography>
            <Typography variant="body2" className="text-gray-700">
              Continue practicing with{' '}
              <strong className="text-indigo-700 capitalize">
                {MOCK_SCORECARD.domain.replace('-', ' ')}
              </strong>{' '}
              questions to build consistency and confidence in your responses.
            </Typography>
          </Box>
        </Paper>

        {/* Action Buttons */}
        <Box className="flex gap-4 justify-center mt-8">
          <Button
            variant="outlined"
            size="large"
            onClick={() => router.push('/dashboard')}
            className="normal-case text-base px-8"
          >
            Back to Dashboard
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => router.push('/interview/setup')}
            className="bg-blue-600 hover:bg-blue-700 normal-case text-base px-8"
          >
            Practice Again
          </Button>
        </Box>
      </div>
    </div>
  );
}
