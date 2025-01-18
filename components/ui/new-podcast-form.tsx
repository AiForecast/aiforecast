"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "./use-toast";
import { useRouter } from "next/navigation";


const schema = z.object({
    title: z.string().min(3).max(50),
    wordcount: z.number().max(2000)
});

export default function NewPodcastForm({ forDocuments, search_space_id }: { forDocuments: any, search_space_id: Number }) {
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

    console.log("forDocuments", forDocuments)

    const processForm = async (data: any) => {
        const token = window.localStorage.getItem("token");

        let docsContent: string[] = [];
        forDocuments.filter((doc: { page_content: string; }, idx: string) => {
            docsContent.push("DOCUMENT " + idx + "\n\n" + doc.page_content + "\n\n")
        })

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: token,
                search_space_id: search_space_id,
                title: data.title,
                wordcount: data.wordcount,
                podcast_content: docsContent.join("\n\n---\n\n"),
            }),
        };

        // console.log(requestOptions)
        toast({
            title: "Podcast Creation is in Progress",
        });

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL!}/user/searchspace/create-podcast`,
            requestOptions
        );
        if (!response.ok) {
            toast({
                title: "Podcast Creation Failed",
            });
            throw new Error("Token verification failed");
        } else {
            router.push(`/searchspace/${search_space_id}/podcasts`)
        }

        // console.log(data)

        reset();
    };

    return (
        <form onSubmit={handleSubmit(processForm)} className="mx-auto mt-auto mb-auto p-4 w-full max-w-96 flex flex-col gap-4 border rounded-2xl">

            <div>
                <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-neutral-700 dark:text-neutral-400"
                >
                    Podcast Title
                </label>

                <div className="mt-2">
                    <input
                        {...register("title", { required: true })}
                        name="title"
                        className="block w-full bg-white dark:bg-neutral-900 px-4 rounded-md border-0 py-1.5  shadow-input text-black placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:text-white"
                    />
                    {errors.title?.message && <span className="text-sm text-red-600">{errors.title?.message}</span>}
                </div>
            </div>

            <div>
                <label
                    htmlFor="wordcount"
                    className="block text-sm font-medium leading-6 text-neutral-700 dark:text-neutral-400"
                >
                    Word Count
                </label>

                <div className="mt-2">
                    <input
                        type="number" // Ensure the input type is number
                        {...register("wordcount", {
                            required: true,
                            valueAsNumber: true // Converts the value to a number
                        })}
                        name="wordcount"
                        placeholder="e.g. 500"
                        className="block w-full bg-white dark:bg-neutral-900 px-4 rounded-md border-0 py-1.5 shadow-input text-black placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:text-white"
                    />
                    {errors.wordcount?.message && <span className="text-sm text-red-600">{errors.wordcount?.message}</span>}
                </div>
            </div>


            <div>
                <button className="bg-black relative z-10 hover:bg-black/90  text-white text-sm md:text-sm transition font-medium duration-200  rounded-full px-4 py-2  flex items-center justify-center w-full dark:text-black dark:bg-white dark:hover:bg-neutral-100 dark:hover:shadow-xl">
                    Create Podcast
                </button>
            </div>
        </form>
    );
}