"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
    ANIMATION_SPEED_MULTIPLIERS,
    ANIMATION_SPEED_STORAGE_KEY,
    AnimationSpeed,
    DEFAULT_ANIMATION_SPEED,
    isAnimationSpeed,
} from "./animationSpeed";

type Settings = {
    animationSpeed: AnimationSpeed;
    setAnimationSpeed: (speed: AnimationSpeed) => void;
    /** Duration multiplier for the current speed. Higher is slower. */
    animationMultiplier: number;
};

const SettingsContext = createContext<Settings>({
    animationSpeed: DEFAULT_ANIMATION_SPEED,
    setAnimationSpeed: () => {},
    animationMultiplier: ANIMATION_SPEED_MULTIPLIERS[DEFAULT_ANIMATION_SPEED],
});

export function useSettings() {
    return useContext(SettingsContext);
}

export default function SettingsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    // Always start on the default so server and client render the same markup.
    // The stored value is picked up after mount.
    const [animationSpeed, setAnimationSpeed] = useState<AnimationSpeed>(
        DEFAULT_ANIMATION_SPEED,
    );
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(ANIMATION_SPEED_STORAGE_KEY);
            if (isAnimationSpeed(stored)) setAnimationSpeed(stored);
        } catch {
            // Storage can be unavailable (private browsing); fall back to default.
        }
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (!hydrated) return; // don't write the default back before reading
        try {
            localStorage.setItem(ANIMATION_SPEED_STORAGE_KEY, animationSpeed);
        } catch {
            // Ignore — the setting still applies for this session.
        }
    }, [animationSpeed, hydrated]);

    return (
        <SettingsContext.Provider
            value={{
                animationSpeed,
                setAnimationSpeed,
                animationMultiplier:
                    ANIMATION_SPEED_MULTIPLIERS[animationSpeed],
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}
