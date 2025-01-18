"use client";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { AuroraBackground } from "../ui/aurora-background";
import Balancer from "react-wrap-balancer";
import icon from "../../public/AiForecst.png"
import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";

import { Badge } from "../badge";

export function HomePage() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <AuroraBackground>
                <motion.div
                    initial={{
                        y: 40,
                        opacity: 0,
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                    }}
                    transition={{
                        ease: "easeOut",
                        duration: 0.5,
                    }}
                    className="flex justify-center mt-20"
                >
                    <Link
                        href="https://github.com/0x2b3ef/aiforecast">
                        <Badge>
                            AiForecast will Released in 2025 Q1
                        </Badge>
                    </Link>

                </motion.div>

                <motion.div
                    transition={{ delay: 1 }}
                    animate={{
                        scale: [1, 2, 2, 1, 1],
                        rotate: [0, 0, 270, 270, 0],
                        borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                    }}
                    className="flex items-center m-4 text-5xl font-semibold text-gray-900 dark:text-white">
                    <Image className="w-64 h-64 rounded-full" src={icon} alt="logo" />
                </motion.div>

                <h2 className="text-balance relative z-50 mx-auto mb-4 mt-4 max-w-4xl text-center text-3xl font-semibold tracking-tight text-gray-700 dark:text-neutral-300 md:text-7xl">
                    <Balancer>
                        Ai{""}
                        <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                            <div className="text-black [text-shadow:0_0_rgba(0,0,0,0.1)] dark:text-white">
                                <span className="">Forecast</span>
                            </div>
                        </div>
                    </Balancer>
                </h2>
                <p className="relative z-50 mx-auto mt-4 max-w-xlg px-4 text-center text-base/6 text-gray-600 dark:text-gray-200">
                A Personal NotebookLM and Perplexity-like AI Assistant for Everyone.
                </p>
                <div className="mb-10 mt-8 flex w-full flex-col items-center justify-center gap-4 px-8 sm:flex-row md:mb-20">
                    <Link
                        href="/searchspace"
                        className="group relative z-20 flex h-10 w-full cursor-pointer items-center justify-center space-x-2 rounded-lg bg-black p-px px-4 py-2 text-center text-sm font-semibold leading-6 text-white no-underline transition duration-200 dark:bg-white dark:text-black sm:w-52"
                    >
                        Get Started
                    </Link>
                    <Link
                        href="https://github.com/0x2b3ef/aiforecast"
                        className="group relative z-20 flex h-10 w-full cursor-pointer items-center justify-center space-x-2 rounded-lg bg-white p-px px-4 py-2 text-sm font-semibold leading-6 text-black no-underline shadow-input transition duration-200 hover:-translate-y-0.5 dark:bg-neutral-800 dark:text-white sm:w-52"
                    >
                        <span>
                            GitHub
                        </span>
                        <Github className="h-4 w-4" />

                    </Link>
                </div>
                {/* <div
                    ref={containerRef}
                    className="relative mx-auto max-w-7xl rounded-[32px] border border-neutral-200/50 bg-neutral-100 p-2 backdrop-blur-lg dark:border-neutral-700 dark:bg-neutral-800/50 md:p-4"
                >
                    <div className="rounded-[24px] border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-black">
                        <Image
                            src="/gif.gif"
                            alt="header"
                            width={1920}
                            height={1080}
                            className="rounded-[20px]"
                            unoptimized 
                        />
                    </div>
                </div> */}
            </AuroraBackground>
            {/* <FeaturesSectionDemo /> */}
            {/* <ThreeDCardDemo /> */}
            {/* <LampDemo /> */}
        </>

    );
}
