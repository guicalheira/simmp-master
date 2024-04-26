"use client"

import CollectionFac from "@/contexts/generics";
import { useEffect, useState } from "react";
import { TGaleria } from "@/contexts/app";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Sharing from "../components/sharing";
import Link from "next/link";
const Footer = dynamic(() => import("../components/Footer"), { ssr: false })


export default function() {
    const [data, setData] = useState([] as TGaleria[]);

    useEffect(() => {
        CollectionFac("galerias", [])()
            .then(docs => setData(docs.map(doc => ({ id:doc.id, data:doc.data()} as TGaleria))));
    }, [])

    return (
        <><article id="galerias">
            <h2>Galerias</h2>
            {data.length > 0 ?
                <SimpleGrid style={{ maxWidth: "90vw", paddingTop: "3rem" }} className="md:w-padrao-container-note xl:w-padrao-container  mx-auto" columns={[2, null, 3]} spacing='40px'>
                    {data.map(doc  => {
                        return (
                            <Link href={`/Galeria?id=${doc.id}`} style={{height:300, width:300, backgroundImage: `url(${doc.data.capa})` }} className="galerias-item">
                                <h3>
                                    <span>
                                        {doc.data.titulo}
                                    </span>
                                    <small style={{position:"absolute", marginRight:'30px'}}>{doc.data.galeria.length} fotos</small>
                                </h3>
                                
                            </Link>
                        );
                    })}
                </SimpleGrid>
                :
                <Container maxWidth={1200} paddingY={25} className="mx-auto">
                    <h3>Sem galerias no site</h3>
                </Container>}
        </article><Sharing></Sharing><Footer></Footer></>
    )
}