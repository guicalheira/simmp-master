
"use client";
import { createContext, useEffect, useState } from "react";
import { DocumentData, QuerySnapshot, onSnapshot } from "firebase/firestore";
import { TContextProps } from "./app";
import { QueryFac } from "./generics";

export type PostData = {
    id: string,
    data: {
        titulo: string,
        capa: string,
        categories: Array<string>,
        data: {
            seconds: number,
            nanoseconds: number
        },
        destaque: boolean,
        galeria: string[],
        texto: string,
    }
}

export const __NO_POSTS_ERROR__ = "No posts avaliable";
export const PostsContext = createContext({ posts: [] as PostData[] });

export function PostsContextProvider(props: TContextProps) {
    
    const [posts, setPosts] = useState([] as PostData[])
    const [listeners, setListeners] = useState([
        (posts: QuerySnapshot<DocumentData>[]) => {
            console.log("PostsContextProvider listener 1 called")
            console.log(posts);
            // setPosts();
            // posts.docs[0].data()[0](doc => ({id: doc.id, data: doc.data()})) as PostData[]
            // const response = await (async () => )();
            // if(response == __NO_POSTS_ERROR__){
            // }
        },
    ]);
    
    fetch('/api')
    .then(response => {
        if(response.ok)
            response.json().then(data =>{
                setPosts(data);
            })
    });
    // 

    useEffect(() => {
        (QueryFac("publicacao", [["categories", "array-contains", "afiliado"]])())
            .then((query: any) => {
                onSnapshot(query, {
                    next: (snap) => {

                    }
                })
            })
    }, []);

    if (!props) return <></>
    return <PostsContext.Provider value={{ posts }}>
        {props.children}
    </PostsContext.Provider>;
}