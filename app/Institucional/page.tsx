"use client"

import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react"
import firebase_app from "../config";
import dynamic from "next/dynamic";
import { InstitucionalContext } from "@/contexts/institucional";
import { useRouter } from "next/navigation";
import Breadnav from "../components/breadnav";
const Footer = dynamic(() => import("../components/Footer"), { ssr:false })


export default function(){
    const {data} = useContext(InstitucionalContext);
    const router = useRouter();
    setTimeout(()=> router.push("#historia"), 2000)
    return(
        <><article id="pagina-institucional">
            <Breadnav></Breadnav>
            <article id="historia">
                <h2>
                    História do Sindicato
                </h2>
                <div dangerouslySetInnerHTML={{ __html: data.historia }}></div>
            </article>
            <article id="estatuto">
                <h2>Acesse o novo Estatuto do SIMMP, aprovado em novembro de 2014.</h2>
                <a href={data.estatuto}> Estatuto do Sindicato do Magistério Municipal Público de Vitória da Conquista (SIMMP/VC).</a>
            </article>
            <article id="diretoria">
                <h2>
                    Diretoria do sindicato
                </h2>
                <div dangerouslySetInnerHTML={{ __html: data.diretoria }}></div>
            </article>
            <article id="legislação">
                <h2>Legislação</h2>
                <ul>
                    {data.legislacao.map(leg => {
                        // @ts-ignore
                        return <li><a href={leg.arquivo || ""}>{leg.nome}</a></li>;
                    })}
                </ul>
            </article>

            <article id="escolas-e-creches">
                <h2>
                    Escolas e Creches
                </h2>
                <ul>
                    {data.escolasECreches.map(leg => {
                        // @ts-ignore
                        return <li><a href={leg.arquivo || ""}>{leg.nome}</a></li>;
                    })}
                </ul>
            </article>
        </article><Footer></Footer></>
    )
}