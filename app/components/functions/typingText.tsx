"use client";

import { ComponentProps } from "react";
import { TypeAnimation } from "react-type-animation";

interface TypingTextProps {
    text: string;
    className?: string;
    speed?: ComponentProps<typeof TypeAnimation>["speed"];
    onComplete?: () => void;
}

export default function TypingText({ text, className, speed = 20, onComplete }: TypingTextProps) {
    const sequence = onComplete ? [text, onComplete] : [text];

    return (
        <TypeAnimation
            sequence={sequence}
            wrapper="span"
            speed={speed}
            cursor={false}
            className={className}
        />
    );
}
