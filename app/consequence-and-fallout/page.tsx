"use client";

import { useRouter } from "next/navigation";
import { goBack } from "../components/functions/goBack";
import { SceneTemplate, type Action } from "../components/page-templates";

export default function Home() {
    const router = useRouter();
    const actions: Action[] = [
        {
            text: "Internal growth.",
            variant: "positive",
            onClick: () => {
                router.push("/internal-growth");
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
            text="The admin has called a meeting. A circular goes out calling your protest unauthorized activity. Some mentors warn you that you are being watched and to be careful. Your scholarship goes under review for unknown reasons. But the Velivada Circle has grown louder, stronger anyway. The hostel is repainted, the walls are new too. The professor still teaches, still says things that twist in your gut. No one brings up what happened. Not even you. One night, you overhear someone talking about 'that reservation kid who overreacted' on an anonymous blog. Your name isn't said. You get your grades back. Decent but hollow. You haven't interacted with any new people. You stopped writing blogs."
            actions={actions}
        ></SceneTemplate>
    );
}
