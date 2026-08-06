"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Typing speed constants — tweak these to retune every typing effect in the game. */

/** Default `speed` when a caller doesn't pass one. Higher = faster. */
const DEFAULT_SPEED = 20;
/** Milliseconds spent per character at `speed = 0`. `speed` is subtracted from this. */
const MS_PER_CHAR_AT_ZERO_SPEED = 100;
/** Floor on per-character delay so high speeds stay animated instead of instant. */
const MIN_MS_PER_CHAR = 8;
/** Random per-character variation, as a fraction of the delay (0.5 = ±50%). */
const SPEED_JITTER = 0.5;
/** Pause before the first character appears, in milliseconds. */
const START_DELAY_MS = 0;

interface TypingTextProps {
    text: string;
    className?: string;
    speed?: number;
    onComplete?: () => void;
}

export default function TypingText({
    text,
    className,
    speed = DEFAULT_SPEED,
    onComplete,
}: TypingTextProps) {
    const spanRef = useRef<HTMLSpanElement>(null);
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    useEffect(() => {
        const element = spanRef.current;
        if (!element) return;

        const characters = [...text];
        const msPerChar = Math.max(
            MIN_MS_PER_CHAR,
            MS_PER_CHAR_AT_ZERO_SPEED - speed,
        );

        element.textContent = "";

        const timeline = gsap.timeline({
            delay: START_DELAY_MS / 1000,
            onComplete: () => onCompleteRef.current?.(),
        });

        characters.forEach((_, index) => {
            const jitter = 1 + (Math.random() - 0.5) * SPEED_JITTER * 2;
            timeline.call(
                () => {
                    element.textContent = characters
                        .slice(0, index + 1)
                        .join("");
                },
                undefined,
                `+=${(msPerChar * jitter) / 1000}`,
            );
        });

        return () => {
            timeline.kill();
        };
    }, [text, speed]);

    return <span ref={spanRef} className={className} />;
}
