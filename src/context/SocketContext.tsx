'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  JSX,
} from 'react';

/**
 * Feedback types for real-time behavioral analysis
 */
export type FeedbackType = 'PACE' | 'FILLER' | 'CONFIDENCE' | 'RELEVANCE';

/**
 * Feedback severity levels
 */
export type FeedbackSeverity = 'LOW' | 'MEDIUM' | 'HIGH';

/**
 * Real-time feedback payload from WebSocket
 */
export interface FeedbackPayload {
  type: FeedbackType;
  message: string;
  severity: FeedbackSeverity;
  timestamp: number;
}

/**
 * WebSocket event types
 */
type SocketEvent = 'feedback' | 'connected' | 'disconnected';

/**
 * WebSocket message structure
 */
interface SocketMessage {
  event: SocketEvent;
  payload?: FeedbackPayload;
}

/**
 * Socket context value interface
 */
interface SocketContextValue {
  isConnected: boolean;
  latestFeedback: FeedbackPayload | null;
  connect: () => void;
  disconnect: () => void;
}

/**
 * Socket context
 */
const SocketContext = createContext<SocketContextValue | undefined>(undefined);

/**
 * Socket Provider Props
 */
interface SocketProviderProps {
  children: ReactNode;
}

/**
 * Mock WebSocket URL from environment
 * TODO: Replace with actual WebSocket server URL when backend is ready
 */
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'ws://localhost:8080';

/**
 * Reconnection configuration
 */
const RECONNECT_DELAY = 3000; // 3 seconds
const MAX_RECONNECT_ATTEMPTS = 5;

/**
 * Mock feedback messages for demonstration
 * TODO: Remove when backend WebSocket is integrated
 */
const MOCK_FEEDBACK: FeedbackPayload[] = [
  {
    type: 'PACE',
    message: 'Speaking pace is good',
    severity: 'LOW',
    timestamp: Date.now(),
  },
  {
    type: 'FILLER',
    message: 'Try to reduce filler words like "um" and "uh"',
    severity: 'MEDIUM',
    timestamp: Date.now(),
  },
  {
    type: 'CONFIDENCE',
    message: 'Strong confident delivery',
    severity: 'LOW',
    timestamp: Date.now(),
  },
  {
    type: 'RELEVANCE',
    message: 'Stay focused on the question',
    severity: 'HIGH',
    timestamp: Date.now(),
  },
];

/**
 * SocketProvider Component
 * Manages WebSocket connection lifecycle and state
 */
export function SocketProvider({ children }: SocketProviderProps): JSX.Element {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [latestFeedback, setLatestFeedback] = useState<FeedbackPayload | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef<number>(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mockIntervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Clear reconnection timeout
   */
  const clearReconnectTimeout = (): void => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };

  /**
   * Clear mock feedback interval
   */
  const clearMockInterval = (): void => {
    if (mockIntervalRef.current) {
      clearInterval(mockIntervalRef.current);
      mockIntervalRef.current = null;
    }
  };

  /**
   * Start mock feedback simulation
   * TODO: Remove when backend WebSocket is integrated
   */
  const startMockFeedback = (): void => {
    clearMockInterval();
    
    mockIntervalRef.current = setInterval(() => {
      const randomFeedback = MOCK_FEEDBACK[
        Math.floor(Math.random() * MOCK_FEEDBACK.length)
      ];
      
      setLatestFeedback({
        ...randomFeedback,
        timestamp: Date.now(),
      });
    }, 5000);
  };

  /**
   * Handle WebSocket connection
   */
  const handleConnect = (): void => {
    // Prevent multiple connections
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      // TODO: Replace with actual WebSocket connection when backend is ready
      // For now, simulate connection with mock data
      console.log('Connecting to WebSocket:', SOCKET_URL);
      
      // Simulate successful connection
      setIsConnected(true);
      reconnectAttemptsRef.current = 0;
      startMockFeedback();

      // Uncomment when backend is ready:
      /*
      const socket = new WebSocket(SOCKET_URL);

      socket.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        reconnectAttemptsRef.current = 0;
        clearReconnectTimeout();
      };

      socket.onmessage = (event: MessageEvent) => {
        try {
          const message: SocketMessage = JSON.parse(event.data);
          
          if (message.event === 'feedback' && message.payload) {
            setLatestFeedback(message.payload);
          }
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      socket.onerror = (error: Event) => {
        console.error('WebSocket error:', error);
      };

      socket.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        socketRef.current = null;
        handleReconnect();
      };

      socketRef.current = socket;
      */
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
      handleReconnect();
    }
  };

  /**
   * Handle WebSocket disconnection
   */
  const handleDisconnect = (): void => {
    clearReconnectTimeout();
    clearMockInterval();

    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }

    setIsConnected(false);
    setLatestFeedback(null);
    reconnectAttemptsRef.current = 0;
  };

  /**
   * Handle reconnection with exponential backoff
   */
  const handleReconnect = (): void => {
    if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
      console.error('Max reconnection attempts reached');
      return;
    }

    clearReconnectTimeout();

    reconnectTimeoutRef.current = setTimeout(() => {
      reconnectAttemptsRef.current += 1;
      console.log(
        `Reconnecting... Attempt ${reconnectAttemptsRef.current}/${MAX_RECONNECT_ATTEMPTS}`
      );
      handleConnect();
    }, RECONNECT_DELAY * reconnectAttemptsRef.current);
  };

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      handleDisconnect();
    };
  }, []);

  const value: SocketContextValue = {
    isConnected,
    latestFeedback,
    connect: handleConnect,
    disconnect: handleDisconnect,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}

/**
 * Custom hook to use Socket context
 * @throws Error if used outside SocketProvider
 */
export function useSocket(): SocketContextValue {
  const context = useContext(SocketContext);

  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }

  return context;
}