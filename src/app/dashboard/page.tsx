'use client';

import { JSX } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography, Container, Paper, Chip } from '@mui/material';
import {
  PlayArrow as PlayArrowIcon,
  CalendarToday as CalendarIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { InterviewDomain } from '../../types/interview';

/**
 * Mock past interview data
 * TODO: Replace with actual data from backend API
 */
interface PastInterview {
  id: string;
  date: string;
  domain: InterviewDomain;
  finalScore: number;
  maxScore: number;
}

const MOCK_USER_NAME = 'John Doe';

const MOCK_INTERVIEWS: PastInterview[] = [
  {
    id: 'int-001',
    date: '2024-12-28',
    domain: 'full-stack',
    finalScore: 38,
    maxScore: 50,
  },
  {
    id: 'int-002',
    date: '2024-12-26',
    domain: 'hr-behavioral',
    finalScore: 32,
    maxScore: 50,
  },
  {
    id: 'int-003',
    date: '2024-12-24',
    domain: 'cloud',
    finalScore: 35,
    maxScore: 50,
  },
];

/**
 * Format date for display
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Get domain display label
 */
const getDomainLabel = (domain: InterviewDomain): string => {
  return domain
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Get score color based on performance
 */
const getScoreColor = (score: number, maxScore: number): string => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return 'text-green-600';
  if (percentage >= 60) return 'text-blue-600';
  if (percentage >= 40) return 'text-yellow-600';
  return 'text-red-600';
};

/**
 * InterviewHistoryItem Component
 * Reusable component for displaying past interview
 */
interface InterviewHistoryItemProps {
  interview: PastInterview;
  onClick: () => void;
}

function InterviewHistoryItem({ interview, onClick }: InterviewHistoryItemProps): JSX.Element {
  const scoreColor = getScoreColor(interview.finalScore, interview.maxScore);

  return (
    <Paper
      elevation={1}
      className="p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <Box className="flex items-center justify-between">
        <Box className="flex-1">
          <Box className="flex items-center gap-3 mb-2">
            <CalendarIcon className="text-gray-500 text-sm" />
            <Typography variant="body2" className="text-gray-600">
              {formatDate(interview.date)}
            </Typography>
            <Chip
              label={getDomainLabel(interview.domain)}
              size="small"
              className="capitalize"
              color="primary"
              variant="outlined"
            />
          </Box>
        </Box>
        <Box className="text-right">
          <Typography variant="h6" className={`font-bold ${scoreColor}`}>
            {interview.finalScore}/{interview.maxScore}
          </Typography>
          <Typography variant="caption" className="text-gray-500">
            Final Score
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

/**
 * Dashboard Page Component
 * Main landing page after authentication
 */
export default function DashboardPage(): JSX.Element {
  const router = useRouter();

  const handleInterviewClick = (interviewId: string): void => {
    // TODO: Pass interview ID when backend is integrated
    console.log('Navigating to interview review:', interviewId);
    router.push('/interview/review');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <Container maxWidth="lg" className="py-12 px-4">
        {/* Welcome Section */}
        <Box className="mb-12">
          <Typography variant="h3" component="h1" className="font-bold text-gray-900 mb-2">
            Welcome back, {MOCK_USER_NAME}!
          </Typography>
          <Typography variant="h6" className="text-gray-600">
            Ready to practice your interview skills?
          </Typography>
        </Box>

        {/* Primary CTA Section */}
        <Paper elevation={3} className="p-8 mb-12 text-center bg-linear-to-r from-blue-600 to-indigo-600 text-white">
          <PlayArrowIcon className="text-7xl mb-4" />
          <Typography variant="h4" className="font-bold mb-3">
            Start New Mock Interview
          </Typography>
          <Typography variant="body1" className="mb-6 opacity-90">
            Practice with AI-powered real-time feedback
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => router.push('/interview/setup')}
            className="bg-white text-blue-600 hover:bg-gray-100 normal-case text-lg px-8 py-3 font-semibold"
          >
            Get Started
          </Button>
        </Paper>

        {/* Recent Interviews Section */}
        <Box className="mb-8">
          <Box className="flex items-center gap-2 mb-6">
            <TrendingUpIcon className="text-gray-700 text-3xl" />
            <Typography variant="h5" component="h2" className="font-bold text-gray-800">
              Recent Interviews
            </Typography>
          </Box>

          {MOCK_INTERVIEWS.length > 0 ? (
            <div className="space-y-4">
              {MOCK_INTERVIEWS.map((interview) => (
                <InterviewHistoryItem
                  key={interview.id}
                  interview={interview}
                  onClick={() => handleInterviewClick(interview.id)}
                />
              ))}
            </div>
          ) : (
            <Paper elevation={1} className="p-12 text-center">
              <Typography variant="h6" className="text-gray-500 mb-2">
                No interviews yet
              </Typography>
              <Typography variant="body2" className="text-gray-400 mb-6">
                Start your first mock interview to see your history here
              </Typography>
              <Button
                variant="outlined"
                onClick={() => router.push('/interview/setup')}
                className="normal-case"
              >
                Start Interview
              </Button>
            </Paper>
          )}
        </Box>
      </Container>
    </div>
  );
}
