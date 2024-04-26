"use client";
import { createContext, useEffect, useState } from "react";
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot, onSnapshot } from "firebase/firestore";
import { QueryFac } from "./generics";
import { Afiliado,  TContextProps } from "./app";
import { __AUTH_CONTENT__, deserializeUser } from "./user";

export const AfiliadosContext = createContext([] as Afiliado[]);


export function AfiliadosProvider(props: TContextProps) {
    // Afiliados retrieving
    const [afiliados, setAfiliados] = useState([] as Afiliado[])
    const [listeners, setListeners] = useState([
        (snap: QueryDocumentSnapshot<DocumentData>[]) =>
            setAfiliados(snap.map(doc => deserializeUser(doc.data())))
    ]);
    // 


    useEffect(() => {
        (QueryFac("afiliados", [])())
            .then((query) =>
                onSnapshot(query, (snap: QuerySnapshot<DocumentData>) => {
                    listeners.forEach(listener => listener(snap.docs))
                })
            )
    }, []);

    if (!props) return <></>
    return <AfiliadosContext.Provider value={afiliados}>
        {props.children}
    </AfiliadosContext.Provider>;
}
