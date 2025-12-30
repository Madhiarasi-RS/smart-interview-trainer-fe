'use client';

import { JSX } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography, Paper } from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import { InterviewScorecard } from '../../../src/types/interview';
import ScoreBreakdown from '../../../src/components/scorecard/ScoreBreakdown';
import ImprovementPlan from '../../../src/components/scorecard/ImprovementPlan';

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
  domain: 'hr-behavioral',
  completedAt: Date.now(),
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
 * Interview Review Screen Component
 * Displays interview performance scorecard and improvement suggestions
 */
export default function InterviewReviewPage(): JSX.Element {
  const router = useRouter();

  const maxFinalScore = 50;
  const performanceLevel = getPerformanceLevel(MOCK_SCORECARD.finalScore, maxFinalScore);

  // Prepare improvement plan data
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  
  // Categorize scores
  if (MOCK_SCORECARD.communicationScore >= 8) {
    strengths.push('Excellent communication skills');
  } else if (MOCK_SCORECARD.communicationScore < 6) {
    weaknesses.push('Communication could be improved');
  }

  if (MOCK_SCORECARD.confidenceScore >= 8) {
    strengths.push('High confidence level throughout');
  } else if (MOCK_SCORECARD.confidenceScore < 6) {
    weaknesses.push('Confidence needs improvement');
  }

  if (MOCK_SCORECARD.domainFitScore >= 8) {
    strengths.push('Strong domain knowledge');
  } else if (MOCK_SCORECARD.domainFitScore < 6) {
    weaknesses.push('Domain knowledge needs enhancement');
  }

  if (MOCK_SCORECARD.relevanceScore >= 8) {
    strengths.push('Highly relevant and focused answers');
  } else if (MOCK_SCORECARD.relevanceScore < 6) {
    weaknesses.push('Answer relevance could be improved');
  }

  // Add filler word feedback
  if (MOCK_SCORECARD.fillerWordCount < 5) {
    strengths.push('Minimal use of filler words');
  } else if (MOCK_SCORECARD.fillerWordCount > 15) {
    weaknesses.push(`Too many filler words used (${MOCK_SCORECARD.fillerWordCount})`);
  }

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
          <ScoreBreakdown
            communicationScore={MOCK_SCORECARD.communicationScore}
            domainFitScore={MOCK_SCORECARD.domainFitScore}
            confidenceScore={MOCK_SCORECARD.confidenceScore}
            relevanceScore={MOCK_SCORECARD.relevanceScore}
          />

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
        <ImprovementPlan
          strengths={strengths}
          weaknesses={weaknesses}
          recommendations={MOCK_SCORECARD.improvementSuggestions}
        />

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
