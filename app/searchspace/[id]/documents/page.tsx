"use client"
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { DocsDataTable } from './docs-table';

interface PageProps {
  params: { id: number };
}

const page = ({ params: { id } }: PageProps) => {
    const router = useRouter();
    const [docs,setDocs] = useState()

    useEffect(() => {
        const getUserSearchSpaceDocs = async () => {
          const token = window.localStorage.getItem('token');
          // console.log(token)
          try {
            ///user/{token}/searchspace/{search_space_id}/documents/
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/user/${token}/searchspace/${id}/documents/`);
    
            if (!response.ok) {
              throw new Error('Token verification failed');
            } else {
              const res = await response.json()
              console.log("res",res)
              setDocs(res)
            }
          } catch (error) {
            window.localStorage.removeItem('token');
            router.push('/login');
          }
        };
    
        getUserSearchSpaceDocs();
      }, [router]);

    if(docs){
        return (
            <DocsDataTable data={docs} search_space_id={id}/>
        )
    }
  
}

export default page