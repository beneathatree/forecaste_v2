"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    ANIMATION_SPEEDS,
    ANIMATION_SPEED_LABELS,
    AnimationSpeed,
} from "./animationSpeed";
import { useSettings } from "./SettingsProvider";
import { playClickSound } from "../functions/clickSound";

const PANEL_ID = "settings-panel";

export default function SettingsMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const close = (returnFocus = false) => {
        setIsOpen(false);
        if (returnFocus) triggerRef.current?.focus();
    };

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") close(true);
        };
        const handlePointerDown = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) close();
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("pointerdown", handlePointerDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("pointerdown", handlePointerDown);
        };
    }, [isOpen]);

    return (
        <div
            ref={rootRef}
            className="fixed right-4 top-4 z-50 inline-block text-left"
        >
            <button
                ref={triggerRef}
                onClick={() => {
                    playClickSound();
                    setIsOpen((open) => !open);
                }}
                aria-label="Settings"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                aria-controls={PANEL_ID}
                className={`btn-emboss inline-flex cursor-pointer select-none justify-center border-none p-2 text-[#d0e0ff] transition-[transform] duration-[50ms] ease-in-out active:translate-y-[5px] ${
                    isOpen ? "bg-[#22478f]" : "bg-[#1a3a7a] hover:bg-[#22478f]"
                }`}
            >
                <GearIcon
                    className={`h-5 w-5 transition-transform duration-200 ${
                        isOpen ? "rotate-45" : "rotate-0"
                    }`}
                />
            </button>

            {isOpen && (
                <div
                    id={PANEL_ID}
                    role="dialog"
                    aria-label="Settings"
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md border border-white/40 bg-white/50 shadow-lg ring-1 ring-black/10 backdrop-blur-md backdrop-saturate-150"
                >
                    <p className="border-b border-black/10 px-4 pb-2 pt-3 text-xs text-gray-600">
                        Settings
                    </p>
                    <div className="px-4 pb-3 pt-2">
                        <AnimationSpeedControl />
                    </div>
                </div>
            )}
        </div>
    );
}

function AnimationSpeedControl() {
    const { animationSpeed, setAnimationSpeed } = useSettings();

    const index = ANIMATION_SPEEDS.indexOf(animationSpeed);
    const canSlow = index > 0;
    const canFast = index < ANIMATION_SPEEDS.length - 1;

    const step = (delta: number) => {
        const next = ANIMATION_SPEEDS[index + delta] as
            | AnimationSpeed
            | undefined;
        if (next) setAnimationSpeed(next);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
        }
    };

    return (
        <div onKeyDown={handleKeyDown}>
            <p className="text-sm text-gray-700">Animation speed</p>
            <div className="mt-1 flex items-center justify-between">
                <StepperArrow
                    label="Slower"
                    direction="left"
                    disabled={!canSlow}
                    onClick={() => step(-1)}
                />
                <span
                    aria-live="polite"
                    className="min-w-20 text-center text-sm text-blue-500"
                >
                    {ANIMATION_SPEED_LABELS[animationSpeed]}
                </span>
                <StepperArrow
                    label="Faster"
                    direction="right"
                    disabled={!canFast}
                    onClick={() => step(1)}
                />
            </div>
        </div>
    );
}

function StepperArrow({
    label,
    direction,
    disabled,
    onClick,
}: {
    label: string;
    direction: "left" | "right";
    disabled: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            aria-label={label}
            disabled={disabled}
            onClick={onClick}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-gray-700 transition-colors duration-200 hover:bg-black/5 disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent"
        >
            <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={
                        direction === "left"
                            ? "M15 19l-7-7 7-7"
                            : "M9 5l7 7-7 7"
                    }
                />
            </svg>
        </button>
    );
}

function GearIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
        </svg>
    );
}
