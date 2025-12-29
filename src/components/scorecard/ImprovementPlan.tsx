'use client';

import { JSX } from 'react';
import { Box, Typography } from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

/**
 * ImprovementPlan Props
 */
interface ImprovementPlanProps {
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

/**
 * ImprovementPlan Component
 * Displays strengths, weaknesses, and improvement recommendations
 */
export default function ImprovementPlan({
  strengths,
  weaknesses,
  recommendations,
}: ImprovementPlanProps): JSX.Element {
  return (
    <Box>
      <Typography variant="h6" className="font-bold text-gray-800 mb-6">
        Improvement Plan
      </Typography>

      {/* Strengths Section */}
      {strengths.length > 0 && (
        <Box className="mb-6">
          <Box className="flex items-center gap-2 mb-3">
            <CheckCircleIcon className="text-green-600" />
            <Typography variant="subtitle1" className="font-semibold text-green-900">
              Strengths
            </Typography>
          </Box>
          <Box className="bg-green-50 border-l-4 border-green-500 rounded p-4">
            <ul className="space-y-2">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <Typography variant="body2" className="text-gray-700 leading-relaxed">
                    {strength}
                  </Typography>
                </li>
              ))}
            </ul>
          </Box>
        </Box>
      )}

      {/* Weaknesses Section */}
      {weaknesses.length > 0 && (
        <Box className="mb-6">
          <Box className="flex items-center gap-2 mb-3">
            <WarningIcon className="text-yellow-600" />
            <Typography variant="subtitle1" className="font-semibold text-yellow-900">
              Areas for Improvement
            </Typography>
          </Box>
          <Box className="bg-yellow-50 border-l-4 border-yellow-500 rounded p-4">
            <ul className="space-y-2">
              {weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <Typography variant="body2" className="text-gray-700 leading-relaxed">
                    {weakness}
                  </Typography>
                </li>
              ))}
            </ul>
          </Box>
        </Box>
      )}

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <Box>
          <Box className="flex items-center gap-2 mb-3">
            <TrendingUpIcon className="text-blue-600" />
            <Typography variant="subtitle1" className="font-semibold text-blue-900">
              Recommended Actions
            </Typography>
          </Box>
          <Box className="bg-blue-50 border-l-4 border-blue-500 rounded p-4">
            <ul className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Box className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-1">
                    <Typography variant="caption" className="font-bold">
                      {index + 1}
                    </Typography>
                  </Box>
                  <Typography variant="body2" className="text-gray-700 leading-relaxed">
                    {recommendation}
                  </Typography>
                </li>
              ))}
            </ul>
          </Box>
        </Box>
      )}
    </Box>
  );
}
