import { useEffect, useRef, useState } from 'react';

export function useAudio(audioSrc: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Load new audio when src changes
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc);
    } else {
      audioRef.current.pause();
      audioRef.current = new Audio(audioSrc);
    }

    // Don't auto-play - wait for user interaction
    // audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);

    return () => {
      audioRef.current?.pause();
    };
  }, [audioSrc]);

  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Audio playback failed:', error);
      // If play fails, we can show a message to the user or handle it gracefully
    }
  };

  return {
    isPlaying,
    togglePlayPause,
  };
}
