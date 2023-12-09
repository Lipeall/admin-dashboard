"use client";

import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface OrderClientProps {
    data: OrderColumn[];
}

export const OrderClient = ({ data }: OrderClientProps) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <Heading
                title={`Order (${data.length})`}
                description="Manage order for your store"
            />
            <Separator />
            <DataTable columns={columns} data={data} searchKey="products" />
        </>
    );
};
