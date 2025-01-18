"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatHistoryDataTable } from "./chat-history-table";

interface PageProps {
    params: { id: number };
}

const page = ({ params: { id } }: PageProps) => {
    const router = useRouter();
    const { toast } = useToast();
    const [userchats, setUserChats] = useState([]);

    useEffect(() => {
        const getUserChats = async () => {
          const token = window.localStorage.getItem("token");
          // console.log(token)
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL!}/searchspace/${id}/chats/${token}`
            );
    
            if (!response.ok) {
              throw new Error("Token verification failed");
            } else {
              const res = await response.json();
              console.log(res)
              setUserChats(res);
            }
          } catch (error) {
            window.localStorage.removeItem("token");
            router.push("/login");
          }
        };
    
        getUserChats();
      }, []);

    // const deleteChat = async (chatid: number) => {
    //     const token = window.localStorage.getItem('token');
    //     // console.log(token)/user/chat/delete/{token}/{chatid}
    //     try {
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/searchspace/${id}/chat/delete/${token}/${chatid}`);

    //         if (!response.ok) {
    //             throw new Error('Token verification failed');
    //         } else {
    //             const res = await response.json();
    
    //             window.location.href = `/searchspace/${id}/chat/history`
           
    //         }
    //     } catch (error) {
    //         window.localStorage.removeItem('token');
    //         router.push('/login');
    //     }
    // }

    return (
        <>
        <ChatHistoryDataTable data={userchats} search_space_id={id}/>
        </>
    )

    // return (
        
    //            <ScrollArea className="w-full p-2">
    //            <Table>
    //             <TableCaption>A list of your recent chats.</TableCaption>
    //             <TableHeader>
    //                 <TableRow>
    //                     <TableHead className="w-[100px]">Type</TableHead>
    //                     <TableHead>Title</TableHead>
    //                 </TableRow>
    //             </TableHeader>
    //             <TableBody>
                 
                        
                    
    //                 {userchats.map((chat: any) => (
    //                     <TableRow key={chat.id}>
    //                         <TableCell className="font-medium">{chat.type}</TableCell>
    //                         <TableCell>{chat.title}</TableCell>
    //                         <TableCell>
    //                             <Link href={`/searchspace/${id}/chat/${chat.id}`}>
    //                                 <button className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
    //                                     Continue
    //                                 </button>
    //                             </Link>
    //                         </TableCell>
    //                         <TableCell>
    //                             <AlertDialog>
    //                                 <AlertDialogTrigger asChild>
    //                                     <Button variant="outline" className="bg-red-500/10">Delete</Button>
    //                                 </AlertDialogTrigger>
    //                                 <AlertDialogContent>
    //                                     <AlertDialogHeader>
    //                                         <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
    //                                         <AlertDialogDescription>
    //                                             This action cannot be undone. This will permanently delete your
    //                                             chat and remove your data from our servers.
    //                                         </AlertDialogDescription>
    //                                     </AlertDialogHeader>
    //                                     <AlertDialogFooter>
    //                                         <AlertDialogCancel>Cancel</AlertDialogCancel>
    //                                         <AlertDialogAction onClick={() => deleteChat(chat.id)}>Delete</AlertDialogAction>
    //                                     </AlertDialogFooter>
    //                                 </AlertDialogContent>
    //                             </AlertDialog>
    //                         </TableCell>
    //                     </TableRow>
    //                 ))}
    //             </TableBody>
    //         </Table>
    //            </ScrollArea>

    
    // );
};

export default page;
