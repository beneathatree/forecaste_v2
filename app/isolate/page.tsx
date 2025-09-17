"use client"

import BasicButton from "../components/functions/basicButton";
import Clouds from "../components/svg/clouds";

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
                You have withdrawn, keeping to yourself, avoiding interactions beyond necessity. 
                Attempts to connect have felt disheartening, or you chose silence over the risk of being misunderstood. 
                You feel adrift, tired, uncertain. your trust in others is brittle. 
                You sit alone in the library or skip the mess.
            </p>
            <ul className="w-full flex flex-col gap-2 mt-2 items-start" id="possible-actions">
                <li><BasicButton href="/rising-pressure" id="pressure-btn" text="Rising pressure" className="hover:bg-gray-800"/></li>
            </ul>
      </div>
    </>
  );
}
