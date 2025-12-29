'use client';

import { JSX } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon } from '@mui/icons-material';

/**
 * Timeline data interface
 */
export interface TimelineData {
  id: string;
  date: string;
  domain: string;
  finalScore: number;
  maxScore: number;
}

/**
 * Component props
 */
interface ImprovementTimelineProps {
  timeline: TimelineData[];
}

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
 * Get score color
 */
const getScoreColor = (score: number, maxScore: number): string => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return 'text-green-600';
  if (percentage >= 60) return 'text-blue-600';
  if (percentage >= 40) return 'text-yellow-600';
  return 'text-red-600';
};

/**
 * Get score bar color
 */
const getScoreBarColor = (score: number, maxScore: number): string => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return 'bg-green-500';
  if (percentage >= 60) return 'bg-blue-500';
  if (percentage >= 40) return 'bg-yellow-500';
  return 'bg-red-500';
};

/**
 * Calculate improvement trend
 */
const calculateTrend = (current: number, previous: number): number => {
  return current - previous;
};

/**
 * ImprovementTimeline Component
 * Displays chronological improvement trend
 */
export default function ImprovementTimeline({ timeline }: ImprovementTimelineProps): JSX.Element {
  if (timeline.length === 0) {
    return (
      <Paper elevation={2} className="p-6">
        <Typography variant="h6" className="font-bold text-gray-800 mb-4">
          Improvement Timeline
        </Typography>
        <Box className="text-center py-8">
          <Typography variant="body2" className="text-gray-400">
            No interview data available
          </Typography>
        </Box>
      </Paper>
    );
  }

  const sortedTimeline = [...timeline].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <Paper elevation={2} className="p-6">
      <Typography variant="h6" className="font-bold text-gray-800 mb-2">
        Improvement Timeline
      </Typography>
      <Typography variant="body2" className="text-gray-600 mb-4">
        Track your progress across all interviews
      </Typography>

      <Box className="space-y-4">
        {sortedTimeline.map((item, index) => {
          const percentage = (item.finalScore / item.maxScore) * 100;
          const scoreColor = getScoreColor(item.finalScore, item.maxScore);
          const barColor = getScoreBarColor(item.finalScore, item.maxScore);

          // Calculate trend if not the first interview
          let trend: number | null = null;
          let trendIcon: JSX.Element | null = null;
          if (index > 0) {
            trend = calculateTrend(item.finalScore, sortedTimeline[index - 1].finalScore);
            if (trend > 0) {
              trendIcon = <TrendingUpIcon className="text-green-600 text-sm" />;
            } else if (trend < 0) {
              trendIcon = <TrendingDownIcon className="text-red-600 text-sm" />;
            }
          }

          return (
            <Box key={item.id} className="border-l-4 border-blue-500 pl-4 py-2">
              {/* Date and Domain */}
              <Box className="flex justify-between items-start mb-2">
                <Box>
                  <Typography variant="body2" className="font-semibold text-gray-800">
                    {formatDate(item.date)}
                  </Typography>
                  <Typography variant="caption" className="text-gray-500 capitalize">
                    {item.domain.replace('-', ' ')}
                  </Typography>
                </Box>
                <Box className="text-right">
                  <Box className="flex items-center gap-1 justify-end">
                    <Typography variant="body1" className={`font-bold ${scoreColor}`}>
                      {item.finalScore}/{item.maxScore}
                    </Typography>
                    {trendIcon}
                  </Box>
                  {trend !== null && (
                    <Typography
                      variant="caption"
                      className={trend >= 0 ? 'text-green-600' : 'text-red-600'}
                    >
                      {trend > 0 ? '+' : ''}
                      {trend} pts
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Score Bar */}
              <Box className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                <Box
                  className={`absolute h-full ${barColor} transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                />
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Overall Statistics */}
      {sortedTimeline.length >= 2 && (
        <Box className="mt-6 pt-4 border-t border-gray-200">
          <Box className="grid grid-cols-2 gap-4">
            <Box>
              <Typography variant="caption" className="text-gray-500">
                First Score
              </Typography>
              <Typography variant="h6" className="font-bold text-gray-900">
                {sortedTimeline[0].finalScore}/{sortedTimeline[0].maxScore}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" className="text-gray-500">
                Latest Score
              </Typography>
              <Typography variant="h6" className="font-bold text-gray-900">
                {sortedTimeline[sortedTimeline.length - 1].finalScore}/
                {sortedTimeline[sortedTimeline.length - 1].maxScore}
              </Typography>
            </Box>
          </Box>
          <Box className="mt-4">
            <Typography variant="caption" className="text-gray-500">
              Overall Improvement
            </Typography>
            <Typography
              variant="h6"
              className={`font-bold ${
                sortedTimeline[sortedTimeline.length - 1].finalScore >=
                sortedTimeline[0].finalScore
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {sortedTimeline[sortedTimeline.length - 1].finalScore - sortedTimeline[0].finalScore >
              0
                ? '+'
                : ''}
              {sortedTimeline[sortedTimeline.length - 1].finalScore - sortedTimeline[0].finalScore}{' '}
              points
            </Typography>
          </Box>
        </Box>
      )}
    </Paper>
  );
}
