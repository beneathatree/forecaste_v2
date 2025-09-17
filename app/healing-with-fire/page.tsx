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
                You decline the invitation to speak, instead you write something quietly, and publish on your anonymous blog.
                You cook with your friends. You laugh again - you walk past the admin building, it no longer feels like a fortress. 
                You didn&#39;t change the system. But just your story.
                That&#39;s not a small thing.
            </p>
            <ul className="w-full flex flex-col gap-2 mt-2 items-start" id="possible-actions">
            </ul>
      </div>
    </>
  );
}
