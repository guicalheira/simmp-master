
"use client";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { Context, ReactNode, createContext, useContext, useEffect, useState } from "react";
import firebase_app from '../app/config';
import { DocumentData } from "firebase/firestore";
import { PostData } from "./posts";
import { AfiliadosContext } from "./afiliados";

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

export function deserializeUser(user: DocumentData): Afiliado {
    const { nome, foto, email, cargo, insc, cpf, rg, nascimento, matricula, emissao, filiacao, naturalidade, uf, endereco, bairro, senha, cep, cidade, lote, assinatura_presidente } = user;
    return { frente: { nome, email, foto, cargo, insc, cpf, rg, nascimento, matricula, emissao }, atras: { filiacao, senha, naturalidade, uf, endereco, bairro, cep, cidade, lote, assinatura_presidente } }
}

export type userBasedListener = (user: User) => Promise<void>;
export const __AUTH_CONTENT__ = {
    user: defaultUserData,
    setUser: (d: any) => { },
    isLoding: false, error: ""
};
export type TAuth = typeof __AUTH_CONTENT__;
export type TUserContext = Context<TAuth>;

export const __NO_USER_ERROR__ = "Current user not Found";
export const __NO_POSTS_ERROR__ = "No posts avaliable";
export const UserContext = createContext(__AUTH_CONTENT__) as TUserContext;

export function userBasedListenerFac(listener: userBasedListener) {
    return async () => {
        return auth.currentUser ? listener(auth.currentUser) : __NO_USER_ERROR__;
    }
}
export type TContextProps = { children: ReactNode }

export function UserContextProvider(props: TContextProps) {
    const [isLoding, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const auth = getAuth(firebase_app);
    const afiliados = useContext(AfiliadosContext);

    const [user, setUser] = useState(defaultUserData);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            const find = user? afiliados.find((af:Afiliado) => (af.frente.email === user.email) ) : null;
            console.log(find)
            if(find)
              setUser(deserializeUser(find))
        });
    }, [])

    if (!props) return <></>
    return <UserContext.Provider value={{ user, setUser, isLoding, error }}>
        {props.children}
    </UserContext.Provider>;
};
