/**
 * Interview service layer
 * Skeleton ready for backend integration
 */

import { api, handleApiError } from './api';
import { ApiResponse } from '../types/auth';
import {
  InterviewSetupConfig,
  InterviewQuestion,
  InterviewSession,
  InterviewScorecard,
  InterviewHistoryItem,
  InterviewDomain,
  InterviewDifficulty,
} from '../types/interview';

/**
 * Mock interview data for development
 * TODO: Remove when backend is connected
 */
const MOCK_QUESTION: InterviewQuestion = {
  id: 'q-1',
  text: 'Tell me about a challenging project you worked on and how you overcame the obstacles.',
  domain: 'full-stack' as InterviewDomain,
  difficulty: 'medium' as InterviewDifficulty,
};

const MOCK_SESSION: InterviewSession = {
  id: 'session-' + Date.now(),
  config: {
    domain: 'full-stack' as InterviewDomain,
    difficulty: 'medium' as InterviewDifficulty,
    duration: 30,
  },
  question: MOCK_QUESTION,
  startTime: Date.now(),
  status: 'active',
};

const MOCK_SCORECARD: InterviewScorecard = {
  sessionId: 'session-123',
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
    'Take brief pauses before answering',
  ],
  domain: 'full-stack' as InterviewDomain,
  completedAt: Date.now(),
};

/**
 * Interview service methods
 */
export const interviewService = {
  /**
   * Start a new interview session
   * @param config - Interview configuration
   * @returns Promise with session data
   */
  startInterview: async (
    config: InterviewSetupConfig
  ): Promise<ApiResponse<InterviewSession>> => {
    try {
      // TODO: Replace with actual API call
      // return await api.post<InterviewSession, InterviewSetupConfig>(
      //   '/interview/start',
      //   config
      // );

      // Mock response
      return Promise.resolve({
        success: true,
        data: {
          ...MOCK_SESSION,
          config,
          id: 'session-' + Date.now(),
        },
      });
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get next question for interview session
   * @param sessionId - Interview session ID
   * @returns Promise with question data
   */
  getQuestion: async (sessionId: string): Promise<ApiResponse<InterviewQuestion>> => {
    try {
      // TODO: Replace with actual API call
      // return await api.get<InterviewQuestion>(`/interview/${sessionId}/question`);

      // Mock response
      return Promise.resolve({
        success: true,
        data: MOCK_QUESTION,
      });
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Submit interview answer
   * @param sessionId - Interview session ID
   * @param questionId - Question ID
   * @param answer - User's answer (audio/video data)
   * @returns Promise with submission response
   */
  submitAnswer: async (
    sessionId: string,
    questionId: string,
    answer: Blob | string
  ): Promise<ApiResponse<{ success: boolean }>> => {
    try {
      // TODO: Replace with actual API call
      // const formData = new FormData();
      // formData.append('sessionId', sessionId);
      // formData.append('questionId', questionId);
      // formData.append('answer', answer);
      // return await api.post<{ success: boolean }>('/interview/submit-answer', formData);

      // Mock response
      return Promise.resolve({
        success: true,
        data: { success: true },
        message: 'Answer submitted successfully',
      });
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Complete interview session
   * @param sessionId - Interview session ID
   * @returns Promise with completion response
   */
  completeInterview: async (
    sessionId: string
  ): Promise<ApiResponse<{ success: boolean; scorecardId: string }>> => {
    try {
      // TODO: Replace with actual API call
      // return await api.post<{ success: boolean; scorecardId: string }>(
      //   '/interview/complete',
      //   { sessionId }
      // );

      // Mock response
      return Promise.resolve({
        success: true,
        data: {
          success: true,
          scorecardId: 'scorecard-' + Date.now(),
        },
      });
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get interview scorecard
   * @param sessionId - Interview session ID
   * @returns Promise with scorecard data
   */
  getScorecard: async (sessionId: string): Promise<ApiResponse<InterviewScorecard>> => {
    try {
      // TODO: Replace with actual API call
      // return await api.get<InterviewScorecard>(`/interview/${sessionId}/scorecard`);

      // Mock response
      return Promise.resolve({
        success: true,
        data: MOCK_SCORECARD,
      });
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get interview history
   * @returns Promise with interview history
   */
  getHistory: async (): Promise<ApiResponse<InterviewHistoryItem[]>> => {
    try {
      // TODO: Replace with actual API call
      // return await api.get<InterviewHistoryItem[]>('/interview/history');

      // Mock response
      const mockHistory: InterviewHistoryItem[] = [
        {
          id: 'int-1',
          domain: 'full-stack' as InterviewDomain,
          difficulty: 'medium' as InterviewDifficulty,
          duration: 30,
          finalScore: 38,
          maxScore: 50,
          completedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
        },
        {
          id: 'int-2',
          domain: 'cloud' as InterviewDomain,
          difficulty: 'hard' as InterviewDifficulty,
          duration: 60,
          finalScore: 42,
          maxScore: 50,
          completedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
        },
      ];

      return Promise.resolve({
        success: true,
        data: mockHistory,
      });
    } catch (error) {
      return handleApiError(error);
    }
  },
};
