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
            text="You walk across the stage at convocation. No claps. No proud family photo. Just the quiet ache of survival. You leave people who learned to speak because you once did. The game ends here, the journey does not. If you'd like to play again:"
            actions={actions}
        ></SceneTemplate>
    );
}
