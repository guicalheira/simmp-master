"use client"
import { Box, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import firebase_app from "../config";
import { DocumentData, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { PostData } from "@/contexts/posts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CollectionFac from "@/contexts/generics";

export default function ODestaque() {
    const [data, setData] = useState({} as PostData)
    const router = useRouter();

    useEffect(() => {
        CollectionFac("publicacao", [["destaque", "==", true]])()
        .then(docs => {
            console.log(docs[0]);
            return (docs[0]) ? setData({ id:docs[0].id, data: docs[0].data()} as PostData) : null;
        }) 
    }, [])

    if (!data.id) {
        return <></>
    }
    const subTexto = data.data.texto ? data.data.texto.substring(0, 200) : ""
    const dataPub = data.data ? new Date(data.data.data.seconds * 1000).toLocaleDateString('pt-BR', { dateStyle: 'full' }) : ""
    return (
        data &&
        <Card className="destaque  transition-all"
            onClick={()=>{router.push(`/Post?id=${data.id}`)}}
            sx={{ cursor:"pointer", display: "flex", flexDirection: "row", gridArea: "destaque", width: "115%" }}
        >
            <CardMedia
                sx={{ flexBasis: "200%", backgroundPosition: "left", backgroundSize: "cover" }}
                image={data.data.capa}
                title={data.data.titulo}
            />
            <Box
                sx={{ display: 'flex', flexDirection: "column", flexBasis:"130%" }}
            >
                <CardHeader
                    title={data.data.titulo}
                    subheader={dataPub}
                />
                <CardContent style={{ height: "100%" }}>
                    <Typography variant="body2" color="text.secondary" style={{
                        height: "100%",
                        display: "flex",
                        fontSize: "12pt",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }}>
                        <div className="destaque-body" dangerouslySetInnerHTML={{ __html: subTexto+"..." }}></div>
                        <Link href={`/Post?id=${data.id}`} style={{ textAlign: "right" }}>ler na integra...</Link>
                    </Typography>
                </CardContent>

            </Box>
        </Card >
    )
}