"use client";

import { useRouter } from "next/navigation";
import { goBack } from "../components/functions/goBack";
import { SceneTemplate, type Action } from "../components/page-templates";

export default function Home() {
    const router = useRouter();
    const actions: Action[] = [
        {
            text: "Mobilize.",
            variant: "positive",
            onClick: () => {
                router.push("/mobilization");
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
            text={`A few days later, a comment says, "Thank you for writing this. I've been holding this in for so long." Another message says, "Do you want to join our reading circle?" You feel a shift. Not loud, but real. Someone sees you. Someone has been there too. You sit with this feeling: not just rage now, but recognition.`}
            actions={actions}
        ></SceneTemplate>
    );
}
