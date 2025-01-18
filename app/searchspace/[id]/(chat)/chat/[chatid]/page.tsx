// chat.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ExternalLink,
  FileCheck,
  FolderDot,
  CircleUser,
  ArrowUp,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MarkDownTest from "@/app/markdown";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import JsonThemeEditor from "@/app/json-editor";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function isValidUrl(val: string) {
  try {
    new URL(val);
    return true;
  } catch (err) {
    return false;
  }
}

interface MetaType {
  filename?: string;
  VisitedWebPageTitle?: string;
}

type Source = {
  id: string;
  title: string;
  source: string;
};

type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  relateddocs?: any[];
};

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
};

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
};

interface PageProps {
  params: { id: number; chatid: number };
}

export default function Component({ params: { id, chatid } }: PageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [searchtype, setSearchType] = React.useState("local");
  const [answertype, setAnswerType] = React.useState("general_answer");
  const [chattype, setChatType] = React.useState("");
  const wasAlreadyRequested = useRef(false);

  const saveChat = async () => {
    const token = window.localStorage.getItem("token");
    // console.log(token)
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          chatid: chatid,
          chats_list: JSON.stringify(messages),
        }),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL!}/searchspace/${id}/chat/update`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Token verification failed");
      } else {
        const res = await response.json();

        console.log(res);
      }
    } catch (error) {
      window.localStorage.removeItem("token");
      router.push("/login");
    }
  };

  useEffect(() => {
    const getSearchSpaceWS = async () => {
      try {
        const token = window.localStorage.getItem("token");
        socketRef.current = new WebSocket(
          `ws://${"127.0.0.1:8000"}/beta/chat/${id}/${token}`
        );

        socketRef.current.onopen = () => {
          setIsConnected(true);
          console.log("WebSocket connected");
        };

        socketRef.current.onmessage = (event: any) => {
          const data = JSON.parse(event.data);

          if (data.type === "stream") {
            setMessages((prevMessages) => {
              const updatedMessages = prevMessages.map((msg, idx) => {
                if (
                  idx === prevMessages.length - 1 &&
                  msg.role === "assistant"
                ) {
                  return {
                    ...msg,
                    content: data.content || "",
                    sources: data.sources ?? msg.sources,
                    relateddocs: data.relateddocs ?? msg.relateddocs,
                  };
                }
                return msg;
              });
              return updatedMessages;
            });
          } else if (data.type === "report") {
            setMessages((prevMessages) => {
              const updatedMessages = prevMessages.map((msg, idx) => {
                if (
                  idx === prevMessages.length - 1 &&
                  msg.role === "assistant"
                ) {
                  return { ...msg, content: msg.content + (data.output || "") };
                }
                return msg;
              });
              return updatedMessages;
            });
          } else if (data.type === "logs") {
            setMessages((prevMessages) => {
              const updatedMessages = prevMessages.map((msg, idx) => {
                if (
                  idx === prevMessages.length - 1 &&
                  msg.role === "assistant"
                ) {
                  return { ...msg, content: data.content + "\n" || "\n" };
                }
                return msg;
              });
              return updatedMessages;
            });
          } else if (data.type === "end") {
            setIsStreaming(false);
          }
        };

        socketRef.current.onclose = () => {
          setIsConnected(false);
          console.log("WebSocket disconnected");
        };

        return () => {
          if (socketRef.current) {
            socketRef.current.close();
          }
        };
      } catch (error) {
        window.localStorage.removeItem("token");
        router.push("/login");
      }
    };

    getSearchSpaceWS();
  }, []);

  useEffect(() => {
    const getChatById = async () => {
      try {
        wasAlreadyRequested.current = true;
        const token = window.localStorage.getItem("token");
        const response = await fetch(
          `${process.env
            .NEXT_PUBLIC_BACKEND_URL!}/searchspace/${id}/chat/${token}/${chatid}`,
          { method: "GET" }
        );

        if (!response.ok) {
          throw new Error("Token verification failed");
        } else {
          const chat = await response.json();
          //add handling for multidoc later
          if (chat.type === "general") {
            const retrived_messages = JSON.parse(chat.chats_list);
            setMessages(retrived_messages);
            setChatType("general");
            console.log(retrived_messages);
            if (retrived_messages.length === 1) {
              if (socketRef.current && retrived_messages[0].role === "user") {
                const newMessage: Message = {
                  role: "assistant",
                  content: "Thinking.....",
                };
                setMessages((prev) => [...prev, newMessage]);
                setSearchType(retrived_messages[0].searchtype);
                setAnswerType(retrived_messages[0].answertype);
                console.log("GetChatHandler");
                socketRef.current.send(
                  JSON.stringify({
                    type: "search_space_chat",
                    content: retrived_messages[0].content,
                    searchtype: retrived_messages[0].searchtype,
                    answertype: retrived_messages[0].answertype,
                  })
                );
              }
            }
          } else {
            setChatType("multidoc");
            const retrived_messages = JSON.parse(chat.chats_list);
            setMessages(retrived_messages);
          }
        }
      } catch (error) {
        console.log(error);
        // window.localStorage.removeItem("token");
        // router.push("/login");
      }
    };

    if (!wasAlreadyRequested.current) {
      getChatById();
    }
  }, [wasAlreadyRequested]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }

    if (
      messages?.length &&
      messages[messages.length - 1].role === "assistant"
    ) {
      const { content, relateddocs, sources } = messages[messages.length - 1];

      if (chattype === "general") {
        if (content && (relateddocs || sources) && !isStreaming) {
          saveChat();
        }
      } else {
        if (content) {
          saveChat();
        }
      }
    }
  }, [messages]);

  const getDocDescription = (doc: any) => {
    console.log(doc);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "assistant", content: doc.page_content },
    ]);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && isConnected && !isStreaming) {
      if (chattype === "general") {
        console.log("Sending message:", messages);
        const newMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, newMessage]);
        setInput("");
        setIsStreaming(true);

        if (socketRef.current) {
          const newMessage: Message = {
            role: "assistant",
            content: "Thinking.....",
          };
          setMessages((prev) => [...prev, newMessage]);
          console.log("Submit Handler");
          socketRef.current.send(
            JSON.stringify({
              type: "search_space_chat",
              content: input,
              searchtype: searchtype,
              answertype: answertype,
            })
          );
        }
      } else {
        //web doc req
        console.log("Multidoc Sending message:", messages);
        const newMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, newMessage]);
        setInput("");
        setIsStreaming(true);

        if (socketRef.current) {
          console.log("Multidoc Submit Handler");
          socketRef.current.send(
            JSON.stringify({
              type: "multiple_documents_chat",
              content: input,
              chat_history: messages,
            })
          );
          const newMessage: Message = {
            role: "assistant",
            content: "Thinking.....",
          };
          setMessages((prev) => [...prev, newMessage]);
        }
      }
    }
  };

  return (
    <div className="grow flex flex-col gap-3 justify-center h-screen">
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        {messages.map((message, index) => (
          <div key={index} className="mb-6 flex items-start">
            {message.role === "user" ? (
              <>
                <div className="flex-grow" />
                <div className="flex items-start space-x-2">
                  <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                    <p>{message.content}</p>
                  </div>
                  <CircleUser className="h-10 w-10" strokeWidth={1} />
                </div>
              </>
            ) : (
              <div className="flex items-start space-x-2">
                <Avatar>
                  <AvatarFallback>AI</AvatarFallback>
                  <AvatarImage src="/icon-128.png" alt="AI Assistant" />
                </Avatar>
                <div className="space-y-4 flex-grow">
                  {message.sources && (
                    <>
                      {message.sources.length > 0 && (
                        <div className="text-lg font-bold">References</div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {message.sources.map((source, i) => (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              duration: 0.75,
                              delay: i / 10,
                            }}
                            key={i}
                          >
                            {!isValidUrl(source.source) ? (
                              <Card
                                key={source.id}
                                className="bg-card dark:bg-muted"
                              >
                                <CardContent className="p-3 flex items-start space-x-2">
                                  <div className="bg-primary rounded-full p-1.5 mt-0.5">
                                    <FolderDot className="h-3 w-3 text-primary-foreground" />
                                  </div>
                                  <div className="space-y-1 flex-1 min-w-0">
                                    <p className="text-sm font-medium leading-none truncate">
                                      {source.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                      {source.source}
                                    </p>
                                  </div>
                                </CardContent>
                              </Card>
                            ) : (
                              <Link
                                href={source.source}
                                target="_blank"
                                key={source.id}
                                className="text-blue-500 hover:underline"
                              >
                                <Card
                                  key={source.id}
                                  className="bg-card dark:bg-muted"
                                >
                                  <CardContent className="p-3 flex items-start space-x-2">
                                    <div className="bg-primary rounded-full p-1.5 mt-0.5">
                                      <ExternalLink className="h-3 w-3 text-primary-foreground" />
                                    </div>
                                    <div className="space-y-1 flex-1 min-w-0">
                                      <p className="text-sm font-medium leading-none truncate">
                                        {source.title}
                                      </p>
                                      <p className="text-xs text-muted-foreground truncate">
                                        {source.source}
                                      </p>
                                    </div>
                                  </CardContent>
                                </Card>
                              </Link>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                  {message.content && (
                    <Card className="bg-card dark:bg-muted">
                      <CardContent className="p-4">
                        <div className="text-card-foreground">
                          <MarkDownTest
                            source={message.content}
                            sources={message.sources}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  {message?.relateddocs && (
                    <div className="text-lg font-bold">Related Documents</div>
                  )}
                  {message?.relateddocs?.map((doc, idx) => {
                    // console.log('Related doc:', doc)

                    // return (<>HI</>);
                    let meta = {}
                    if(chattype === "general") {
                      meta = doc.metadata;
                    }else{
                      meta = JSON.parse(doc.document_metadata);
                    }
                    

                    return (
                      <React.Fragment key={idx}>
                        <Collapsible className="bg-card dark:bg-muted text-card-foreground rounded-lg p-3 border">
                          <CollapsibleTrigger className="flex justify-between gap-2 mb-2">
                            <FileCheck />
                            {(meta as MetaType)?.filename || (meta as MetaType)?.VisitedWebPageTitle}
                          </CollapsibleTrigger>
                          <CollapsibleContent className="flex flex-col place-content-center gap-4">
                            <JsonThemeEditor jsonobject={meta} />
                            <Button
                              variant="outline"
                              className="bg-red-500/10"
                              onClick={() => getDocDescription(doc)}
                              disabled={isStreaming}
                            >
                              Show Summary
                            </Button>
                          </CollapsibleContent>
                        </Collapsible>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </ScrollArea>

      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,)]",
          "inset-x-0 inset-y-[-30%] h-[65%] skew-y-12"
        )}
      />
      {isStreaming ? (
        <div className="m-2 p-4 border rounded-lg border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="flex-grow h-10 bg-gray-500 dark:bg-gray-700 rounded"></div>
            <div className="w-10 h-10 bg-gray-500 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
      ) : (
        <div className="mx-2 my-2 py-2 px-4 border-2 rounded-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              type="text"
              placeholder={
                isConnected ? "Type your message..." : "Connecting..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border-0 focus-visible:ring-offset-0 focus-visible:ring-0 resize-none overflow-auto w-full flex-1 bg-transparent p-3 pb-1.5 text-sm outline-none ring-0 placeholder:text-gray-500"
              disabled={isStreaming || !isConnected}
            />
            <div className="flex items-center justify-between px-2 py-1">
              {chattype === "general" && (
                <div className="flex items-center gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="border-2 rounded-sm border-dashed h-8 px-3 text-sm font-normal text-muted-foreground"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        {searchtype
                          ? renderSearchTypelabel(searchtype)
                          : "Search Type"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Search Type</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={searchtype}
                        onValueChange={setSearchType}
                      >
                        <DropdownMenuRadioItem value="local">
                          Local
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="web">
                          Web
                        </DropdownMenuRadioItem>
                        {/* <DropdownMenuRadioItem value="hybrid">
                          Hybrid
                        </DropdownMenuRadioItem> */}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="border-2 rounded-sm border-dotted h-8 px-3 text-sm font-normal text-muted-foreground"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        {answertype
                          ? renderAnswerTypelabel(answertype)
                          : "Answer Type"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Answer Type</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={answertype}
                        onValueChange={setAnswerType}
                      >
                        <DropdownMenuRadioItem value="general_answer">
                          General
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="research_report">
                          Report
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="detailed_report">
                          Detailed Report
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              {searchtype && answertype && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-sm hover:bg-muted"
                  type="submit"
                >
                  <ArrowUp className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Send</span>
                </Button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
