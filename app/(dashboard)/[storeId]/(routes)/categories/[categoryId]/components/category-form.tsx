"use client";

import * as z from "zod";
import { Category, Billboard } from "@prisma/client";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface CategoryFormProps {
    initialData: Category | null;
    billboards: Billboard[] | null;
}

const formSchema = z.object({
    name: z.string().min(1),
    billboardId: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>;

export const CategoryForm = ({
    initialData,
    billboards,
}: CategoryFormProps) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);

    const title = initialData ? "Edit category" : "Create category";
    const description = initialData ? "Edit category." : "Add a new category.";
    const toastMessage = initialData
        ? "Category updated."
        : "Category created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            billboardId: "",
        },
    });

    const isSubmitting = form.formState.isSubmitting;

    const onSubmit = async (values: CategoryFormValues) => {
        try {
            if (initialData) {
                await axios.patch(
                    `/api/${params.storeId}/categories/${params.categoryId}`,
                    values
                );
            } else {
                await axios.post(`/api/${params.storeId}/categories`, values);
            }
            router.push(`/${params.storeId}/categories`);
            router.refresh();
            toast.success(toastMessage);
        } catch (error) {
            toast.error("Something went wrong.");
        }
    };

    const onDelete = async () => {
        try {
            await axios.delete(
                `/api/${params.storeId}/categories/${params.categoryId}`
            );
            router.push(`/${params.storeId}/categories`);
            router.refresh();
            toast.success("Category deleted.");
        } catch (error) {
            toast.error(
                "Make sure you removed all products using this category first."
            );
        } finally {
            setOpen(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={isSubmitting}
            />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button
                        disabled={isSubmitting}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="Category name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="billboardId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Billboard</FormLabel>
                                    <Select
                                        disabled={isSubmitting}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a billboard"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {billboards?.map((billboard) => (
                                                <SelectItem
                                                    key={billboard.id}
                                                    value={billboard.id}
                                                >
                                                    {billboard.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={isSubmitting}
                        className="ml-auto"
                        type="submit"
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};
