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
        <>
            <div
                id="graphics-text-and-animations"
                className="absolute top-0 bottom-0 right-0 left-0 overflow-hidden"
            >
                {children}
            </div>
            <div
                className={`z-[30] h-[650px] w-full flex flex-col items-start pb-3 justify-center relative p-5 ${className}`}
                id="buttons-text-and-interactivity"
            >
                <p>{text}</p>
                <ul
                    className="w-full flex flex-col gap-2 mt-2 items-start"
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
        </>
    );
}
