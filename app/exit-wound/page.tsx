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
            text="You pack quietly. You leave before the summer ends. You write no letters. You give no speeches. But your blog shows everything. The game ends not in defeat, but in departure. The game ends here, the journey does not. If you'd like to play again:"
            actions={actions}
        ></SceneTemplate>
    );
}
