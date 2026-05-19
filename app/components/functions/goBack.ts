"use client";

type BackRouter = {
    back: () => void;
};

export function goBack(router: BackRouter) {
    router.back();
}
