'use client';

import { usePathname } from 'next/navigation';
import { useAudio } from '../hooks/useAudio';
import { useMemo } from 'react';
import BasicButton from './basicButton';

export default function AudioManager() {
  const pathname = usePathname();

  // Change audio source based on route
  const audioSrc = useMemo(() => {
    switch (pathname) {
      case '/':
        return '/audio/home.mp3';
      case '/about':
        return '/audio/about.mp3';
      case '/contact':
        return '/audio/contact.mp3';
      default:
        return '/audio/default.mp3';
    }
  }, [pathname]);

  const { isPlaying, togglePlayPause } = useAudio(audioSrc);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <BasicButton
        onClick={togglePlayPause}
        className={`${isPlaying ? 'bg-red-500' : 'bg-green-500'}`}
        text={isPlaying ? 'Pause' : 'Play'}
      />
    </div>
  );
}
