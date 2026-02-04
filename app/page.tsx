"use client";

import { useState } from "react";
import TypingText from "./components/functions/typingText";

export default function Home() {
    const [typingComplete, setTypingComplete] = useState(false);

    const handleTypingComplete = () => {
        setTimeout(() => setTypingComplete(true), 700);
    };

    return (
        <div className="h-screen bg-white flex items-center justify-center relative">
            <div
                className={`transition-transform duration-700 ease-out ${
                    typingComplete ? "-translate-y-16" : "translate-y-0"
                }`}
            >
                <TypingText
                    text="Forecaste"
                    className="text-8xl font-bold"
                    speed={15}
                    onComplete={handleTypingComplete}
                />
            </div>
            <div
                className={`absolute top-1/2 mt-8 max-w-3xl text-center px-8 transition-all duration-700 ${
                    typingComplete
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                }`}
            >
                {typingComplete && (
                    <TypingText
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                        speed={25}
                    />
                )}
            </div>
        </div>
    );
}
