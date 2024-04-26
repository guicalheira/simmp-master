"use client";
import CollectionFac from "@/contexts/generics";
import { PostData } from "@/contexts/posts";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("../components/Footer"), { ssr: false })
import Link from "next/link";
import Breadnav from "../components/breadnav";
import Sharing from "../components/sharing";

export default function () {
    const [data, setData]: [PostData[], Dispatch<SetStateAction<PostData[]>>] = useState([] as PostData[]);

    useEffect(() => {
        CollectionFac("publicacao", [["categories", "array-contains", "agenda"]])()
            .then(docs => setData(docs.map(doc => ({ id: doc.id, data: doc.data() }) as PostData)));
    }, [])


    return (
        <><article id="agenda" className="my-12 flex flex-col gap-6">
            <Breadnav></Breadnav>
            <h2>Agenda</h2>
            <Timeline position="alternate">
                {data && data.map(data => (
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Link href={`/Post?id=${data.id}`}>
                                {data.data.titulo+" - "}<time>{new Date(data.data.data.seconds * 1000).toLocaleDateString('pt-BR', { dateStyle: 'full' })}</time>
                            </Link></TimelineContent>
                    </TimelineItem>
                ))}

            </Timeline>
        </article>
        <Sharing></Sharing>
        <Footer></Footer></>
    )
}