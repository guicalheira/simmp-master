"use client";
import { createContext, useEffect, useState } from "react";
import firebase_app from '../app/config';
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { TContextProps } from "./app";


const institucionalDefaultContent = {
    historia: "",
    diretoria: "",
    estatuto: "",
    escolasECreches: [
    ],
    legislacao: [
        
    ],
    vantagensAfiliado: ""
}
export type TInstitucionalContent = typeof institucionalDefaultContent;

export const InstitucionalContext = createContext({data:institucionalDefaultContent})

export default function (props:TContextProps){
    const [data, setData] = useState(institucionalDefaultContent);
    const db = getFirestore(firebase_app);

    useEffect(()=>{
        const q = query(collection(db, "institucional"));

        getDocs(q)
            .then(querySnap => {
                querySnap.forEach((doc) => {
                    setData(doc.data() as TInstitucionalContent);
                });
            })

    },[])

    if (!props) return <></>
    return <InstitucionalContext.Provider value={{data}}>
        {props.children}
    </InstitucionalContext.Provider>;
}