'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { tribalSoundscape } from '@/utils/audioSynth';

interface AudioTrack {
  id: string;
  title: string;
  artisanName: string;
  village: string;
  loreText: string;
  olChikiSnippet?: string;
  duration: string;
}

interface AudioContextType {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  progress: number;
  playTrack: (track: AudioTrack) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  stopTrack: () => void;
  toggleAmbientSound: () => boolean;
  isAmbientPlaying: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            tribalSoundscape.stop();
            setIsAmbientPlaying(false);
            return 0;
          }
          return prev + 1.2;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const playTrack = (track: AudioTrack) => {
    setCurrentTrack(track);
    setProgress(0);
    setIsPlaying(true);
    tribalSoundscape.start();
    setIsAmbientPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
    tribalSoundscape.stop();
    setIsAmbientPlaying(false);
  };

  const resumeTrack = () => {
    if (currentTrack) {
      setIsPlaying(true);
      tribalSoundscape.start();
      setIsAmbientPlaying(true);
    }
  };

  const stopTrack = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTrack(null);
    tribalSoundscape.stop();
    setIsAmbientPlaying(false);
  };

  const toggleAmbientSound = () => {
    const running = tribalSoundscape.toggle();
    setIsAmbientPlaying(running);
    return running;
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        playTrack,
        pauseTrack,
        resumeTrack,
        stopTrack,
        toggleAmbientSound,
        isAmbientPlaying,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
