"use client"

import BasicButton from "../components/functions/basicButton";
import Clouds from "../components/svg/unused/clouds";
import { useEffect, useState } from "react";

export default function Home() {
  const [choice, setChoice] = useState<string | null>(null);

  useEffect(() => {
    // Get the choice from localStorage
    const storedChoice = localStorage.getItem('incitingIncidentChoice');
    setChoice(storedChoice);
  }, []);

  const renderButtons = () => {
    switch (choice) {
      case 'withdraw':
        return (
          <li><BasicButton href="/exit-wound" id="exit-wound-btn" text="Exit wound." className="hover:bg-gray-800"/></li>
        );
      case 'organize':
        return (
          <li><BasicButton href="/organize-and-mobilize" id="organize-mobilize-btn" text="Organize and mobilize." className="hover:bg-gray-800"/></li>
        );
      case 'write':
        return (
          <li><BasicButton href="/scorched-but-standing" id="scorched-standing-btn" text="Scorched but standing." className="hover:bg-gray-800"/></li>
        );
      default:
        // Fallback to show all buttons if no choice is stored
        return (
          <>
            <li><BasicButton href="/organize-and-mobilize" id="organize-mobilize-btn" text="Organize and mobilize." className="hover:bg-gray-800"/></li>
            <li><BasicButton href="/exit-wound" id="exit-wound-btn" text="Exit wound." className="hover:bg-gray-800"/></li>
            <li><BasicButton href="/scorched-but-standing" id="scorched-standing-btn" text="Scorched but standing." className="hover:bg-gray-800"/></li>
          </>
        );
    }
  };

  return (
    <>
      <div 
        id="graphics-text-and-animations" 
        className="absolute top-0 bottom-0 right-0 left-0 overflow-hidden">
            <Clouds className="absolute top-[50px] left-[40px] right-[30px]"/>
      </div>
      <div 
        className="z-[30] h-[650px] w-full flex flex-col items-start pb-3 justify-center relative p-5"
        id="buttons-text-and-interactivity">
            <p>
                The semester ends.
                The protests fade.
                The slur on the wall is long gone, painted over. But you remember it everytime you walk past that wall in the hostel.
                Your story hasn&#39;t made the news. no documentary crews. No hashtags.
            </p>
            <ul className="w-full flex flex-col gap-2 mt-2 items-start" id="possible-actions">
                {renderButtons()}
            </ul>
      </div>
    </>
  );
}