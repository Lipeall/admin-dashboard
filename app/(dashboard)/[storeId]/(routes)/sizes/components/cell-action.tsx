"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SizeColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
    data: SizeColumn;
}

const CellAction = ({ data }: CellActionProps) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const params = useParams();

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Size ID copied to the clipboard.");
    };

    const onDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`/api/${params.storeId}/sizes/${data.id}`);
            router.refresh();
            toast.success("Size deleted.");
        } catch (error) {
            toast.error(
                "Make sure you removed all products using this size first."
            );
        } finally {
            setOpen(false);
            setLoading(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open Menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() =>
                            router.push(`/${params.storeId}/sizes/${data.id}`)
                        }
                    >
                        <Edit className="mr-2 h-4 w-4" />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => onCopy(data.id)}
                    >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy ID
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default CellAction;
