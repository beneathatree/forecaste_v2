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
                You walk across the stage at convocation. No claps. 
                No proud family photo. Just the quiet ache of survival.
                You leave people who learned to speak becausse you once did.
            </p>
            <ul className="w-full flex flex-col gap-2 mt-2 items-start" id="possible-actions">
            </ul>
      </div>
    </>
  );
}
