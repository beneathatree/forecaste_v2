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
            text={`You stand in a packed room. Some are seated on the floor. Others lean on the walls. The air is thick with frustration, grief, and resolve. A senior from the Velivada Circle says: "They want us divided and afraid. So what do we do next?" Some responses are: "Sit-in outside the admin block." "Compromise, call for testimony." "Open reading circle event, in public and without permission." "Art installation with names." You realize you are no longer just a part, or a trigger.`}
            actions={actions}
        ></SceneTemplate>
    );
}
