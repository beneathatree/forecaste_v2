"use client";

import { SceneTemplate, type Action } from "../components/page-templates";
import Character1 from "../components/svg/v3/Character1";
import Character2 from "../components/svg/v3/Character2";
import Character3 from "../components/svg/v3/Character3";
import Character4 from "../components/svg/v3/Character4";

export default function Arrival() {
    const actions: Action[] = [
        {
            text: "Adjust to the new environment",
            variant: "positive",
            onClick: () => {
                // TODO: navigate to next scene
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
