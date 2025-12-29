'use client';

import { JSX } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography, Container, Paper } from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  EmojiEvents as TrophyIcon,
  TrendingUp as TrendingUpIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import FillerWordAnalytics, {
  FillerWordData,
} from '../../components/charts/FillerWordAnalytics';
import ImprovementTimeline, {
  TimelineData,
} from '../../components/charts/ImprovementTimeline';

/**
 * Mock filler word data
 */
const MOCK_FILLER_WORDS: FillerWordData[] = [
  { word: 'um', count: 45 },
  { word: 'uh', count: 38 },
  { word: 'like', count: 32 },
  { word: 'you know', count: 28 },
  { word: 'actually', count: 22 },
  { word: 'basically', count: 18 },
  { word: 'literally', count: 15 },
  { word: 'so', count: 12 },
];

/**
 * Mock improvement timeline data
 */
const MOCK_TIMELINE: TimelineData[] = [
  { id: '1', date: '2024-12-18', domain: 'full-stack', finalScore: 32, maxScore: 50 },
  { id: '2', date: '2024-12-19', domain: 'hr-behavioral', finalScore: 30, maxScore: 50 },
  { id: '3', date: '2024-12-20', domain: 'cloud', finalScore: 28, maxScore: 50 },
  { id: '4', date: '2024-12-22', domain: 'ui-ux', finalScore: 32, maxScore: 50 },
  { id: '5', date: '2024-12-23', domain: 'qa', finalScore: 34, maxScore: 50 },
  { id: '6', date: '2024-12-24', domain: 'mern-stack', finalScore: 35, maxScore: 50 },
  { id: '7', date: '2024-12-25', domain: 'full-stack', finalScore: 38, maxScore: 50 },
  { id: '8', date: '2024-12-26', domain: 'cloud', finalScore: 38, maxScore: 50 },
  { id: '9', date: '2024-12-27', domain: 'hr-behavioral', finalScore: 40, maxScore: 50 },
];

/**
 * Summary Card Component
 */
interface SummaryCardProps {
  icon: JSX.Element;
  title: string;
  value: string;
  subtitle: string;
  bgColor: string;
  iconColor: string;
}

function SummaryCard({
  icon,
  title,
  value,
  subtitle,
  bgColor,
  iconColor,
}: SummaryCardProps): JSX.Element {
  return (
    <Paper elevation={2} className="p-6">
      <Box className="flex items-start gap-4">
        <Box className={`${bgColor} ${iconColor} p-3 rounded-lg`}>{icon}</Box>
        <Box className="flex-1">
          <Typography variant="caption" className="text-gray-500 uppercase tracking-wide">
            {title}
          </Typography>
          <Typography variant="h4" className="font-bold text-gray-900 my-1">
            {value}
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

/**
 * Analytics Dashboard Page
 * Displays comprehensive analytics overview
 */
export default function AnalyticsDashboardPage(): JSX.Element {
  const router = useRouter();

  // Calculate summary statistics
  const totalInterviews = MOCK_TIMELINE.length;
  const averageScore =
    totalInterviews > 0
      ? Math.round(MOCK_TIMELINE.reduce((sum, item) => sum + item.finalScore, 0) / totalInterviews)
      : 0;
  const bestInterview = MOCK_TIMELINE.reduce(
    (best, current) => (current.finalScore > best.finalScore ? current : best),
    MOCK_TIMELINE[0]
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <Container maxWidth="lg">
        {/* Header */}
        <Box className="mb-8">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push('/dashboard')}
            className="mb-4 normal-case"
          >
            Back to Dashboard
          </Button>
          <Typography variant="h3" component="h1" className="font-bold text-gray-900 mb-2">
            Analytics Dashboard
          </Typography>
          <Typography variant="h6" className="text-gray-600">
            Comprehensive overview of your interview performance
          </Typography>
        </Box>

        {/* Summary Cards */}
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            icon={<TrophyIcon className="text-3xl" />}
            title="Best Interview"
            value={`${bestInterview?.finalScore || 0}/50`}
            subtitle={`${bestInterview?.domain.replace('-', ' ') || 'N/A'} • ${
              bestInterview
                ? new Date(bestInterview.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })
                : 'N/A'
            }`}
            bgColor="bg-yellow-100"
            iconColor="text-yellow-600"
          />
          <SummaryCard
            icon={<TrendingUpIcon className="text-3xl" />}
            title="Average Score"
            value={`${averageScore}/50`}
            subtitle={`Across ${totalInterviews} interview${totalInterviews !== 1 ? 's' : ''}`}
            bgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <SummaryCard
            icon={<AssignmentIcon className="text-3xl" />}
            title="Total Interviews"
            value={`${totalInterviews}`}
            subtitle="Mock interviews completed"
            bgColor="bg-green-100"
            iconColor="text-green-600"
          />
        </Box>

        {/* Analytics Components */}
        <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <FillerWordAnalytics fillerWords={MOCK_FILLER_WORDS} />
          <ImprovementTimeline timeline={MOCK_TIMELINE} />
        </Box>

        {/* Action Buttons */}
        <Paper elevation={3} className="p-6 text-center bg-linear-to-r from-blue-600 to-indigo-600">
          <Typography variant="h5" className="font-bold text-white mb-2">
            Ready to Improve?
          </Typography>
          <Typography variant="body1" className="text-white opacity-90 mb-4">
            Continue practicing to enhance your interview skills and track your progress
          </Typography>
          <Box className="flex gap-4 justify-center flex-wrap">
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/interview/setup')}
              className="bg-white text-blue-600 hover:bg-gray-100 normal-case font-semibold"
            >
              Start New Interview
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => router.push('/analytics/progress')}
              className="border-white text-white hover:bg-white hover:text-blue-600 normal-case font-semibold"
            >
              View Detailed Progress
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
