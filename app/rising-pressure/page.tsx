"use client";

import { useRouter } from "next/navigation";
import { goBack } from "../components/functions/goBack";
import { SceneTemplate, type Action } from "../components/page-templates";

export default function Home() {
    const router = useRouter();
    const actions: Action[] = [
        {
            text: "Inciting incident",
            variant: "positive",
            onClick: () => {
                router.push("/inciting-incident");
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
            text="Deadlines loom. Syllabus piles up. The Classroom feels colder now. You participate less in classes, your questions hang unasked. You're pushing through late nights, but the gaps in guidance and belonging weigh you down. You try to keep up, but it feels like running uphill."
            actions={actions}
        ></SceneTemplate>
    );
}
