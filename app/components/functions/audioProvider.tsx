'use client';

import { useRouteAudio } from '../hooks/useRouteAudio';

export default function RouteAudioProvider() {
  useRouteAudio();
  return null;
}