"use client";
import { useContext, useEffect, useState } from "react";
import Cadastrar from '../components/login/Cadastrar';
import Logar from '../components/login/Logar';
import { getAuth } from "firebase/auth";
import firebase_app from "../config";
import Posts from "../components/Posts";
import Carteirinha from "../components/Carteirinha";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { UserContext } from "@/contexts/user";
import { InstitucionalContext } from "@/contexts/institucional";
import Breadnav from "../components/breadnav";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
const Footer = dynamic(() => import("../components/Footer"), { ssr: false })

export type TsetLoginTab = () => void

export default function Afiliado() {
    const searchParams = useSearchParams()
    const _loginTab = searchParams.get('login')

    const { user } = useContext(UserContext);
    const [currentUser, setUser] = useState(user);
    const [loginTab, setLoginTab] = useState(_loginTab || false);
    const { data } = useContext(InstitucionalContext);
    const router = useRouter();

    useEffect(() => {
        setUser(user);
        setTimeout(()=> router.push("#afiliados"), 1000);
    }, [user])

    if (currentUser == null)
        return <></>

    return (<>
        {currentUser.frente.nome.length > 0 ?
            <article id="afiliados" className="my-12 flex flex-col gap-6">
                <Breadnav />
                <Tabs>
                    <TabList>
                        <Tab>Posts</Tab>
                        <Tab>Videos</Tab>
                        <Tab>Links</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <h2>Posts</h2>
                            <Posts className="posts" tag="afiliados"></Posts>
                        </TabPanel>
                        <TabPanel>
                            <h2>Videos</h2>
                        </TabPanel>
                        <TabPanel>
                            <h2>Links</h2>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </article>
            : <article id="login_layout">
                <div dangerouslySetInnerHTML={{ __html: data.vantagensAfiliado }} />
                {
                    loginTab ? <Logar cadastrar={() => { setLoginTab(false) }}></Logar>
                        : <Cadastrar logar={() => { setLoginTab(true) }}></Cadastrar>
                }</article>
        }
        <Footer></Footer>
    </>)
}