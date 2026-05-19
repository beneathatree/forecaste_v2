"use client";

import { useRouter } from "next/navigation";
import { goBack } from "../components/functions/goBack";
import { SceneTemplate, type Action } from "../components/page-templates";

export default function Home() {
    const router = useRouter();
    const actions: Action[] = [
        {
            text: "Healing with fire.",
            variant: "positive",
            onClick: () => {
                router.push("/healing-with-fire");
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
            text="Your circle has grown into an inter-university alliance. Other campuses write to you. You graduate. Scarred, but unbroken."
            actions={actions}
        ></SceneTemplate>
    );
}
