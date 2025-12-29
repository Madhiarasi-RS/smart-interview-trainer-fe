/**
 * Interview domain/field options
 */
export type InterviewDomain = 
  | 'full-stack'
  | 'cloud'
  | 'mern-stack'
  | 'ui-ux'
  | 'qa'
  | 'hr-behavioral';

/**
 * Interview difficulty levels
 */
export type InterviewDifficulty = 'easy' | 'medium' | 'hard';

/**
 * Interview duration in minutes
 */
export type InterviewDuration = 15 | 30 | 60;

/**
 * Interview setup configuration
 * This shape is prepared for backend integration
 */
export interface InterviewSetupConfig {
  domain: InterviewDomain;
  difficulty: InterviewDifficulty;
  duration: InterviewDuration;
}

/**
 * Domain option for UI display
 */
export interface DomainOption {
  value: InterviewDomain;
  label: string;
  description: string;
}

/**
 * Difficulty option for UI display
 */
export interface DifficultyOption {
  value: InterviewDifficulty;
  label: string;
  description: string;
}

/**
 * Duration option for UI display
 */
export interface DurationOption {
  value: InterviewDuration;
  label: string;
  description: string;
}

/**
 * Interview question
 */
export interface InterviewQuestion {
  id: string;
  text: string;
  domain: InterviewDomain;
  difficulty: InterviewDifficulty;
}

/**
 * Real-time feedback types
 */
export type FeedbackType = 
  | 'pace-slow'
  | 'pace-fast'
  | 'clarity-poor'
  | 'clarity-good'
  | 'off-topic'
  | 'on-topic'
  | 'filler-words';

/**
 * Real-time feedback message
 */
export interface FeedbackMessage {
  id: string;
  type: FeedbackType;
  message: string;
  timestamp: number;
  severity: 'info' | 'warning' | 'success';
}

/**
 * Interview session state
 */
export interface InterviewSession {
  id: string;
  config: InterviewSetupConfig;
  question: InterviewQuestion;
  startTime: number;
  status: 'preparing' | 'active' | 'paused' | 'completed';
}

/**
 * Interview scorecard data
 * Prepared for backend integration
 */
export interface InterviewScorecard {
  sessionId: string;
  communicationScore: number; // 0-10
  domainFitScore: number; // 0-10
  confidenceScore: number; // 0-10
  relevanceScore: number; // 0-10
  fillerWordCount: number;
  finalScore: number; // 0-50 (sum of all scores, max 40 + bonus)
  performanceSummary: string;
  improvementSuggestions: string[];
  domain: InterviewDomain;
  completedAt: number;
}

/**
 * Interview history item for dashboard
 */
export interface InterviewHistoryItem {
  id: string;
  domain: InterviewDomain;
  difficulty: InterviewDifficulty;
  duration: InterviewDuration;
  finalScore: number;
  maxScore: number;
  completedAt: number;
}