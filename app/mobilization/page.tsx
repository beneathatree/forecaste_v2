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
                You stand in a packed room. some are seated on the floor. Others leaning on walls. The air is thick with frustration, grief and resolve.
                A senior from the Velivada Circle says:
                &quot;They want us divided and afraid. So what do we do next?&quot;
                some responses are:
                &quot;Sit-in outside the admin block.&quot;
                &quot;Compromise, call for testimony.&quot;
                &quot;Open reading circle event, in public and without permission.&quot;
                &quot;Art installation with names&quot;
                You realize you are no longer just a part, or a trigger.
            </p>
            <ul className="w-full flex flex-col gap-2 mt-2 items-start" id="possible-actions">
                <li><BasicButton href="/consequence-and-fallout" id="consequence-btn" text="Consequence and fallout." className="hover:bg-gray-800"/></li>
            </ul>
      </div>
    </>
  );
}
