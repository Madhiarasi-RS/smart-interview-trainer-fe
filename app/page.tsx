'use client';

import { JSX } from 'react';
import { Button, Box, Typography, Container, Paper, AppBar, Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  Psychology as PsychologyIcon,
  VideoCall as VideoCallIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '../src/context/AuthContext';

/**
 * Home/Landing Page Component
 * Entry point for the Smart Interview Trainer application
 */
export default function Home(): JSX.Element {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = (): void => {
    logout();
    router.push('/');
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header with Auth Buttons */}
      <AppBar position="static" className="bg-white shadow-md" elevation={0}>
        <Toolbar className="justify-between py-2">
          <Typography variant="h6" className="font-bold text-white tracking-tight">
            Smart Interview Trainer
          </Typography>
          <Box className="flex gap-3">
            {isAuthenticated ? (
              <>
                <Button
                  variant="outlined"
                  onClick={() => router.push('/dashboard')}
                  className="normal-case transition-all duration-200 hover:shadow-md border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Dashboard
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  className="normal-case transition-all duration-200 hover:shadow-md"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={() => router.push('/login')}
                  className="normal-case transition-all duration-200 hover:shadow-md border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  onClick={() => router.push('/register')}
                  className="bg-blue-600 hover:bg-blue-700 normal-case transition-all duration-200 hover:shadow-lg"
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="py-20">
        {/* Hero Section */}
        <Box className="text-center mb-20">
          <Typography
            variant="h2"
            component="h1"
            className="font-bold text-gray-900 mb-6 tracking-tight"
          >
            Smart Interview Trainer
          </Typography>
          <Typography
            variant="h5"
            className="text-gray-600 mb-4"
          >
            Master your interview skills with AI-powered real-time feedback and practice
          </Typography>
          {!isAuthenticated && (
            <Box className="flex gap-4 justify-center mt-8">
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push('/register')}
                className="bg-blue-600 hover:bg-blue-700 px-10 py-4 text-lg normal-case font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => router.push('/login')}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-10 py-4 text-lg normal-case font-semibold transition-all duration-200 hover:shadow-md"
              >
                Login
              </Button>
            </Box>
          )}
          {isAuthenticated && (
            <Box className="flex justify-center mt-8">
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700 px-10 py-4 text-lg normal-case font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Go to Dashboard
              </Button>
            </Box>
          )}
        </Box>

        {/* Features Grid */}
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <Paper
              key={index}
              elevation={2}
              className="p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-lg border border-gray-100"
            >
              <Box className="flex flex-col items-center text-center">
                <Box className="mb-5">{feature.icon}</Box>
                <Typography variant="h6" className="font-semibold mb-3 text-gray-800">
                  {feature.title}
                </Typography>
                <Typography variant="body2" className="text-gray-600 leading-relaxed">
                  {feature.description}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* How It Works Section */}
        <Paper elevation={3} className="p-10 bg-white rounded-xl shadow-xl">
          <Typography
            variant="h4"
            component="h2"
            className="font-bold text-center mb-12 text-gray-900"
          >
            How It Works
          </Typography>
          <Box className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Box className="text-center group">
              <Box className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:shadow-lg group-hover:bg-blue-200 group-hover:scale-110">
                <Typography variant="h4" className="font-bold text-blue-600">
                  1
                </Typography>
              </Box>
              <Typography variant="h6" className="font-semibold mb-3 text-gray-800">
                Setup Interview
              </Typography>
              <Typography variant="body2" className="text-gray-600 leading-relaxed">
                Choose your domain, difficulty level, and session duration
              </Typography>
            </Box>
            <Box className="text-center group">
              <Box className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:shadow-lg group-hover:bg-purple-200 group-hover:scale-110">
                <Typography variant="h4" className="font-bold text-purple-600">
                  2
                </Typography>
              </Box>
              <Typography variant="h6" className="font-semibold mb-3 text-gray-800">
                Practice Live
              </Typography>
              <Typography variant="body2" className="text-gray-600 leading-relaxed">
                Answer questions while receiving real-time AI feedback
              </Typography>
            </Box>
            <Box className="text-center group">
              <Box className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:shadow-lg group-hover:bg-green-200 group-hover:scale-110">
                <Typography variant="h4" className="font-bold text-green-600">
                  3
                </Typography>
              </Box>
              <Typography variant="h6" className="font-semibold mb-3 text-gray-800">
                Review & Improve
              </Typography>
              <Typography variant="body2" className="text-gray-600 leading-relaxed">
                Analyze your performance and track your progress over time
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
