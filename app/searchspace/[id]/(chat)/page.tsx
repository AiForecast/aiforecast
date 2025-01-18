// chat.tsx
'use client'

import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, Plus } from "lucide-react";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from '@/lib/utils';
import Balancer from 'react-wrap-balancer';
import { Badge } from '@/components/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const renderSearchTypelabel = (searchtype: string) => {
  switch (searchtype) {
    case "local":
      return "Local Search";
    case "web":
      return "Web Search";
    case "hybrid":
      return "Hybrid Search";
    default:
      return "";
  }
}


const renderAnswerTypelabel = (answertype: string) => {
  switch (answertype) {
    case "general_answer":
      return "General Answer";
    case "research_report":
      return "Report";
    case "detailed_report":
      return "Detailed Report";
    default:
      return "";
  }
}

interface PageProps {
  params: { id: number };
}

export default function Component({ params: { id } }: PageProps) {
  const [input, setInput] = useState('');
  const router = useRouter();

  const [searchtype, setSearchType] = React.useState("local")
  const [answertype, setAnswerType] = React.useState("general_answer")


  const handleBadgeSubmit = async (msg: string) => {
    const token = window.localStorage.getItem("token");
    // Create Chat & Redirect with its ID
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          type: "general",
          title: msg,
          chats_list: JSON.stringify([{ role: 'user', content: msg, searchtype: searchtype, answertype: answertype }]),
        }),
      };

      // console.log("Request Options:", requestOptions)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL!}/searchspace/${id}/chat/create`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Token verification failed");
      } else {
        const res = await response.json();

        // console.log("NewCreResponse:", res)

        router.push(`/searchspace/${id}/chat/${res.chat_id}`);
      }
    } catch (error) {
      //toast error
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim()) {
      const token = window.localStorage.getItem("token");
      // Create Chat & Redirect with its ID
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: token,
            type: "general",
            title: input,
            chats_list: JSON.stringify([{ role: 'user', content: input, searchtype: searchtype, answertype: answertype }]),
          }),
        };

        // console.log("Request Options:", requestOptions)

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL!}/searchspace/${id}/chat/create`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Token verification failed");
        } else {
          const res = await response.json();

          // console.log("NewCreResponse:", res)

          router.push(`/searchspace/${id}/chat/${res.chat_id}`);
        }
      } catch (error) {
        //toast error
      }

    }
  };

  return (

    <div className="grow flex flex-col gap-3 justify-center h-screen">
      <>
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
          className="flex gap-4 flex-wrap justify-center"
        >
          <div>
            <Badge onClick={() => handleBadgeSubmit("What is Aiforecast?")}>
              What is aiforecast?
            </Badge>
          </div>

          <div>
            <Badge onClick={() => handleBadgeSubmit("Should I buy Nvidia Stock?")}>
              Should I buy Nvidia Stock?
            </Badge>
          </div>

          <div>
            <Badge onClick={() => handleBadgeSubmit("What is latest news on Tesla?")}>
              What is latest news on Tesla?
            </Badge>
          </div>

        </motion.div>
      </>
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,)]",
          "inset-x-0 inset-y-[-30%] h-[65%] skew-y-12",
        )}
      />

      <div className="mx-2 my-2 py-2 px-4 border-2 rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            type="text"
            placeholder={"Type your message..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border-0 focus-visible:ring-offset-0 focus-visible:ring-0 resize-none overflow-auto w-full flex-1 bg-transparent p-3 pb-1.5 text-sm outline-none ring-0 placeholder:text-gray-500"

          />
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost"
                    className="border-2 rounded-sm border-dashed h-8 px-3 text-sm font-normal text-muted-foreground" >
                    <Plus className="h-4 w-4 mr-1" />
                    {searchtype ? renderSearchTypelabel(searchtype) : 'Search Type'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Search Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={searchtype} onValueChange={setSearchType}>
                    <DropdownMenuRadioItem value="local">Local</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="web">Web</DropdownMenuRadioItem>
                    {/* <DropdownMenuRadioItem value="hybrid">Hybrid</DropdownMenuRadioItem> */}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost"
                    className="border-2 rounded-sm border-dotted h-8 px-3 text-sm font-normal text-muted-foreground" >
                    <Plus className="h-4 w-4 mr-1" />
                    {answertype ? renderAnswerTypelabel(answertype) : 'Answer Type'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Answer Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={answertype} onValueChange={setAnswerType}>
                    <DropdownMenuRadioItem value="general_answer">General Answer</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="research_report">Report</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="detailed_report">Detailed Report</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {
              searchtype &&
              answertype &&
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-sm hover:bg-muted"
                type='submit'
              >
                <ArrowUp className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Send</span>
              </Button>
            }

          </div>
        </form>
      </div>


    </div>
  );
}