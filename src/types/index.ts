/**
 * Centralized type exports
 * Import types from this file for consistency
 */

// Auth types
export type {
  User,
  LoginRequest,
  LoginResponse,
  OtpVerificationRequest,
  OtpVerificationResponse,
  AuthState,
  ApiResponse,
} from './auth';

// Interview types
export type {
  InterviewDomain,
  InterviewDifficulty,
  InterviewDuration,
  InterviewSetupConfig,
  DomainOption,
  DifficultyOption,
  DurationOption,
  InterviewQuestion,
  FeedbackType,
  FeedbackMessage,
  InterviewSession,
  InterviewScorecard,
  InterviewHistoryItem,
} from './interview';

// Analytics types
export type {
  ProgressData,
  FillerWordData,
  TimelineEntry,
  AnalyticsSummary,
  AnalyticsData,
} from './analytics';
