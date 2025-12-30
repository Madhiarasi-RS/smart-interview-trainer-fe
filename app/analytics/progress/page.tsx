'use client';

import { JSX } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography, Container, Paper } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

/**
 * Mock interview progress data
 */
interface ProgressData {
  id: string;
  date: string;
  finalScore: number;
  maxScore: number;
}

/**
 * Mock data for different duration categories
 */
const MOCK_15MIN_PROGRESS: ProgressData[] = [
  { id: '1', date: '2024-12-20', finalScore: 28, maxScore: 50 },
  { id: '2', date: '2024-12-22', finalScore: 32, maxScore: 50 },
  { id: '3', date: '2024-12-24', finalScore: 35, maxScore: 50 },
  { id: '4', date: '2024-12-26', finalScore: 38, maxScore: 50 },
];

const MOCK_30MIN_PROGRESS: ProgressData[] = [
  { id: '1', date: '2024-12-19', finalScore: 30, maxScore: 50 },
  { id: '2', date: '2024-12-23', finalScore: 34, maxScore: 50 },
  { id: '3', date: '2024-12-27', finalScore: 40, maxScore: 50 },
];

const MOCK_1HOUR_PROGRESS: ProgressData[] = [
  { id: '1', date: '2024-12-18', finalScore: 32, maxScore: 50 },
  { id: '2', date: '2024-12-25', finalScore: 38, maxScore: 50 },
];

/**
 * Format date for display
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Get score bar width percentage
 */
const getScorePercentage = (score: number, maxScore: number): number => {
  return (score / maxScore) * 100;
};

/**
 * Get score color
 */
const getScoreColor = (score: number, maxScore: number): string => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return 'bg-green-500';
  if (percentage >= 60) return 'bg-blue-500';
  if (percentage >= 40) return 'bg-yellow-500';
  return 'bg-red-500';
};

/**
 * ProgressBar Component
 */
interface ProgressBarProps {
  data: ProgressData;
  index: number;
}

function ProgressBar({ data, index }: ProgressBarProps): JSX.Element {
  const percentage = getScorePercentage(data.finalScore, data.maxScore);
  const colorClass = getScoreColor(data.finalScore, data.maxScore);

  return (
    <Box className="mb-4">
      <Box className="flex justify-between items-center mb-2">
        <Typography variant="body2" className="text-gray-600">
          Mock {index + 1} - {formatDate(data.date)}
        </Typography>
        <Typography variant="body2" className="font-bold text-gray-900">
          {data.finalScore}/{data.maxScore}
        </Typography>
      </Box>
      <Box className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <Box
          className={`absolute h-full ${colorClass} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </Box>
    </Box>
  );
}

/**
 * ProgressSection Component
 */
interface ProgressSectionProps {
  title: string;
  duration: string;
  data: ProgressData[];
}

function ProgressSection({ title, duration, data }: ProgressSectionProps): JSX.Element {
  const averageScore =
    data.length > 0
      ? Math.round(data.reduce((sum, item) => sum + item.finalScore, 0) / data.length)
      : 0;

  return (
    <Paper elevation={2} className="p-6 mb-6">
      <Box className="flex justify-between items-center mb-4">
        <Box>
          <Typography variant="h6" className="font-bold text-gray-800">
            {title}
          </Typography>
          <Typography variant="caption" className="text-gray-500">
            {duration} sessions
          </Typography>
        </Box>
        {data.length > 0 && (
          <Box className="text-right">
            <Typography variant="caption" className="text-gray-500 block">
              Average Score
            </Typography>
            <Typography variant="h5" className="font-bold text-blue-600">
              {averageScore}/50
            </Typography>
          </Box>
        )}
      </Box>

      {data.length > 0 ? (
        <Box>
          {data.map((item, index) => (
            <ProgressBar key={item.id} data={item} index={index} />
          ))}
        </Box>
      ) : (
        <Box className="text-center py-8">
          <Typography variant="body2" className="text-gray-400">
            No interviews completed yet
          </Typography>
        </Box>
      )}
    </Paper>
  );
}

/**
 * Progress Analytics Page
 * Displays interview progress over time
 */
export default function ProgressAnalyticsPage(): JSX.Element {
  const router = useRouter();

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
            Progress Analytics
          </Typography>
          <Typography variant="h6" className="text-gray-600">
            Track your improvement across different interview durations
          </Typography>
        </Box>

        {/* Progress Sections */}
        <ProgressSection
          title="15-Minute Mock Interviews"
          duration="15 min"
          data={MOCK_15MIN_PROGRESS}
        />

        <ProgressSection
          title="30-Minute Mock Interviews"
          duration="30 min"
          data={MOCK_30MIN_PROGRESS}
        />

        <ProgressSection
          title="1-Hour Mock Interviews"
          duration="1 hour"
          data={MOCK_1HOUR_PROGRESS}
        />

        {/* Summary Card */}
        <Paper elevation={3} className="p-6 bg-linear-to-r from-blue-600 to-indigo-600 text-white">
          <Typography variant="h5" className="font-bold mb-2">
            Keep Practicing!
          </Typography>
          <Typography variant="body1" className="mb-4 opacity-90">
            Consistent practice leads to better interview performance. Track your progress and
            identify areas for improvement.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => router.push('/interview/setup')}
            className="bg-white text-blue-600 hover:bg-gray-100 normal-case font-semibold"
          >
            Start New Interview
          </Button>
        </Paper>
      </Container>
    </div>
  );
}
