"use client";

import { useRouter } from "next/navigation";
import { goBack } from "../components/functions/goBack";
import { SceneTemplate, type Action } from "../components/page-templates";

export default function Home() {
    const router = useRouter();
    const actions: Action[] = [
        {
            text: "Reflection and response.",
            variant: "positive",
            onClick: () => {
                router.push("/reflection-and-response");
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
            text={`You open a text document and draft a blog post. Now, the words don't seem to be frozen. You write about shame. About silence. How you're missing home. And how this is not new. How exhausted you feel pretending it doesn't hurt. You post anonymously. It receives one like. And then two more. A couple of comments. "This is important, please read." "Another crybaby." You feel seen, but not entirely safe.`}
            actions={actions}
        ></SceneTemplate>
    );
}
