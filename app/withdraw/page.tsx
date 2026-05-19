"use client";

import { useRouter } from "next/navigation";
import { goBack } from "../components/functions/goBack";
import { SceneTemplate, type Action } from "../components/page-templates";

export default function Home() {
    const router = useRouter();
    const actions: Action[] = [
        {
            text: "Consequence and fallout.",
            variant: "positive",
            onClick: () => {
                router.push("/consequence-and-fallout");
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
            text="You say nothing. You do nothing. You quietly log out of class, ignore the messages, and skip the next few lectures. You rehearse responses in your head at night, but speak none of them out loud. You drift from your friends. Your assignments first started coming late. Later, not at all."
            actions={actions}
        ></SceneTemplate>
    );
}
