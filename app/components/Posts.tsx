"use client"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PostData } from "@/contexts/posts";
import CollectionFac from "@/contexts/generics";
import PostCard from "./PostCard";


export default function Posts({ tag, className }: { tag: string, className:string }) {
    const [data, setData]: [PostData[], Dispatch<SetStateAction<PostData[]>>] = useState([] as PostData[]);

    useEffect(() => {
        CollectionFac("publicacao", [["categories", "array-contains", tag]])()
            .then(docs => setData(docs.map(doc => ({ id: doc.id, data: doc.data() }) as PostData)));
    }, [])

    if(data.length ==0)
    return (<h2>Não há posts ainda nessa categoria</h2>) 
    return <div className={className}>
        {data.map((post: PostData, index) => (
            <PostCard v={false} style={{}} key={`post_card_${index}`} data={post}></PostCard>
        ))}
    </div>
}