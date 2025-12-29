'use client';

import { useEffect, useState, JSX } from 'react';
import { useSocket, FeedbackPayload, FeedbackSeverity, FeedbackType } from '../../context/SocketContext';

/**
 * Auto-hide duration for feedback messages (in milliseconds)
 */
const FEEDBACK_DISPLAY_DURATION = 2500; // 2.5 seconds

/**
 * Animation duration (must be ≤ 300ms per guidelines)
 */
const ANIMATION_DURATION = 300;

/**
 * Get severity-based styling classes
 */
const getSeverityStyles = (severity: FeedbackSeverity): string => {
  switch (severity) {
    case 'LOW':
      return 'bg-blue-50 border-blue-300 text-blue-800';
    case 'MEDIUM':
      return 'bg-yellow-50 border-yellow-400 text-yellow-900';
    case 'HIGH':
      return 'bg-red-50 border-red-400 text-red-900';
    default:
      return 'bg-gray-50 border-gray-300 text-gray-800';
  }
};

/**
 * Get feedback type icon
 */
const getFeedbackIcon = (type: FeedbackType): string => {
  switch (type) {
    case 'PACE':
      return '⏱️';
    case 'FILLER':
      return '🎯';
    case 'CONFIDENCE':
      return '💪';
    case 'RELEVANCE':
      return '🎯';
    default:
      return '💡';
  }
};

/**
 * Get feedback type label
 */
const getFeedbackTypeLabel = (type: FeedbackType): string => {
  switch (type) {
    case 'PACE':
      return 'Pace';
    case 'FILLER':
      return 'Filler Words';
    case 'CONFIDENCE':
      return 'Confidence';
    case 'RELEVANCE':
      return 'Relevance';
    default:
      return 'Feedback';
  }
};

/**
 * RealtimeFeedback Component
 * Displays live behavioral feedback during interview sessions
 * Non-blocking, auto-hiding, minimal UI design
 */
export default function RealtimeFeedback(): JSX.Element {
  const { latestFeedback, isConnected } = useSocket();
  
  const [displayedFeedback, setDisplayedFeedback] = useState<FeedbackPayload | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState<boolean>(false);

  /**
   * Handle new feedback arrival
   */
  useEffect(() => {
    if (!latestFeedback) {
      return;
    }

    // Only update if it's a new feedback (different timestamp)
    if (
      displayedFeedback &&
      displayedFeedback.timestamp === latestFeedback.timestamp
    ) {
      return;
    }

    // Reset animation state if animating out
    if (isAnimatingOut) {
      setIsAnimatingOut(false);
    }

    // Display new feedback
    setDisplayedFeedback(latestFeedback);
    setIsVisible(true);

    // Auto-hide after duration
    const hideTimer = setTimeout(() => {
      setIsAnimatingOut(true);
      
      // Remove from DOM after animation completes
      setTimeout(() => {
        setIsVisible(false);
        setIsAnimatingOut(false);
      }, ANIMATION_DURATION);
    }, FEEDBACK_DISPLAY_DURATION);

    return () => {
      clearTimeout(hideTimer);
    };
  }, [latestFeedback, displayedFeedback, isAnimatingOut]);

  // Don't render if not visible or no feedback to display
  if (!isVisible || !displayedFeedback) {
    return <></>;
  }

  const severityStyles = getSeverityStyles(displayedFeedback.severity);
  const icon = getFeedbackIcon(displayedFeedback.type);
  const typeLabel = getFeedbackTypeLabel(displayedFeedback.type);

  return (
    <div
      className={`
        fixed top-24 right-6 z-50
        max-w-sm w-full
        transition-all duration-300 ease-out
        ${isAnimatingOut ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}
      `}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className={`
          ${severityStyles}
          border-l-4 rounded-lg shadow-lg
          p-4
          backdrop-blur-sm
        `}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl" aria-hidden="true">
            {icon}
          </span>
          <span className="font-semibold text-sm uppercase tracking-wide">
            {typeLabel}
          </span>
          {!isConnected && (
            <span className="ml-auto text-xs opacity-60">(Offline)</span>
          )}
        </div>

        {/* Message */}
        <p className="text-sm leading-relaxed">
          {displayedFeedback.message}
        </p>

        {/* Progress bar (optional visual indicator) */}
        <div className="mt-3 h-1 bg-black bg-opacity-10 rounded-full overflow-hidden">
          <div
            className="h-full bg-current opacity-30 animate-shrink-width"
            style={{
              animationDuration: `${FEEDBACK_DISPLAY_DURATION}ms`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
