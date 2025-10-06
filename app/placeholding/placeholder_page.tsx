"use client"

import Clouds from "../components/svg/unused/clouds";
import College from "../components/svg/unused/college";
import LeftWall from "../components/svg/unused/leftWall";
import RightWall from "../components/svg/unused/rightWall";
import Floor from "../components/svg/unused/floor";
import LeftGate from "../components/svg/unused/leftGate";
import RightGate from "../components/svg/unused/rightGate";
import Human from "../components/svg/unused/human";
import { gateOpen } from "../components/functions/gateOpen";
import { resetGame } from "../components/functions/resetGame";
import BasicButton from "../components/functions/basicButton";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const startGame = async () => {
    await gateOpen();
    router.push("/adjustment");
  };

  return (
    <>
      <div 
        id="graphics-text-and-animations" 
        className="absolute top-0 bottom-0 right-0 left-0 overflow-hidden ">
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
        className="z-[30] h-full w-full flex items-end pb-3 justify-center relative"
        id="buttons-text-and-interactivity">
        <div id="buttonContainer"
          className="flex flex-row gap-3">
          <BasicButton id="start-btn" text="Start!" onClick={startGame} className="hover:bg-gray-800"/>
        </div>
      </div>
    </>
  );
}
