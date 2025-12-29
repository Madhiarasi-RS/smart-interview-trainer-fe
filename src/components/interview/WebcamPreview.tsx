'use client';

import { useEffect, useRef, useState, JSX } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import {
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
} from '@mui/icons-material';

/**
 * WebcamPreview Props
 */
interface WebcamPreviewProps {
  isEnabled?: boolean;
  className?: string;
}

/**
 * Camera state types
 */
type CameraState = 'loading' | 'ready' | 'permission-denied' | 'error';

/**
 * WebcamPreview Component
 * Professional webcam preview wrapper with state management
 */
export default function WebcamPreview({
  isEnabled = true,
  className = '',
}: WebcamPreviewProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraState, setCameraState] = useState<CameraState>('loading');
  const [streamRef, setStreamRef] = useState<MediaStream | null>(null);

  /**
   * Initialize webcam access
   */
  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const initCamera = async (): Promise<void> => {
      try {
        setCameraState('loading');
        
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720, facingMode: 'user' },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreamRef(stream);
          setCameraState('ready');
        }
      } catch (error) {
        console.error('Camera access error:', error);
        
        if (error instanceof Error && error.name === 'NotAllowedError') {
          setCameraState('permission-denied');
        } else {
          setCameraState('error');
        }
      }
    };

    initCamera();

    // Cleanup on unmount or when disabled
    return () => {
      if (streamRef) {
        streamRef.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isEnabled, streamRef]);

  /**
   * Stop camera when disabled
   */
  useEffect(() => {
    if (!isEnabled && streamRef) {
      streamRef.getTracks().forEach((track) => track.stop());
      setStreamRef(null);
      setCameraState('loading');
    }
  }, [isEnabled, streamRef]);

  return (
    <Box className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      {/* Loading State */}
      {cameraState === 'loading' && (
        <Box className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
          <CircularProgress size={40} className="mb-4 text-blue-500" />
          <Typography variant="body2" className="text-gray-400">
            Initializing camera...
          </Typography>
        </Box>
      )}

      {/* Permission Denied State */}
      {cameraState === 'permission-denied' && (
        <Box className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 p-6 text-center">
          <VideocamOffIcon className="text-6xl text-red-400 mb-4" />
          <Typography variant="h6" className="text-white mb-2">
            Camera Access Denied
          </Typography>
          <Typography variant="body2" className="text-gray-400">
            Please allow camera access in your browser settings to continue
          </Typography>
        </Box>
      )}

      {/* Error State */}
      {cameraState === 'error' && (
        <Box className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 p-6 text-center">
          <VideocamOffIcon className="text-6xl text-yellow-400 mb-4" />
          <Typography variant="h6" className="text-white mb-2">
            Camera Unavailable
          </Typography>
          <Typography variant="body2" className="text-gray-400">
            Unable to access camera. Please check your device settings.
          </Typography>
        </Box>
      )}

      {/* Video Element */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover ${
          cameraState === 'ready' ? 'block' : 'hidden'
        }`}
      />

      {/* Recording Indicator (when enabled and ready) */}
      {isEnabled && cameraState === 'ready' && (
        <Box className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full shadow-lg">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <Typography variant="caption" className="font-semibold text-white">
            Recording
          </Typography>
        </Box>
      )}

      {/* Camera Disabled Overlay */}
      {!isEnabled && (
        <Box className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
          <VideocamIcon className="text-6xl text-gray-600 mb-4" />
          <Typography variant="body2" className="text-gray-500">
            Camera Disabled
          </Typography>
        </Box>
      )}
    </Box>
  );
}
