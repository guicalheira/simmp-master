'use client'
import React, { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useForm } from "react-hook-form";
import firebase_app from "../../config";
import { Button, FormGroup, TextField } from "@mui/material";
import { TsetLoginTab } from "../../Afiliado/page";
import s from './styles.module.sass';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Breadnav from "../breadnav";


function Page({ logar }: { logar: TsetLoginTab }) {
    const fields = [
        ["Nome completo", "nome", "text", "Nome completo ...", "nome", "setNome"],
        ["Foto 3/4", "foto", "file", "Foto", "foto", "setFoto"],
        ["RG", "rg", "number", "", "rg", "setRG"],
        ["CPF", "cpf", "number", "", "cpf", "setCPF"],
        ["Naturalidade", "naturalidade", "text", "", "naturalidade", "setNaturalidade"],
        ["Matrícula", "matricula", "text", "", "matricula", "setMatricula"],
        ["Lote", "lote", "text", "", "lote", "setLote"],
        ["Escola", "escola", "text", "", "escola", "setEscola"],
        ["Email", "email", "email", "exemplo@email.com", "email", "setEmail"],
        ["Telefone", "telefone", "number", "xx xxxx xxxx", "telefone", "setTelefone"],
        ["Nascimento", "nascimento", "date", "", "nascimento", "setNascimento"],
        ["Cidade", "cidade", "text", "", "cidade", "setCidade"],
        ["Uf", "uf", "text", "", "uf", "setUf"],
        ["CEP", "cep", "number", "", "Cep", "setCep"],
        ["Endereço", "endereco", "text", "", "endereco", "setEndereco"],
        ["Formação", "formacao", "text", "", "formacao", "setFormacao"],
        ["Função", "funcao", "text", "", "funcao", "setFuncao"],
        ["Data Admissão", "adminissao", "date", "", "admissao", "setAdmissao"],
        ["Senha", "senha", "password", "", "senha", "setSenha"],
        ["Confirme senha", "confirmesenha", "password", "", "confirmSenha", "setConfirmSenha"],
        ["Declaração de afiliação", "assinatura", "file", "", "assinatura", "setDeclaracao"],
    ];

    const auth = getAuth(firebase_app);

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [cadastroError, setCadastroError] = React.useState("");
    const [textoAfiliar, setTextoAfiliacao] = React.useState("");

    useEffect(() => {
        const d = getDocs(collection(getFirestore(firebase_app), "institucional"));
        d.then(snap => {
            setTextoAfiliacao(snap.docs[0].data()['vantagensAfiliado'])
        });
    })

    const onSubmit = async (data: any) => {
        const storage = getStorage();
        const db = getFirestore(firebase_app);
        const storageRef = ref(storage, `assinaturas/${data.assinatura[0].name}`);

        createUserWithEmailAndPassword(auth, data.email, data.senha)
            .then(() => {
                uploadBytes(storageRef, data.assinatura[0]).then(async (snapshot) => {

                    const docRef = await addDoc(collection(db, "afiliados"), {
                        ativo: false, ...data, assinatura: `assinaturas/${data.assinatura[0].name}`
                    })
                    if (docRef.id) {
                        setCadastroError("Usuário cadastrado com sucesso no sistema, favor, aguarde a aprovação do cadastro para a acessar a área de afiliado")
                        reset(fields.map(f => f[1]))
                    }
                    else {
                        setCadastroError("Erro ao cadastrar sua afiliação, favor, entrar em contato com a administração")
                    }

                });

            })
            .catch(err => {
                setCadastroError("Erro ao cadastrar sua afiliação, email já em uso")
            });

    };


    return (<div className={s['form-group']}>

        <Breadnav></Breadnav>


        <span>Já possui login? <span className="login-form-alt" onClick={(e) => { logar() }}>Então acesse aqui</span></span>
        <span>{cadastroError}</span>


        <FormGroup className={`${s['form']} ${s['form-cadastro']}`}>

            {
                fields.map((field, index) => {
                    return (
                        <TextField
                            data-name={field[1]}
                            key={`field_${field[0]}_${index}`}
                            required

                            id="outlined-required"
                            InputLabelProps={{ shrink: true }}

                            label={field[0]}
                            {...(field[1] == 'confirmesenha' ? {} : register(field[1]))}
                            placeholder={field[3]}
                            type={field[2] == "number" ? "text" : field[2]}
                            inputProps={field[2] == "number" ? { inputMode: 'numeric', pattern: '[0-9]*' } : {}}
                            style={{
                                order: index
                            }}
                        />
                    )
                })
            }

            <TextField
                {...register("estado")}
                select
                label="Estado Civil"
                defaultValue="Solteiro"
                SelectProps={{
                    native: true,
                }}
            >
                <option value="Solteiro">Solteiro</option>
                <option value="Casado">Casado</option>
            </TextField>

            <Button type="submit" style={{ order: 20, flexBasis: "100%" }} onClick={handleSubmit(onSubmit)} variant="outlined">Cadastrar</Button>
        </FormGroup>
        <div className="texto-afiliar mt-40" dangerouslySetInnerHTML={{ __html: textoAfiliar }}></div>

    </div>
    );
}

export default Page;