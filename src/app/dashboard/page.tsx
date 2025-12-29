'use client';

import { JSX } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography, Container, Paper } from '@mui/material';
import {
  PlayArrow as PlayArrowIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

/**
 * Dashboard Page Component
 * Main landing page after authentication
 */
export default function DashboardPage(): JSX.Element {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <Container maxWidth="lg" className="py-16">
        <Box className="text-center mb-12">
          <Typography variant="h3" component="h1" className="font-bold text-gray-900 mb-4">
            Welcome to Your Dashboard
          </Typography>
          <Typography variant="h6" className="text-gray-600">
            Start practicing or review your past interviews
          </Typography>
        </Box>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Start New Interview */}
          <Paper elevation={3} className="p-6 text-center hover:shadow-lg transition-shadow">
            <PlayArrowIcon className="text-6xl text-blue-600 mb-4" />
            <Typography variant="h6" className="font-semibold mb-2">
              Start Interview
            </Typography>
            <Typography variant="body2" className="text-gray-600 mb-4">
              Begin a new practice session
            </Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={() => router.push('/interview/setup')}
              className="bg-blue-600 hover:bg-blue-700 normal-case"
            >
              Get Started
            </Button>
          </Paper>

          {/* View Analytics */}
          <Paper elevation={3} className="p-6 text-center hover:shadow-lg transition-shadow">
            <AssessmentIcon className="text-6xl text-purple-600 mb-4" />
            <Typography variant="h6" className="font-semibold mb-2">
              Analytics
            </Typography>
            <Typography variant="body2" className="text-gray-600 mb-4">
              Track your progress
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => router.push('/analytics')}
              className="normal-case"
            >
              View Stats
            </Button>
          </Paper>

          {/* Past Interviews */}
          <Paper elevation={3} className="p-6 text-center hover:shadow-lg transition-shadow">
            <TrendingUpIcon className="text-6xl text-green-600 mb-4" />
            <Typography variant="h6" className="font-semibold mb-2">
              Past Interviews
            </Typography>
            <Typography variant="body2" className="text-gray-600 mb-4">
              Review previous sessions
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => router.push('/interview/review')}
              className="normal-case"
            >
              View History
            </Button>
          </Paper>
        </div>
      </Container>
    </div>
  );
}
