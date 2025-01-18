"use client";
import React, { useEffect, useState } from "react";
import { Menu } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./theme-toggle";
import Image from "next/image";
import logo from "../../public/AiForecst.png"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useMotionValueEvent, useScroll } from "framer-motion";

export function MainNavbar() {
    return (
        <div className="relative w-full flex items-center justify-around">
            <Navbar className="px-2" />
        </div>
    );
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    const { toast } = useToast()


    const [loggedin, setLoggedin] = useState<boolean>(false);
    const { scrollY } = useScroll();

    const [showBackground, setShowBackground] = useState(false);

    useMotionValueEvent(scrollY, "change", (value) => {
        if (value > 100) {
            setShowBackground(true);
        } else {
            setShowBackground(false);
        }
    });
    const router = useRouter();
    useEffect(() => {
        const verifyToken = async () => {
            const token = window.localStorage.getItem('token');
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/verify-token/${token}`);

                if (!response.ok) {
                    throw new Error('Token verification failed');
                } else {
                    setLoggedin(true)
                }
            } catch (error) {
                window.localStorage.removeItem('token');
                setLoggedin(false)
            }

        };

        verifyToken();
    }, [router]);

    const logOut = () => {
        window.localStorage.removeItem('token');
        setLoggedin(false)
        toast({
            title: "Logged Out Successfully",
        })
        router.push('/');
    }

    return (
        <div
            className={cn("fixed top-10 inset-x-0 max-w-7xl mx-auto z-50", showBackground &&
                "top-2 rounded-full dark:bg-black/20 bg-white/20 backdrop-blur-lg", className)}
        >
            <Menu setActive={setActive}>
                <Link href={"/"} className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                    <Image className="hidden sm:block w-8 h-8 mr-2 rounded-full" src={logo} alt="logo" />
                    <span className="hidden md:block text-purple-400">AiForecst</span>
                </Link>

                <div className="flex gap-2">

                    {
                        !loggedin ? (<a href={"/login"}>
                            <button className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
                                Log In
                            </button>
                        </a>) : (<>
                            <button onClick={() => logOut()} className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
                                Log Out
                            </button>
                        </>)
                    }



                    <ModeToggle />
                </div>

            </Menu>
        </div>
    );
}