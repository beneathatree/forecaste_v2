"use client";

import { useRouter } from "next/navigation";
import { goBack } from "../components/functions/goBack";
import { SceneTemplate, type Action } from "../components/page-templates";

export default function Home() {
    const router = useRouter();
    const actions: Action[] = [
        {
            text: "Rising pressure",
            variant: "positive",
            onClick: () => {
                router.push("/rising-pressure");
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
            text="You have connected, and developed a friendship/small group of friends with other marginalized students and mentors. You feel relief, trust, although you have a little cautious optimism. You get introduced to velivada circle. Relationship system begins - you get mental health boost."
            actions={actions}
        ></SceneTemplate>
    );
}
