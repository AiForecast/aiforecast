"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "./use-toast";
import { useRouter } from "next/navigation";


const schema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(10)
});

export default function NewSearchSpaceForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema)
    });
    const { toast } = useToast();
    const router = useRouter();

    const processForm = async (data: any) => {
        const token = window.localStorage.getItem("token");

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: token,
                name: data.name,
                description: data.description,
            }),
        };

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL!}/user/create/searchspace/`,
            requestOptions
        );
        if (!response.ok) {
            throw new Error("Token verification failed");
        } else {
            const res = await response.json();
            toast({
                title: "Successfuly created search space.",
            });
            window.location.href = '/searchspace/'
        }

        console.log(data)

        reset();
    };

    return (
        <form onSubmit={handleSubmit(processForm)} className="mx-auto mt-auto mb-auto p-4 w-full max-w-96 flex flex-col gap-4 border rounded-2xl">

            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-neutral-700 dark:text-neutral-400"
                >
                    Search Space Name
                </label>

                <div className="mt-2">
                    <input
                        {...register("name", { required: true })}
                        name="name"
                        placeholder="eg. Bookmarks"
                        className="block w-full bg-white dark:bg-neutral-900 px-4 rounded-md border-0 py-1.5  shadow-input text-black placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:text-white"
                    />
                    {errors.name?.message && <span className="text-sm text-red-600">{errors.name?.message}</span>}
                </div>
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-neutral-700 dark:text-neutral-400"
                >
                    Search Space Description
                </label>

                <div className="mt-2">
                    <textarea
                        {...register("description", { required: true })}
                        name="description"
                        placeholder="eg. this space stores my bookmarks......."
                        className="block w-full bg-white dark:bg-neutral-900 px-4 rounded-md border-0 py-1.5  shadow-input text-black placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:text-white"
                    />
                    {errors.description?.message && <span className="text-sm text-red-600">{errors.description?.message}</span>}
                </div>
            </div>

            <div>
                <button className="bg-black relative z-10 hover:bg-black/90  text-white text-sm md:text-sm transition font-medium duration-200  rounded-full px-4 py-2  flex items-center justify-center w-full dark:text-black dark:bg-white dark:hover:bg-neutral-100 dark:hover:shadow-xl">
                    Create Search Space
                </button>
            </div>
        </form>
    );
}