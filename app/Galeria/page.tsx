"use client";

import { TGaleria } from "@/contexts/app";
import firebase_app from "@/app/config";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Image from "next/image";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import Breadnav from "../components/breadnav";

import dynamic from "next/dynamic";
import Sharing from "../components/sharing";
const Footer = dynamic(() => import("../components/Footer"), { ssr: false })


export default function () {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [galeria, setGaleria] = useState({} as TGaleria);
    const db = getFirestore(firebase_app);

    useEffect(() => {
        const q = doc(db, "galerias/" + id);
        getDoc(q).then(snap => {
            setGaleria({ id: snap.id, data: snap.data() } as TGaleria);
        });
    });
    return (
        <><article id="galeria">
            <Breadnav></Breadnav>

            {galeria.data ?
                <><h2>
                    {galeria.data.titulo}
                </h2><SimpleGrid style={{ maxWidth: "90vw", paddingTop: "3rem" }} className="md:w-padrao-container-note xl:w-padrao-container  mx-auto" columns={[2, null, 3]} spacing='25px'>
                        {galeria.data.galeria.map(glr => 
                            <GalleryItem src={glr}/>
                        )}
                    </SimpleGrid></>
                :
                <h2>Galeria vazia</h2>}

        </article>
        <Sharing></Sharing>
        <Footer></Footer></>
    );
}

function GalleryItem({src}:{src:string}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <>
        <img alt="" onClick={onOpen} className="brightness-95 hover:brightness-100 cursor-pointer hover:scale-105 border-2 border-light-accent-green rounded-sm transition-all" src={src} />
        <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent className="w-full">
                    <ModalCloseButton />
                    <ModalBody>
                        <img alt="" className="h-screen mx-auto" src={src} />     
                    </ModalBody>
                </ModalContent>
        </Modal>
        </>
    )
}