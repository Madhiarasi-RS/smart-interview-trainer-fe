'use client';

import { useState, useEffect, useRef, JSX } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Chip,
  IconButton,
  Alert,
} from '@mui/material';
import {
  Pause as PauseIcon,
  PlayArrow as PlayArrowIcon,
  Stop as StopIcon,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import {
  InterviewQuestion,
  FeedbackMessage,
  FeedbackType,
} from '../../../types/interview';
import { SocketProvider, useSocket } from '../../../context/SocketContext';
import RealtimeFeedback from '../../../components/feedback/RealtimeFeedback';

/**
 * Mock question data
 * TODO: Replace with actual question from backend
 */
const MOCK_QUESTION: InterviewQuestion = {
  id: 'q1',
  text: 'Tell me about a challenging technical problem you faced and how you solved it. What was your approach, and what did you learn from the experience?',
  domain: 'hr-behavioral',
  difficulty: 'medium',
};

/**
 * Mock feedback messages for demonstration
 * TODO: Replace with actual real-time feedback from WebSocket
 */
const MOCK_FEEDBACK: FeedbackMessage[] = [
  {
    id: 'f1',
    type: 'clarity-good',
    message: 'Clear articulation',
    timestamp: Date.now() - 5000,
    severity: 'success',
  },
  {
    id: 'f2',
    type: 'pace-slow',
    message: 'Pace is good',
    timestamp: Date.now() - 3000,
    severity: 'info',
  },
];

/**
 * Format time in MM:SS format
 */
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Get color for feedback type
 */
const getFeedbackColor = (severity: FeedbackMessage['severity']): string => {
  switch (severity) {
    case 'success':
      return 'success';
    case 'warning':
      return 'warning';
    case 'info':
      return 'info';
    default:
      return 'default';
  }
};

/**
 * Interview Session Page Component
 * Displays active interview session with webcam, question, timer, and feedback
 */
function InterviewSessionContent(): JSX.Element {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { connect, disconnect, isConnected } = useSocket();

  // Session state
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [cameraEnabled, setCameraEnabled] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string>('');

  // Feedback state (mock data)
  const [feedbackMessages, setFeedbackMessages] = useState<FeedbackMessage[]>(MOCK_FEEDBACK);

  // Mock session duration (30 minutes = 1800 seconds)
  const totalDuration = 1800;
  const remainingTime = totalDuration - elapsedTime;

  /**
   * Initialize webcam and WebSocket connection
   */
  useEffect(() => {
    const initCamera = async (): Promise<void> => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraEnabled(true);
          setCameraError('');
        }
      } catch (error) {
        console.error('Camera access error:', error);
        setCameraError('Unable to access camera. Please check permissions.');
        setCameraEnabled(false);
      }
    };

    initCamera();
    
    // Connect to WebSocket for real-time feedback
    connect();

    // Cleanup on unmount
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
      disconnect();
    };
  }, [connect, disconnect]);

  /**
   * Timer effect
   */
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setElapsedTime((prev) => {
          if (prev >= totalDuration) {
            setIsActive(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, isPaused, totalDuration]);

  /**
   * Mock feedback simulation
   * TODO: Replace with actual WebSocket feedback
   */
  useEffect(() => {
    if (!isActive || isPaused) return;

    const feedbackInterval = setInterval(() => {
      // Randomly add mock feedback for demonstration
      const feedbackTypes: FeedbackType[] = [
        'pace-slow',
        'pace-fast',
        'clarity-good',
        'on-topic',
      ];
      const randomType = feedbackTypes[Math.floor(Math.random() * feedbackTypes.length)];
      
      const messages: Record<FeedbackType, string> = {
        'pace-slow': 'Slow down slightly',
        'pace-fast': 'Good pace',
        'clarity-poor': 'Speak more clearly',
        'clarity-good': 'Clear communication',
        'off-topic': 'Stay focused',
        'on-topic': 'On track',
        'filler-words': 'Reduce filler words',
      };

      const newFeedback: FeedbackMessage = {
        id: `f${Date.now()}`,
        type: randomType,
        message: messages[randomType],
        timestamp: Date.now(),
        severity: 'info',
      };

      setFeedbackMessages((prev) => [...prev.slice(-2), newFeedback]);
    }, 8000);

    return () => clearInterval(feedbackInterval);
  }, [isActive, isPaused]);

  /**
   * Handle pause/resume
   */
  const handlePauseResume = (): void => {
    setIsPaused((prev) => !prev);
  };

  /**
   * Handle stop interview
   */
  const handleStop = (): void => {
    setIsActive(false);
    // TODO: Submit interview session to backend
    // Navigate to feedback/results page
    console.log('Interview stopped. Elapsed time:', elapsedTime);
    router.push('/dashboard');
  };

  /**
   * Toggle camera
   */
  const handleToggleCamera = (): void => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setCameraEnabled(videoTrack.enabled);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Real-time Feedback Component */}
      <RealtimeFeedback />
      
      <div className="h-screen flex flex-col">
        {/* Header with Timer and Controls */}
        <Box className="bg-gray-800 px-6 py-4 flex justify-between items-center border-b border-gray-700">
          <Box className="flex items-center gap-4">
            <Typography variant="h6" className="font-semibold">
              Interview Session
            </Typography>
            <Chip
              label={isPaused ? 'Paused' : 'Active'}
              color={isPaused ? 'warning' : 'success'}
              size="small"
            />
            {isConnected && (
              <Chip
                label="Connected"
                color="success"
                size="small"
                variant="outlined"
              />
            )}
          </Box>

          <Box className="flex items-center gap-6">
            {/* Timer */}
            <Box className="text-center">
              <Typography variant="caption" className="text-gray-400">
                Time Remaining
              </Typography>
              <Typography
                variant="h5"
                className={`font-mono font-bold ${
                  remainingTime < 300 ? 'text-red-400' : 'text-green-400'
                }`}
              >
                {formatTime(remainingTime)}
              </Typography>
            </Box>

            {/* Controls */}
            <Box className="flex gap-2">
              <IconButton
                onClick={handlePauseResume}
                className="bg-gray-700 hover:bg-gray-600 text-white"
                size="small"
              >
                {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
              </IconButton>
              <IconButton
                onClick={handleStop}
                className="bg-red-600 hover:bg-red-700 text-white"
                size="small"
              >
                <StopIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Question and Feedback */}
          <div className="flex-1 flex flex-col p-6 overflow-y-auto">
            {/* Question Section */}
            <Paper className="bg-gray-800 p-6 mb-6">
              <Typography variant="overline" className="text-gray-400 mb-2">
                Your Question
              </Typography>
              <Typography variant="h6" className="text-white leading-relaxed">
                {MOCK_QUESTION.text}
              </Typography>
              <Box className="flex gap-2 mt-4">
                <Chip
                  label={MOCK_QUESTION.difficulty}
                  size="small"
                  className="capitalize"
                />
                <Chip
                  label={MOCK_QUESTION.domain.replace('-', ' ')}
                  size="small"
                  className="capitalize"
                />
              </Box>
            </Paper>

            {/* Real-time Feedback Section */}
            <Paper className="bg-gray-800 p-6 flex-1">
              <Typography variant="overline" className="text-gray-400 mb-4">
                Real-Time Feedback
              </Typography>
              
              {feedbackMessages.length === 0 ? (
                <Typography variant="body2" className="text-gray-500">
                  Feedback will appear here as you speak...
                </Typography>
              ) : (
                <Box className="space-y-3">
                  {feedbackMessages.map((feedback) => (
                    <Alert
                      key={feedback.id}
                      severity={getFeedbackColor(feedback.severity) as 'success' | 'info' | 'warning'}
                      variant="outlined"
                      className="animate-fade-in"
                    >
                      {feedback.message}
                    </Alert>
                  ))}
                </Box>
              )}

              {/* Placeholder info */}
              <Box className="mt-6 pt-6 border-t border-gray-700">
                <Typography variant="caption" className="text-gray-500 italic">
                  Real-time AI feedback will be connected via WebSocket in production
                </Typography>
              </Box>
            </Paper>
          </div>

          {/* Right: Webcam Preview */}
          <div className="w-96 bg-gray-800 p-6 border-l border-gray-700 flex flex-col">
            <Box className="flex justify-between items-center mb-4">
              <Typography variant="overline" className="text-gray-400">
                Your Camera
              </Typography>
              <IconButton
                onClick={handleToggleCamera}
                size="small"
                className={cameraEnabled ? 'text-green-400' : 'text-gray-400'}
              >
                {cameraEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
              </IconButton>
            </Box>

            {/* Video Preview */}
            <Box className="relative bg-black rounded-lg overflow-hidden flex-1">
              {cameraError ? (
                <Box className="absolute inset-0 flex items-center justify-center p-4">
                  <Typography variant="body2" className="text-red-400 text-center">
                    {cameraError}
                  </Typography>
                </Box>
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              )}

              {/* Recording indicator */}
              {isActive && !isPaused && (
                <Box className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <Typography variant="caption" className="font-semibold">
                    Recording
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Instructions */}
            <Paper className="bg-gray-700 p-4 mt-4">
              <Typography variant="caption" className="text-gray-300">
                <strong>Tips:</strong>
              </Typography>
              <ul className="text-xs text-gray-400 mt-2 space-y-1 list-disc list-inside">
                <li>Maintain eye contact with camera</li>
                <li>Speak clearly and at steady pace</li>
                <li>Structure your answers with examples</li>
                <li>Watch for real-time feedback cues</li>
              </ul>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Page wrapper component
 */
export default function InterviewSessionPage(): JSX.Element {
  return (
    <SocketProvider>
      <InterviewSessionContent />
    </SocketProvider>
  );
}
