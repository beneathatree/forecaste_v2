"use client"

import Head from "next/head";
import { gsap } from "gsap";
import Clouds from "./components/svg/clouds";
import College from "./components/svg/college";
import LeftWall from "./components/svg/leftWall";
import RightWall from "./components/svg/rightWall";
import Floor from "./components/svg/floor";
import LeftGate from "./components/svg/leftGate";
import RightGate from "./components/svg/rightGate";
import Human from "./components/svg/human";
import { gateOpen } from "./components/functions/gateOpen";

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
    <div id="app">
      <h1 id="title">forecaste</h1>
      <div id="gameContainer">
        <Clouds className="absolute top-[50px] left-[40px] right-[30px]"/>
        <College className="absolute top-[280.654px] left-[82.166px] right-[83.952px]"/>
        <LeftWall className="absolute top-[-2px] left-[-2px] z-10"/>
        <RightWall className="absolute top-[-2px] right-[-2px] z-10"/>
        <Floor className="absolute bottom-[-10px] left-[-5%]"/>
        <LeftGate className="absolute left-[65.910px] top-[55.317px] origin-bottom-left"/>
        <RightGate className="absolute top-[55.317px] right-[70.726px] origin-bottom-right"/>
        <Human className="absolute z-20 bottom-0 right-[152.923px] left-[120px]"/>
      </div>
      <div id="viewport">
        <button id="start-btn" onClick={startGame}>Start!</button>
      </div>
    </div>
    </>
  );
}
