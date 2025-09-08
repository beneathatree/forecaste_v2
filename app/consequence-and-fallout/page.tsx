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
                The admin has called a meeting. A circular goes out calling your protest unautorized activity. Some mentors warn you for you being watched, and to be careful.
                Your scholarship goes under review for unknown reasons. Vut the velivada circle anyway has grown louder, stronger. 
                The hostel repainted, the walls are new too. The professor still teaches - still says things that twist in your gut. No one brings up what happened. Not even you.
                One night, you overhear someone talking about 'that reservation kid who overreacted on an anonymous blog'. Your name isn't said.
                You get your grades back. Decent but hollow. You haven't interacted with any new people. You stopped writing blogs.
            </p>
            <ul className="w-full flex flex-col gap-2 mt-2 items-start" id="possible-actions">
                <li><BasicButton href="/internal-growth" id="growth-btn" text="Internal growth." className="hover:bg-gray-800"/></li>
                <li><BasicButton href="/" id="reset-btn" text="Reset Game" className="hover:bg-red-500"/></li>
            </ul>
      </div>
    </div>
    </>
  );
}
