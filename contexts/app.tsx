"use client";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { Context, Dispatch, Provider, ReactElement, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import firebase_app from '../app/config';
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot, getFirestore, onSnapshot, onSnapshotsInSync } from "firebase/firestore";
import { QueryFac } from "./generics";
import { PostData } from "./posts";
import { AfiliadosProvider } from "./afiliados";
import { UserContextProvider } from "./user";
import { PostsContextProvider } from "./posts";

const auth = getAuth(firebase_app);

export type Afiliado = {
    frente: {
        nome: string,
        email: string,
        foto: string,
        cargo: string,
        insc: string,
        cpf: string,
        rg: string,
        nascimento: string,
        matricula: string,
        emissao: string,
    },
    atras: {
        filiacao: string,
        senha: string,
        naturalidade: string,
        uf: string,
        endereco: string,
        bairro: string,
        cep: string,
        cidade: string,
        lote: string,
        assinatura_presidente: string
    }

}

export const defaultUserData = {
    frente: {
        nome: "",
        email: "",
        foto: "",
        cargo: "",
        insc: "",
        cpf: "",
        rg: "",
        nascimento: "",
        matricula: "",
        emissao: "",
    },
    atras: {
        filiacao: "",
        senha: "",
        naturalidade: "",
        uf: "",
        endereco: "",
        bairro: "",
        cep: "",
        cidade: "",
        lote: "",
        assinatura_presidente: "",
    }
}

export type TGaleria = {
    id: string,
    data: {
        titulo: string,
        desc: string,
        capa: string,
        galeria: string[]
    }
}
export type TPublicacao = {
    titulo: string,
    data: string,
    categories: string[],
    destaque: boolean,
    texto: string,
    capa: string,
    galeria: string[]
}

export type TAfiliado = {
    nome: string,
    ativo: boolean,
    foto: string,
    rg: string,
    cpf: string,
    naturalidade: string,
    insc: string,
    matricula: string,
    lote: string,
    filiacao: string,
    email: string,
    senha: string,
    telefone: string,
    nascimento: string,
    endereco: string,
    uf: string,
    cidade: string,
    cep: string,
    formacao: string,
    cargo: string,
    admissao: string,
    assinatura: string
}





export type TContextProps = { children: ReactNode }


export default function AllProviders({
    children
}: {
    children: React.ReactNode
}) {
    return (
        
            <AfiliadosProvider>
                <UserContextProvider>
                        {children}
                </UserContextProvider>
            </AfiliadosProvider>
    )
}