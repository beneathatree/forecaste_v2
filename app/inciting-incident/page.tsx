"use client"

import BasicButton from "../components/functions/basicButton";
import Clouds from "../components/svg/clouds";
//import Link from "next/link";

export default function Home() {
  return (
    <>
    <div 
      id="app" 
      className="w-[400px] flex relative justify-center items-center flex-col bg-white border border-black">
      <h1 
        id="title"
        className="font-sans text-blue-500">forecaste</h1>
      <div 
        id="gameContainer" 
        className="absolute top-0 bottom-0 right-0 left-0 overflow-hidden">
            <Clouds className="absolute top-[50px] left-[40px] right-[30px]"/>
      </div>
      <div 
        className="z-[30] h-[650px] w-full flex flex-col items-start pb-3 justify-center relative p-5"
        id="viewport">
            <p>
                You return to class, sleep deprived, half prepared, holding together the pieces. The professor casually remarks -
                &quot;The culture here is already polluted now. The cost we keep paying for negotiating with merit.&quot;
                People laugh. Applause happens. Some look away. You freeze. The sentence pierces more than it surprises.
                Later, on the hostel wall, someone scribbles a slur. You recognise the target - your roll number. No one speaks of it the next day.
            </p>
            <ul className="w-full flex flex-col gap-2 mt-2 items-start" id="possible-actions">
                <li><BasicButton href="/withdraw" id="withdraw-btn" text="Withdraw." className="hover:bg-gray-800"/></li>
                <li><BasicButton href="/organize" id="organize-btn" text="Organize." className="hover:bg-gray-800"/></li>
                <li><BasicButton href="/write" id="write-btn" text="Write." className="hover:bg-gray-800"/></li>
                <li><BasicButton href="/" id="reset-btn" text="Reset Game" className="hover:bg-red-500"/></li>
            </ul>
      </div>
    </div>
    </>
  );
}
