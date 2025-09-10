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
                You open a text document, and draft a blog post. Now, the words don&#39;t seem to be frozen.
                You write about shame. About silence. How you&#39;re missing home. And how this is not new. How exhausted you feel pretending it doesn&#39;t hurt.
                You post anonymously. It receives one like. And then two more. Acouple of comments.
                &quot;This is important, please read.&quot;
                &quot;Another crybaby.&quot;
                You feel seen, but not entirely safe.
            </p>
            <ul className="w-full flex flex-col gap-2 mt-2 items-start" id="possible-actions">
                <li><BasicButton href="/reflection-and-response" id="reflection-btn" text="Reflection and response." className="hover:bg-gray-800"/></li>
                <li><BasicButton href="/" id="reset-btn" text="Reset Game" className="hover:bg-red-500"/></li>
            </ul>
      </div>
    </>
  );
}
