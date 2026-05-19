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
            text="You take a breath and a walk. And then, you text Velivada Circle. By evening, you're in a crowded room of voices: some are trembling, some are raging strongly. One of the students shouts, 'Enough is enough.' A statement is drafted. A social media campaign is started. You are very scared. But you are not alone."
            actions={actions}
        ></SceneTemplate>
    );
}
