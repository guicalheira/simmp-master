"use client";
import { useContext } from "react";
import Carteirinha from "../components/Carteirinha";
import { UserContext } from "@/contexts/user";
import {FaPrint} from 'react-icons/fa';

export default function () {
    const { user } = useContext(UserContext);
    return (

        <div className="flex flex-col">
        <div id="carteirinha-wrapper" className=" flex-col w-full" style={{display:'flex'}}>
                <Carteirinha dados={user}></Carteirinha>
            </div>
            <h2 id="printing-message" className="cursor-pointer flex justify-end mt-4 text-accent-green" onClick={() => { window.print(); }}>
            <FaPrint/>
            </h2></div>
    )
}