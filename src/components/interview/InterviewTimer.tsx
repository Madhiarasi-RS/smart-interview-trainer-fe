'use client';

import { useEffect, useState, JSX } from 'react';
import { Box, Typography } from '@mui/material';

/**
 * InterviewTimer Props
 */
interface InterviewTimerProps {
  durationInSeconds: number;
  isPaused: boolean;
}

/**
 * Format seconds to MM:SS display
 */
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Get timer color based on remaining time
 */
const getTimerColor = (remaining: number, total: number): string => {
  const percentage = (remaining / total) * 100;
  if (percentage > 50) return 'text-green-400';
  if (percentage > 20) return 'text-yellow-400';
  return 'text-red-400';
};

/**
 * InterviewTimer Component
 * Displays countdown timer for interview session
 */
export default function InterviewTimer({
  durationInSeconds,
  isPaused,
}: InterviewTimerProps): JSX.Element {
  const [remainingTime, setRemainingTime] = useState<number>(durationInSeconds);

  /**
   * Timer countdown effect
   */
  useEffect(() => {
    // Reset when duration changes
    setRemainingTime(durationInSeconds);
  }, [durationInSeconds]);

  /**
   * Countdown effect
   */
  useEffect(() => {
    if (isPaused || remainingTime <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 0) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, remainingTime]);

  const timerColor = getTimerColor(remainingTime, durationInSeconds);

  return (
    <Box className="text-center">
      <Typography variant="caption" className="text-gray-400 block mb-1">
        Time Remaining
      </Typography>
      <Typography
        variant="h5"
        className={`font-mono font-bold ${timerColor} transition-colors duration-300`}
      >
        {formatTime(remainingTime)}
      </Typography>
    </Box>
  );
}
