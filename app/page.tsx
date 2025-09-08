"use client"

import Head from "next/head";
import Clouds from "./components/svg/clouds";
import College from "./components/svg/college";
import LeftWall from "./components/svg/leftWall";
import RightWall from "./components/svg/rightWall";
import Floor from "./components/svg/floor";
import LeftGate from "./components/svg/leftGate";
import RightGate from "./components/svg/rightGate";
import Human from "./components/svg/human";
import { gateOpen } from "./components/functions/gateOpen";
import { resetGame } from "./components/functions/resetGame";

//gsap animation on click of #start-btn:
const startGame = () => {
  gateOpen()
}

export default function Home() {
  return (
    <>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </Head>
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
        <College className="absolute top-[280.654px] left-[82.166px] right-[83.952px]"/>
        <LeftWall className="absolute top-[-2px] left-[-2px] z-10"/>
        <RightWall className="absolute top-[-2px] right-[-2px] z-10"/>
        <Floor className="absolute bottom-[-10px] left-[-5%]"/>
        <LeftGate className="absolute left-[65.910px] top-[55.317px] origin-bottom-left"/>
        <RightGate className="absolute top-[55.317px] right-[70.726px] origin-bottom-right"/>
        <Human className="absolute z-20 bottom-0 right-[152.923px] left-[120px]"/>
      </div>
      <div 
        className="z-[30] h-[650px] w-full flex items-center justify-center relative"
        id="viewport">
        <div id="buttonContainer"
          className="flex flex-row gap-3">
          <button 
            className="z-30 font-sans text-lg pt-1 pb-1 pr-2 pl-2 bg-black text-white rounded-md"
            id="start-btn" 
            onClick={startGame}>Start!
          </button>
          <button 
            className="z-30 font-sans text-lg pt-1 pb -1 pr-2 pl-2 bg-black text-white rounded-md"
            id="start-btn" 
            onClick={resetGame}>Reset
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
