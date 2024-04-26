"use client"
import dynamic from "next/dynamic";
import Posts from "../components/Posts";
import Breadnav from "../components/breadnav";
import Sharing from "../components/sharing";
const Footer = dynamic(() => import("../components/Footer"), { ssr: false })


export default function () {
    return (
        <><article id="fme"><Breadnav></Breadnav><Posts tag="fme" className="fme-posts"></Posts><Sharing></Sharing></article><Footer></Footer></>
    )
}