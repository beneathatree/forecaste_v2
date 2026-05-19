"use client";

import { useRouter } from "next/navigation";
import { goBack } from "../components/functions/goBack";
import { SceneTemplate, type Action } from "../components/page-templates";

export default function Arrival() {
    const router = useRouter();
    const actions: Action[] = [
        {
            text: "Adjust to the new environment",
            variant: "positive",
            onClick: () => {
                router.push("/adjustment");
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
            text="You have just arrived at a new premier institution. You are proud of your achievements, are also in awe of your surroundings and your peers. "
            actions={actions}
        ></SceneTemplate>
    );
}
