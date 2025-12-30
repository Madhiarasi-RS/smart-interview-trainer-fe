'use client';

import { JSX, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  TextField,
  Chip,
  Divider,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { InterviewDomain } from '../../src/types/interview';

/**
 * Mock user data
 * TODO: Replace with actual user data from backend
 */
const MOCK_USER = {
  id: 'user-123',
  name: 'John Doe',
  email: 'john.doe@example.com',
  createdAt: new Date('2024-11-15'),
  selectedDomains: ['full-stack', 'cloud', 'hr-behavioral'] as InterviewDomain[],
};

/**
 * All available domains
 */
const ALL_DOMAINS: InterviewDomain[] = [
  'full-stack',
  'cloud',
  'mern-stack',
  'ui-ux',
  'qa',
  'hr-behavioral',
];

/**
 * Format domain label for display
 */
const formatDomain = (domain: InterviewDomain): string => {
  return domain
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Format date for display
 */
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * User Profile Page Component
 * Displays user information and preferences
 */
export default function ProfilePage(): JSX.Element {
  const router = useRouter();
  const [selectedDomains, setSelectedDomains] = useState<InterviewDomain[]>(
    MOCK_USER.selectedDomains
  );
  const [isEditing, setIsEditing] = useState(false);

  /**
   * Toggle domain selection
   */
  const handleDomainToggle = (domain: InterviewDomain): void => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter((d) => d !== domain));
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  /**
   * Save preferences
   */
  const handleSave = (): void => {
    // TODO: Save preferences to backend
    console.log('Saving preferences:', selectedDomains);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <Container maxWidth="md">
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
            My Profile
          </Typography>
          <Typography variant="h6" className="text-gray-600">
            Manage your account information and preferences
          </Typography>
        </Box>

        {/* Profile Information */}
        <Paper elevation={2} className="p-6 mb-6">
          <Box className="flex items-center gap-4 mb-6">
            <Box className="bg-blue-100 p-4 rounded-full">
              <PersonIcon className="text-blue-600 text-4xl" />
            </Box>
            <Box>
              <Typography variant="h5" className="font-bold text-gray-900">
                {MOCK_USER.name}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Student
              </Typography>
            </Box>
          </Box>

          <Divider className="my-4" />

          {/* Contact Information */}
          <Box className="space-y-4">
            <Box className="flex items-center gap-3">
              <EmailIcon className="text-gray-500" />
              <Box className="flex-1">
                <Typography variant="caption" className="text-gray-500">
                  Email Address
                </Typography>
                <Typography variant="body1" className="text-gray-900">
                  {MOCK_USER.email}
                </Typography>
              </Box>
            </Box>

            <Box className="flex items-center gap-3">
              <CalendarIcon className="text-gray-500" />
              <Box className="flex-1">
                <Typography variant="caption" className="text-gray-500">
                  Member Since
                </Typography>
                <Typography variant="body1" className="text-gray-900">
                  {formatDate(MOCK_USER.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Domain Preferences */}
        <Paper elevation={2} className="p-6 mb-6">
          <Box className="flex justify-between items-center mb-4">
            <Box>
              <Typography variant="h6" className="font-bold text-gray-900">
                Preferred Domains
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Select domains you want to focus on
              </Typography>
            </Box>
            {!isEditing ? (
              <Button
                variant="outlined"
                onClick={() => setIsEditing(true)}
                className="normal-case"
              >
                Edit
              </Button>
            ) : (
              <Box className="flex gap-2">
                <Button
                  variant="outlined"
                  onClick={() => {
                    setSelectedDomains(MOCK_USER.selectedDomains);
                    setIsEditing(false);
                  }}
                  className="normal-case"
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 normal-case"
                >
                  Save
                </Button>
              </Box>
            )}
          </Box>

          <Box className="flex flex-wrap gap-2 mt-4">
            {ALL_DOMAINS.map((domain) => (
              <Chip
                key={domain}
                label={formatDomain(domain)}
                color={selectedDomains.includes(domain) ? 'primary' : 'default'}
                onClick={isEditing ? () => handleDomainToggle(domain) : undefined}
                className={isEditing ? 'cursor-pointer' : ''}
                variant={selectedDomains.includes(domain) ? 'filled' : 'outlined'}
              />
            ))}
          </Box>

          {isEditing && (
            <Typography variant="caption" className="text-gray-500 block mt-4">
              Click on domains to select or deselect them
            </Typography>
          )}
        </Paper>

        {/* Interview Statistics */}
        <Paper elevation={2} className="p-6">
          <Typography variant="h6" className="font-bold text-gray-900 mb-4">
            Interview Statistics
          </Typography>
          <Box className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Box className="text-center p-4 bg-blue-50 rounded-lg">
              <Typography variant="h4" className="font-bold text-blue-600">
                9
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Total Interviews
              </Typography>
            </Box>
            <Box className="text-center p-4 bg-green-50 rounded-lg">
              <Typography variant="h4" className="font-bold text-green-600">
                35
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Avg Score
              </Typography>
            </Box>
            <Box className="text-center p-4 bg-purple-50 rounded-lg">
              <Typography variant="h4" className="font-bold text-purple-600">
                42
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Best Score
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
