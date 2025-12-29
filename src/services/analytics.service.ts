/**
 * Analytics service layer
 * Skeleton ready for backend integration
 */

import { api, handleApiError } from './api';
import { ApiResponse } from '../types/auth';
import {
  AnalyticsData,
  AnalyticsSummary,
  FillerWordData,
  TimelineEntry,
  ProgressData,
} from '../types/analytics';
import { InterviewScorecard } from '../types/interview';

/**
 * Mock analytics data for development
 * TODO: Remove when backend is connected
 */
const MOCK_FILLER_WORDS: FillerWordData[] = [
  { word: 'um', count: 45 },
  { word: 'uh', count: 38 },
  { word: 'like', count: 32 },
  { word: 'you know', count: 28 },
  { word: 'actually', count: 22 },
];

const MOCK_TIMELINE: TimelineEntry[] = [
  {
    id: '1',
    date: '2024-12-18',
    domain: 'full-stack',
    difficulty: 'medium',
    finalScore: 32,
    maxScore: 50,
  },
  {
    id: '2',
    date: '2024-12-20',
    domain: 'cloud',
    difficulty: 'hard',
    finalScore: 38,
    maxScore: 50,
  },
  {
    id: '3',
    date: '2024-12-25',
    domain: 'hr-behavioral',
    difficulty: 'easy',
    finalScore: 42,
    maxScore: 50,
  },
];

const MOCK_PROGRESS_15MIN: ProgressData[] = [
  { id: '1', date: '2024-12-20', duration: 15, finalScore: 28, maxScore: 50, domain: 'full-stack' },
  { id: '2', date: '2024-12-22', duration: 15, finalScore: 32, maxScore: 50, domain: 'cloud' },
  { id: '3', date: '2024-12-24', duration: 15, finalScore: 35, maxScore: 50, domain: 'ui-ux' },
];

const MOCK_PROGRESS_30MIN: ProgressData[] = [
  { id: '1', date: '2024-12-19', duration: 30, finalScore: 30, maxScore: 50, domain: 'full-stack' },
  { id: '2', date: '2024-12-23', duration: 30, finalScore: 34, maxScore: 50, domain: 'mern-stack' },
  { id: '3', date: '2024-12-27', duration: 30, finalScore: 40, maxScore: 50, domain: 'qa' },
];

const MOCK_PROGRESS_60MIN: ProgressData[] = [
  { id: '1', date: '2024-12-18', duration: 60, finalScore: 32, maxScore: 50, domain: 'cloud' },
  { id: '2', date: '2024-12-25', duration: 60, finalScore: 38, maxScore: 50, domain: 'full-stack' },
];

const MOCK_SUMMARY: AnalyticsSummary = {
  totalInterviews: 9,
  averageScore: 35,
  bestScore: 42,
  bestScoreDomain: 'hr-behavioral',
  bestScoreDate: '2024-12-25',
  improvementTrend: 10,
};

/**
 * Analytics service methods
 */
export const analyticsService = {
  /**
   * Get comprehensive analytics data
   * @returns Promise with complete analytics data
   */
  getAnalytics: async (): Promise<ApiResponse<AnalyticsData>> => {
    try {
      // TODO: Replace with actual API call
      // return await api.get<AnalyticsData>('/analytics');

      // Mock response
      return Promise.resolve({
        success: true,
        data: {
          summary: MOCK_SUMMARY,
          fillerWords: MOCK_FILLER_WORDS,
          timeline: MOCK_TIMELINE,
          progressByDuration: {
            fifteenMin: MOCK_PROGRESS_15MIN,
            thirtyMin: MOCK_PROGRESS_30MIN,
            sixtyMin: MOCK_PROGRESS_60MIN,
          },
        },
      });
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get scorecard for specific interview
   * @param sessionId - Interview session ID
   * @returns Promise with scorecard data
   */
  getScorecard: async (sessionId: string): Promise<ApiResponse<InterviewScorecard>> => {
    try {
      // TODO: Replace with actual API call
      // return await api.get<InterviewScorecard>(`/analytics/scorecard/${sessionId}`);

      // Mock response
      const mockScorecard: InterviewScorecard = {
        sessionId,
        communicationScore: 8,
        domainFitScore: 7,
        confidenceScore: 9,
        relevanceScore: 8,
        fillerWordCount: 12,
        finalScore: 32,
        performanceSummary: 'Strong performance overall.',
        improvementSuggestions: [
          'Reduce filler words',
          'Provide more technical details',
          'Take brief pauses',
        ],
        domain: 'full-stack',
        completedAt: Date.now(),
      };

      return Promise.resolve({
        success: true,
        data: mockScorecard,
      });
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get progress data by duration
   * @param duration - Interview duration (15, 30, or 60 minutes)
   * @returns Promise with progress data
   */
  getProgressByDuration: async (duration: 15 | 30 | 60): Promise<ApiResponse<ProgressData[]>> => {
    try {
      // TODO: Replace with actual API call
      // return await api.get<ProgressData[]>(`/analytics/progress?duration=${duration}`);

      // Mock response
      let data: ProgressData[] = [];
      if (duration === 15) data = MOCK_PROGRESS_15MIN;
      else if (duration === 30) data = MOCK_PROGRESS_30MIN;
      else if (duration === 60) data = MOCK_PROGRESS_60MIN;

      return Promise.resolve({
        success: true,
        data,
      });
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get filler word analytics
   * @returns Promise with filler word data
   */
  getFillerWords: async (): Promise<ApiResponse<FillerWordData[]>> => {
    try {
      // TODO: Replace with actual API call
      // return await api.get<FillerWordData[]>('/analytics/filler-words');

      // Mock response
      return Promise.resolve({
        success: true,
        data: MOCK_FILLER_WORDS,
      });
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get improvement timeline
   * @returns Promise with timeline data
   */
  getTimeline: async (): Promise<ApiResponse<TimelineEntry[]>> => {
    try {
      // TODO: Replace with actual API call
      // return await api.get<TimelineEntry[]>('/analytics/timeline');

      // Mock response
      return Promise.resolve({
        success: true,
        data: MOCK_TIMELINE,
      });
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get summary statistics
   * @returns Promise with summary data
   */
  getSummary: async (): Promise<ApiResponse<AnalyticsSummary>> => {
    try {
      // TODO: Replace with actual API call
      // return await api.get<AnalyticsSummary>('/analytics/summary');

      // Mock response
      return Promise.resolve({
        success: true,
        data: MOCK_SUMMARY,
      });
    } catch (error) {
      return handleApiError(error);
    }
  },
};
