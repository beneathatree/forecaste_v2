"use client";

import type React from "react";
import ActionButton from "../actionButton";
import type { Action } from "./types";

type SceneTemplateProps = {
    text: string;
    actions: Action[];
    children?: React.ReactNode;
    className?: string;
};

export default function SceneTemplate({
    text,
    actions,
    children,
    className = "",
}: SceneTemplateProps) {
    return (
        <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
            <div
                id="graphics-text-and-animations"
                className="absolute inset-0 overflow-hidden"
            >
                {children}
            </div>
            <div
                className={`z-[30] relative flex h-full w-full flex-col items-center justify-center p-5 text-center ${className}`}
                id="buttons-text-and-interactivity"
            >
                <p className="max-w-3xl">{text}</p>
                <ul
                    className="mt-2 flex w-full flex-row items-center justify-center gap-2"
                    id="possible-actions"
                >
                    {actions.map((action, index) => (
                        <li key={index}>
                            <ActionButton
                                variant={action.variant}
                                text={action.text}
                                onClick={action.onClick}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
