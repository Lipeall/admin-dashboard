"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

export default function Root() {
    const { onOpen, isOpen } = useStoreModal();

    useEffect(() => {
        if (!isOpen) {
            onOpen();
        }
    }, [isOpen, onOpen]);

    return <div className="p-4">Root page</div>;
}
