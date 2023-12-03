import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
    params: { storeId: string };
}
const DashboardPage = async ({ params }: DashboardPageProps) => {
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
        },
    });

    return <div>Store: {store?.name}</div>;
};

export default DashboardPage;
