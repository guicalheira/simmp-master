'use client'
import React, { useContext } from "react";
import {signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { Button, FormGroup, TextField } from "@mui/material";
import { TsetLoginTab } from "../../Afiliado/page";
import s from './styles.module.sass';
import { Afiliado, UserContext } from "@/contexts/user";
import Breadnav from "../breadnav";
import { AfiliadosContext } from "@/contexts/afiliados";

function Page({cadastrar}:{cadastrar:TsetLoginTab}) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loginError, setLoginError] = React.useState("");
    const auth = getAuth();
    const afiliadosContext = useContext(AfiliadosContext); 
    const {setUser} = useContext(UserContext);

    const handleForm = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        console.log(email, password, afiliadosContext);

        const userFind = afiliadosContext.find((af:Afiliado) => (af.frente.email === email && af.atras.senha == password ) )

        if(!userFind){
            setLoginError('Usuário não encontrado ou cadastro ainda não concluído pela administração, favor, entrar em contato se isso parecer um erro');
        }
        else{
            setLoginError('');
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            if(user){
                setLoginError('Seja bem vindo, '+userFind.frente.nome);
                setUser(userFind);
            }
        }
    }

    function formKeyUp(event:any) {

        if (event.charCode === 13) {
    
          handleForm(event);
    
        }
    
    }

    return (
        <div id="login" className={s['form-group']} onKeyUp={formKeyUp}>
            <Breadnav></Breadnav>
            <span>Ainda não se afiliou? <span className="login-form-alt" onClick={() => {cadastrar()}}>Preencha esse cadastro</span></span>
            <span> {loginError} </span>
            <FormGroup className={`${s['form']} ${s['form-login']}`}>
                <TextField
                    required
                    InputLabelProps={{ shrink: true }}

                    label="Email"
                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => {
                        setEmail(e.target.value); setLoginError('');}}
                    placeholder="exemplo@email.com" 
                    />
                <TextField
                    required
                    label="Senha"
                    InputLabelProps={{ shrink: true }}
                    type="password"
                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => {
                        setPassword(e.target.value); setLoginError('');}}
                    placeholder="********" 
                    />
                <Button onClick={handleForm} type="submit" variant="outlined">Logar</Button>
            </FormGroup>
        </div>

    );
}

export default Page;
