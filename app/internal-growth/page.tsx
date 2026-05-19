"use client";

import { useRouter } from "next/navigation";
import { goBack } from "../components/functions/goBack";
import { SceneTemplate, type Action } from "../components/page-templates";

export default function Home() {
    const router = useRouter();
    const actions: Action[] = [
        {
            text: "Final challenge resolution.",
            variant: "positive",
            onClick: () => {
                router.push("/final-challenge-resolution");
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
            text="Your body is tired. But one day you pick up a book you left halfway. Another day, you respond to that unread message. You start writing poetry again."
            actions={actions}
        ></SceneTemplate>
    );
}
