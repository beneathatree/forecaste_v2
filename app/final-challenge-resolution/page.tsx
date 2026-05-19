"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { goBack } from "../components/functions/goBack";
import { SceneTemplate, type Action } from "../components/page-templates";

type IncidentChoice = "withdraw" | "organize" | "write";

const branchActionMap: Record<
    IncidentChoice,
    { text: string; href: string }
> = {
    withdraw: { text: "Exit wound.", href: "/exit-wound" },
    organize: {
        text: "Organize and mobilize.",
        href: "/organize-and-mobilize",
    },
    write: { text: "Scorched but standing.", href: "/scorched-but-standing" },
};

function isIncidentChoice(choice: string | null): choice is IncidentChoice {
    return choice === "withdraw" || choice === "organize" || choice === "write";
}

export default function Home() {
    const router = useRouter();
    const [choice, setChoice] = useState<string | null>(null);

    useEffect(() => {
        const storedChoice = localStorage.getItem("incitingIncidentChoice");
        setChoice(storedChoice);
    }, []);

    const actions: Action[] = [];
    if (isIncidentChoice(choice)) {
        const selectedAction = branchActionMap[choice];
        actions.push({
            text: selectedAction.text,
            variant: "positive",
            onClick: () => {
                router.push(selectedAction.href);
            },
        });
    } else {
        actions.push(
            {
                text: branchActionMap.organize.text,
                variant: "positive",
                onClick: () => {
                    router.push(branchActionMap.organize.href);
                },
            },
            {
                text: branchActionMap.withdraw.text,
                variant: "positive",
                onClick: () => {
                    router.push(branchActionMap.withdraw.href);
                },
            },
            {
                text: branchActionMap.write.text,
                variant: "positive",
                onClick: () => {
                    router.push(branchActionMap.write.href);
                },
            },
        );
    }
    actions.push({
        text: "Go back",
        variant: "negative",
        onClick: () => {
            goBack(router);
        },
    });

    return (
        <SceneTemplate
            text="The semester ends. The protests fade. The slur on the wall is long gone, painted over. But you remember it every time you walk past that wall in the hostel. Your story hasn't made the news. No documentary crews. No hashtags."
            actions={actions}
        ></SceneTemplate>
    );
}
