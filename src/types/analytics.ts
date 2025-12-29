/**
 * Progress data for analytics
 */
export interface ProgressData {
  id: string;
  date: string;
  duration: number; // in minutes
  finalScore: number;
  maxScore: number;
  domain: string;
}

/**
 * Filler word analytics data
 */
export interface FillerWordData {
  word: string;
  count: number;
}

/**
 * Timeline entry for improvement tracking
 */
export interface TimelineEntry {
  id: string;
  date: string;
  domain: string;
  difficulty: string;
  finalScore: number;
  maxScore: number;
}

/**
 * Analytics summary statistics
 */
export interface AnalyticsSummary {
  totalInterviews: number;
  averageScore: number;
  bestScore: number;
  bestScoreDomain: string;
  bestScoreDate: string;
  improvementTrend: number; // positive or negative
}

/**
 * Comprehensive analytics data
 */
export interface AnalyticsData {
  summary: AnalyticsSummary;
  fillerWords: FillerWordData[];
  timeline: TimelineEntry[];
  progressByDuration: {
    fifteenMin: ProgressData[];
    thirtyMin: ProgressData[];
    sixtyMin: ProgressData[];
  };
}
