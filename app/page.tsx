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

//gsap animation on click of #start-btn:
function startGame() {
    gsap.to("#leftGate", {
      duration: 1.2,
      scaleX: 0.1,
      skewY: -20,
      opacity: 0.4,
      ease: "power2.out",
    })

    gsap.to("#rightGate", {
      duration: 1.2,
      scaleX: 0.1,
      skewY: 20,
      opacity: 0.4,
      ease: "power2.out",
//      onComplete: () => {
//      gameStart()
//      }
    })
}

export default function Home() {
  return (
    <>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <link rel="stylesheet" href="styles.css"/>
    </Head>
    <div id="app">
      <h1 id="title">forecaste</h1>
      <div id="gameContainer">
        <Clouds/>
        <College/>
        <LeftWall/>
        <RightWall/>
        <Floor/>
        <LeftGate/>
        <RightGate/>
        <Human/>
      </div>
      <div id="viewport">
        <button id="start-btn" onClick={startGame}>Start!</button>
      </div>
    </div>
    </>
  );
}
