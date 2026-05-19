"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { goBack } from "../components/functions/goBack";
import { SceneTemplate, type Action } from "../components/page-templates";

function IsolatePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const fromSmallBonds = searchParams.get("from") === "small-bonds";
    const text = fromSmallBonds
        ? "You tried to form small bonds, but fate had other plans. Your attempts to form bonds did not work out well. You have withdrawn, keeping to yourself, avoiding interactions beyond necessity. Attempts to connect have felt disheartening, or you chose silence over the risk of being misunderstood. You feel adrift, tired, uncertain. your trust in others is brittle. You sit alone in the library or skip the mess."
        : "You have withdrawn, keeping to yourself, avoiding interactions beyond necessity. Attempts to connect have felt disheartening, or you chose silence over the risk of being misunderstood. You feel adrift, tired, uncertain. your trust in others is brittle. You sit alone in the library or skip the mess.";

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

    return <SceneTemplate text={text} actions={actions}></SceneTemplate>;
}

export default function Home() {
    return (
        <Suspense fallback={null}>
            <IsolatePage />
        </Suspense>
    );
}
