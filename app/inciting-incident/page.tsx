"use client";

import { useRouter } from "next/navigation";
import { goBack } from "../components/functions/goBack";
import { SceneTemplate, type Action } from "../components/page-templates";
import Clouds from "../components/svg/unused/clouds";

export default function Home() {
    const router = useRouter();

    const handleChoice = (choice: string) => {
        localStorage.setItem("incitingIncidentChoice", choice);
        router.push(`/${choice}`);
    };

    const actions: Action[] = [
        {
            text: "Withdraw.",
            variant: "positive",
            onClick: () => {
                handleChoice("withdraw");
            },
        },
        {
            text: "Organize.",
            variant: "positive",
            onClick: () => {
                handleChoice("organize");
            },
        },
        {
            text: "Write.",
            variant: "positive",
            onClick: () => {
                handleChoice("write");
            },
        },
        {
            text: "Go back",
            variant: "negative",
            onClick: () => {
                goBack(router);
            },
        },
    ];

    return (
        <SceneTemplate
            text='You return to class, sleep deprived, half prepared, holding together the pieces. The professor casually remarks - "The culture here is already polluted now. The cost we keep paying for negotiating with merit." People laugh. Applause happens. Some look away. You freeze. The sentence pierces more than it surprises. Later, on the hostel wall, someone scribbles a slur. You recognise the target - your roll number. No one speaks of it the next day.'
            actions={actions}
        >
            {" "}
        </SceneTemplate>
    );
}
