"use client"
import { Afiliado } from '@/contexts/app'
import React, { useEffect, useRef, useState } from 'react'
import html2canvas from 'html2canvas';
import Link from 'next/link';

const blacklist = ["email", "senha"]

const LabelsMap = {
        nome: "Nome",
        email: "Email",
        foto: "Goto",
        cargo: "Cargo",
        insc: "N° Insc.",
        cpf: "CPF",
        rg: "RG",
        nascimento: "Cascimento",
        matricula: "Matrícula",
        emissao: "D. Emissão",
        filiacao: "Filiação",
        naturalidade: "Naturalidade",
        uf: "UF",
        endereco: "Endereço",
        bairro: "Bairro",
        cep: "CEP",
        cidade: "Cidade",
        lote: "Lote",
}

export default function ({dados}:{dados:Afiliado}) {
    const [foto, setFoto] = useState(dados.frente.foto);

    return(dados && <>
        <div className={"carteirinha frente "}>
            {Object.keys(dados.frente).map( key => {
                if(blacklist.includes(key)) return
                if(key == "foto"){// @ts-ignore
                    return <img key={key} className={key} src={foto} />
                }// @ts-ignore
                return <div key={key} className={key}>{dados.frente[key]}</div>
            })}
        </div>
        <div className={"carteirinha atras "}>
            {Object.keys(dados.atras).map( key => {
                if(blacklist.includes(key)) return
                if(key == "assinatura_presidente")
                    return (
                            <img src={dados.atras[key]} />
                    )
                // @ts-ignore
                return <div key={key} className={key}>{dados.atras[key]}</div>
            })}
            
        </div>
        </>
    )
}