"use client"

import BasicButton from "../components/functions/basicButton";
import Clouds from "../components/svg/unused/clouds";
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
                A few days later, a momment says,
                &quot;Thank you for Writing this. I&#39;ve been holding this in for so long.&quot;
                Another message says
                &quot;Do you want to join our reading circle?&quot;
                You feel a shift. Not loud, but real. Someone sees you. 
                Someone has been there too. You sit with this feeling: not just rage now, but recognition.
            </p>
            <ul className="w-full flex flex-col gap-2 mt-2 items-start" id="possible-actions">
                <li><BasicButton href="/mobilization" id="mobilize-btn" text="Mobilize." className="hover:bg-gray-800"/></li>
            </ul>
      </div>
    </>
  );
}
