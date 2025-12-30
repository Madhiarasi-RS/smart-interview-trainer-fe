'use client';

import { useState, JSX } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  InterviewDomain,
  InterviewDifficulty,
  InterviewDuration,
  InterviewSetupConfig,
  DomainOption,
  DifficultyOption,
  DurationOption,
} from '../../../src/types/interview';

/**
 * Domain options configuration
 */
const DOMAIN_OPTIONS: DomainOption[] = [
  {
    value: 'full-stack',
    label: 'Full Stack',
    description: 'Frontend, backend, and database development',
  },
  {
    value: 'cloud',
    label: 'Cloud',
    description: 'AWS, Azure, GCP, cloud architecture',
  },
  {
    value: 'mern-stack',
    label: 'MERN Stack',
    description: 'MongoDB, Express, React, Node.js',
  },
  {
    value: 'ui-ux',
    label: 'UI/UX',
    description: 'User interface and experience design',
  },
  {
    value: 'qa',
    label: 'QA',
    description: 'Quality assurance and testing',
  },
  {
    value: 'hr-behavioral',
    label: 'HR / Behavioral',
    description: 'Soft skills, communication, culture fit',
  },
];

/**
 * Difficulty options configuration
 */
const DIFFICULTY_OPTIONS: DifficultyOption[] = [
  {
    value: 'easy',
    label: 'Easy',
    description: 'Entry-level questions',
  },
  {
    value: 'medium',
    label: 'Medium',
    description: 'Mid-level complexity',
  },
  {
    value: 'hard',
    label: 'Hard',
    description: 'Advanced challenges',
  },
];

/**
 * Duration options configuration
 */
const DURATION_OPTIONS: DurationOption[] = [
  {
    value: 15,
    label: '15 Minutes',
    description: 'Quick practice session',
  },
  {
    value: 30,
    label: '30 Minutes',
    description: 'Standard interview length',
  },
  {
    value: 60,
    label: '1 Hour',
    description: 'Full interview simulation',
  },
];

/**
 * Interview Setup Page Component
 * Allows users to configure their interview practice session
 */
export default function InterviewSetupPage(): JSX.Element {
  const router = useRouter();

  // Local state for setup configuration
  const [domain, setDomain] = useState<InterviewDomain | null>(null);
  const [difficulty, setDifficulty] = useState<InterviewDifficulty | null>(null);
  const [duration, setDuration] = useState<InterviewDuration | null>(null);

  /**
   * Check if all required fields are selected
   */
  const isFormComplete = domain !== null && difficulty !== null && duration !== null;

  /**
   * Handle form submission
   * Currently prepares data shape for backend integration
   */
  const handleStartInterview = (): void => {
    if (!isFormComplete) {
      return;
    }

    // Prepare interview configuration for backend
    const config: InterviewSetupConfig = {
      domain: domain as InterviewDomain,
      difficulty: difficulty as InterviewDifficulty,
      duration: duration as InterviewDuration,
    };

    // TODO: Backend integration
    // - Send config to interview service
    // - Get interview session ID
    console.log('Interview configuration:', config);

    // Navigate to interview session with setup data
    const params = new URLSearchParams({
      domain: config.domain,
      difficulty: config.difficulty,
      duration: config.duration.toString(),
    });
    router.push(`/interview/session?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Paper elevation={3} className="p-8 rounded-lg">
          {/* Header */}
          <Box className="mb-8 text-center">
            <Typography variant="h4" component="h1" className="font-bold text-gray-800 mb-2">
              Set Up Your Interview
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              Configure your practice session to match your preparation goals
            </Typography>
          </Box>

          {/* Domain Selection */}
          <Box className="mb-8">
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" className="text-lg font-semibold text-gray-800 mb-4">
                1. Select Interview Domain
              </FormLabel>
              <RadioGroup
                value={domain || ''}
                onChange={(e) => setDomain(e.target.value as InterviewDomain)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {DOMAIN_OPTIONS.map((option) => (
                    <Card
                      key={option.value}
                      className={`cursor-pointer transition-all ${
                        domain === option.value
                          ? 'ring-2 ring-blue-600 bg-blue-50'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setDomain(option.value)}
                    >
                      <CardContent className="p-4">
                        <FormControlLabel
                          value={option.value}
                          control={<Radio />}
                          label={
                            <Box>
                              <Typography variant="subtitle1" className="font-semibold">
                                {option.label}
                              </Typography>
                              <Typography variant="body2" className="text-gray-600">
                                {option.description}
                              </Typography>
                            </Box>
                          }
                          className="m-0 w-full"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Difficulty Selection */}
          <Box className="mb-8">
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" className="text-lg font-semibold text-gray-800 mb-4">
                2. Select Difficulty Level
              </FormLabel>
              <RadioGroup
                value={difficulty || ''}
                onChange={(e) => setDifficulty(e.target.value as InterviewDifficulty)}
                row
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  {DIFFICULTY_OPTIONS.map((option) => (
                    <Card
                      key={option.value}
                      className={`cursor-pointer transition-all ${
                        difficulty === option.value
                          ? 'ring-2 ring-blue-600 bg-blue-50'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setDifficulty(option.value)}
                    >
                      <CardContent className="p-4">
                        <FormControlLabel
                          value={option.value}
                          control={<Radio />}
                          label={
                            <Box>
                              <Typography variant="subtitle1" className="font-semibold">
                                {option.label}
                              </Typography>
                              <Typography variant="body2" className="text-gray-600">
                                {option.description}
                              </Typography>
                            </Box>
                          }
                          className="m-0 w-full"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Duration Selection */}
          <Box className="mb-8">
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" className="text-lg font-semibold text-gray-800 mb-4">
                3. Select Duration
              </FormLabel>
              <RadioGroup
                value={duration || ''}
                onChange={(e) => setDuration(Number(e.target.value) as InterviewDuration)}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {DURATION_OPTIONS.map((option) => (
                    <Card
                      key={option.value}
                      className={`cursor-pointer transition-all ${
                        duration === option.value
                          ? 'ring-2 ring-blue-600 bg-blue-50'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setDuration(option.value)}
                    >
                      <CardContent className="p-4 text-center">
                        <FormControlLabel
                          value={option.value}
                          control={<Radio className="hidden" />}
                          label={
                            <Box>
                              <Typography variant="h6" className="font-bold">
                                {option.label}
                              </Typography>
                              <Typography variant="body2" className="text-gray-600">
                                {option.description}
                              </Typography>
                            </Box>
                          }
                          className="m-0 w-full"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Action Buttons */}
          <Box className="flex gap-4 justify-between items-center pt-6 border-t">
            <Button
              variant="outlined"
              size="large"
              onClick={() => router.push('/dashboard')}
              className="normal-case text-base"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="large"
              disabled={!isFormComplete}
              onClick={handleStartInterview}
              className="bg-blue-600 hover:bg-blue-700 normal-case text-base font-medium px-8"
            >
              Start Interview
            </Button>
          </Box>
        </Paper>
      </div>
    </div>
  );
}
