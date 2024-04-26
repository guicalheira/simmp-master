"use client"
import PostContent from "../components/NormalPost";
import { useRouter, useSearchParams } from 'next/navigation'
import { PostData } from "@/contexts/posts";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import firebase_app from "../config";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("../components/Footer"), { ssr:false })

export default function Post() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const router = useRouter();
    
    const [data, setData] = useState({} as PostData);
    const db = getFirestore(firebase_app);

    useEffect(() => {
        const q = doc(db, "publicacao/" +id);
        getDoc(q).then(snap => {
            setData({id: snap.id, data: snap.data()} as PostData);
        })
        setTimeout(()=> router.push("#post-title"), 1000)
    },[])
    return data.data && 
        <><PostContent post={data}></PostContent><Footer></Footer></>
}