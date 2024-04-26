import dynamic from "next/dynamic"

const Footer = dynamic(() => import("../components/Footer"), { ssr: false })

export default function({children}:any){ 
    return <><div className="mx-auto my-10 justify-center flex" id="carteirinha-impressao">{children}</div><Footer></Footer></>
}