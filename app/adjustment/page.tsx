"use client";

import { useRouter } from "next/navigation";
import { goBack } from "../components/functions/goBack";
import Dropdown from "../components/functions/dropdown";
import { SceneTemplate, type Action } from "../components/page-templates";

export default function Home() {
    const router = useRouter();

    function handleCoinFlip() {
        const result = Math.random() > 0.6;
        if (result) {
            router.push("/isolate?from=small-bonds");
        } else {
            router.push("/small-bonds");
        }
    }

    const actions: Action[] = [
        {
            text: "Form small bonds.",
            variant: "positive",
            onClick: handleCoinFlip,
        },
        {
            text: "Isolate yourselves.",
            variant: "positive",
            onClick: () => {
                router.push("/isolate");
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
            text="You are also in confusion and are going through a lot of cultural shocks. You have been facing microaggressions, othering and subtle casteism. What do you do?"
            actions={actions}
        ></SceneTemplate>
    );
}
