'use client';

import { JSX } from 'react';
import { Button, Box, Typography, Container, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  Psychology as PsychologyIcon,
  VideoCall as VideoCallIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

/**
 * Home/Landing Page Component
 * Entry point for the Smart Interview Trainer application
 */
export default function Home(): JSX.Element {
  const router = useRouter();

  const features = [
    {
      icon: <VideoCallIcon className="text-5xl text-blue-600" />,
      title: 'Live Interview Practice',
      description: 'Practice with real interview questions in a simulated environment',
    },
    {
      icon: <PsychologyIcon className="text-5xl text-purple-600" />,
      title: 'AI-Powered Feedback',
      description: 'Get real-time feedback on your pace, clarity, and content',
    },
    {
      icon: <AssessmentIcon className="text-5xl text-green-600" />,
      title: 'Performance Analytics',
      description: 'Track your progress with detailed performance metrics',
    },
    {
      icon: <TrendingUpIcon className="text-5xl text-orange-600" />,
      title: 'Continuous Improvement',
      description: 'Review sessions and identify areas for growth',
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Container maxWidth="lg" className="py-16">
        {/* Hero Section */}
        <Box className="text-center mb-16">
          <Typography
            variant="h2"
            component="h1"
            className="font-bold text-gray-900 mb-4"
          >
            Smart Interview Trainer
          </Typography>
          <Typography
            variant="h5"
            className="text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Master your interview skills with AI-powered real-time feedback and practice
          </Typography>
          <Box className="flex gap-4 justify-center">
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/login')}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg normal-case"
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => router.push('/interview/setup')}
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg normal-case"
            >
              Try Demo
            </Button>
          </Box>
        </Box>

        {/* Features Grid */}
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, index) => (
            <Paper
              key={index}
              elevation={2}
              className="p-6 hover:shadow-lg transition-shadow"
            >
              <Box className="flex flex-col items-center text-center">
                <Box className="mb-4">{feature.icon}</Box>
                <Typography variant="h6" className="font-semibold mb-2">
                  {feature.title}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {feature.description}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* How It Works Section */}
        <Paper elevation={3} className="p-8 bg-white">
          <Typography
            variant="h4"
            component="h2"
            className="font-bold text-center mb-8"
          >
            How It Works
          </Typography>
          <Box className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Box className="text-center">
              <Box className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Typography variant="h4" className="font-bold text-blue-600">
                  1
                </Typography>
              </Box>
              <Typography variant="h6" className="font-semibold mb-2">
                Setup Interview
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Choose your domain, difficulty level, and session duration
              </Typography>
            </Box>
            <Box className="text-center">
              <Box className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Typography variant="h4" className="font-bold text-purple-600">
                  2
                </Typography>
              </Box>
              <Typography variant="h6" className="font-semibold mb-2">
                Practice Live
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Answer questions while receiving real-time AI feedback
              </Typography>
            </Box>
            <Box className="text-center">
              <Box className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Typography variant="h4" className="font-bold text-green-600">
                  3
                </Typography>
              </Box>
              <Typography variant="h6" className="font-semibold mb-2">
                Review & Improve
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Analyze your performance and track your progress over time
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
