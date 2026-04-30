"use client";

import { useState } from "react";
import TypingText from "./components/functions/typingText";
import Character1 from "./components/svg/v3/Character1";
import Character2 from "./components/svg/v3/Character2";
import Character3 from "./components/svg/v3/Character3";
import Character4 from "./components/svg/v3/Character4";
import ActionButton from "./components/actionButton";

export default function Home() {
    const [typingComplete, setTypingComplete] = useState(false);
    const [bodyTypingComplete, setBodyTypingComplete] = useState(false);
    const [showCharacters, setShowCharacters] = useState(false);

    const handleTypingComplete = () => {
        setTimeout(() => setTypingComplete(true), 700);
    };

    const handleBodyTypingComplete = () => {
        setTimeout(() => {
            setBodyTypingComplete(true);
            setTimeout(() => setShowCharacters(true), 700);
        }, 1000);
    };

    return (
        <div className="h-screen bg-white flex items-center justify-center relative overflow-hidden">
            <div
                className={`transition-transform ease-out ${
                    showCharacters
                        ? "-translate-y-48 duration-1000"
                        : typingComplete
                        ? "-translate-y-16 duration-700"
                        : "translate-y-0 duration-700"
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
                    typingComplete && !bodyTypingComplete
                        ? "opacity-100 translate-y-0"
                        : bodyTypingComplete
                        ? "opacity-0 -translate-y-4"
                        : "opacity-0 translate-y-4"
                }`}
            >
                {typingComplete && (
                    <TypingText
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                        speed={25}
                        onComplete={handleBodyTypingComplete}
                    />
                )}
            </div>

            {/* Characters */}
            <div
                className={`absolute bottom-[20px] left-0 right-0 flex justify-center items-end gap-4 transition-transform duration-1000 ease-out pt-10 ${
                    showCharacters ? "translate-y-0" : "translate-y-full"
                }`}
            >
                <div className="h-48 md:h-135 ml-10">
                    <Character1 />
                </div>
                <div className="h-48 md:h-119">
                    <Character2 />
                </div>
                <div className="h-48 md:h-137">
                    <Character3 />
                </div>
                <div className="h-48 md:h-130">
                    <Character4 />
                </div>
            </div>

            {/* buttons */}
            <div className="absolute bottom-20 left-0 right-0 flex justify-center items-center flex-row gap-4">
                <ActionButton variant="positive" text="Start Game" />
                <ActionButton variant="neutral" text="About" />
            </div>
        </div>
    );
}
