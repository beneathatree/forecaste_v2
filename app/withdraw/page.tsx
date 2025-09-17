"use client"

import BasicButton from "../components/functions/basicButton";
import Clouds from "../components/svg/clouds";
//import Link from "next/link";

export default function Home() {
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
                You say nothing. You do nothing. 
                You quietly log out of class, ignore the messages, skip the next few lectures.
                You rehearse responses in your head at night, but speak none of them out loud.
                You drift from your friends. Your assignments first started coming late. Later, not at all.
            </p>
            <ul className="w-full flex flex-col gap-2 mt-2 items-start" id="possible-actions">
                <li><BasicButton href="/consequence-and-fallout" id="consequence-fallout-btn" text="Consequence and fallout." className="hover:bg-gray-800"/></li>
            </ul>
      </div>
    </>
  );
}
