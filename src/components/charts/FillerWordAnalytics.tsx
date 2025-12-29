'use client';

import { JSX } from 'react';
import { Box, Paper, Typography, Chip } from '@mui/material';

/**
 * Filler word data interface
 */
export interface FillerWordData {
  word: string;
  count: number;
}

/**
 * Component props
 */
interface FillerWordAnalyticsProps {
  fillerWords: FillerWordData[];
}

/**
 * Get word size based on usage count
 */
const getWordSize = (count: number, maxCount: number): string => {
  const percentage = (count / maxCount) * 100;
  if (percentage >= 75) return 'large';
  if (percentage >= 50) return 'medium';
  return 'small';
};

/**
 * Get word color based on usage count
 */
const getWordColor = (count: number, maxCount: number): 'error' | 'warning' | 'info' => {
  const percentage = (count / maxCount) * 100;
  if (percentage >= 75) return 'error';
  if (percentage >= 50) return 'warning';
  return 'info';
};

/**
 * FillerWordAnalytics Component
 * Displays filler word usage with visual emphasis
 */
export default function FillerWordAnalytics({
  fillerWords,
}: FillerWordAnalyticsProps): JSX.Element {
  if (fillerWords.length === 0) {
    return (
      <Paper elevation={2} className="p-6">
        <Typography variant="h6" className="font-bold text-gray-800 mb-4">
          Filler Word Analytics
        </Typography>
        <Box className="text-center py-8">
          <Typography variant="body2" className="text-gray-400">
            No filler word data available
          </Typography>
        </Box>
      </Paper>
    );
  }

  const maxCount = Math.max(...fillerWords.map((fw) => fw.count));
  const sortedWords = [...fillerWords].sort((a, b) => b.count - a.count);

  return (
    <Paper elevation={2} className="p-6">
      <Typography variant="h6" className="font-bold text-gray-800 mb-2">
        Filler Word Analytics
      </Typography>
      <Typography variant="body2" className="text-gray-600 mb-4">
        Most frequently used filler words across all interviews
      </Typography>

      {/* Filler Words List */}
      <Box className="space-y-4">
        {sortedWords.map((item, index) => {
          const size = getWordSize(item.count, maxCount);
          const color = getWordColor(item.count, maxCount);
          const percentage = ((item.count / maxCount) * 100).toFixed(0);

          return (
            <Box key={item.word} className="flex items-center justify-between">
              <Box className="flex items-center gap-3 flex-1">
                <Box className="w-8 text-center">
                  <Typography variant="caption" className="text-gray-500 font-semibold">
                    #{index + 1}
                  </Typography>
                </Box>
                <Chip
                  label={item.word}
                  color={color}
                  size={size === 'large' ? 'medium' : 'small'}
                  className="font-semibold"
                />
                <Box className="flex-1">
                  <Box className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                    <Box
                      className={`absolute h-full ${
                        color === 'error'
                          ? 'bg-red-500'
                          : color === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-blue-500'
                      } transition-all duration-300`}
                      style={{ width: `${percentage}%` }}
                    />
                  </Box>
                </Box>
              </Box>
              <Box className="text-right ml-4">
                <Typography variant="body1" className="font-bold text-gray-900">
                  {item.count}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  times
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Summary */}
      <Box className="mt-6 pt-4 border-t border-gray-200">
        <Box className="flex justify-between items-center">
          <Typography variant="body2" className="text-gray-600">
            Total Filler Words
          </Typography>
          <Typography variant="h6" className="font-bold text-gray-900">
            {sortedWords.reduce((sum, item) => sum + item.count, 0)}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
