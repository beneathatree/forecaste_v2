"use client";

import { useRouter } from "next/navigation";
import { SceneTemplate, type Action } from "../components/page-templates";

export default function Home() {
    const router = useRouter();
    const actions: Action[] = [
        {
            text: "Start over",
            variant: "positive",
            onClick: () => {
                router.push("/");
            },
        },
    ];

    return (
        <SceneTemplate
            text="You decline the invitation to speak. Instead, you write something quietly and publish it on your anonymous blog. You cook with your friends. You laugh again. You walk past the admin building; it no longer feels like a fortress. You didn't change the system. But you changed your story. That's not a small thing. The game ends here, the journey does not. If you'd like to play again:"
            actions={actions}
        ></SceneTemplate>
    );
}
