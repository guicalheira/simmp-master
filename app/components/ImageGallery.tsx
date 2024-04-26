import { useState } from "react"

export default function ({ imagens }: { imagens: string[] }) {
    const [active, setActiveIndex] = useState(0);
    const prevImage = () =>{
        let prevIndex = active;
        prevIndex = prevIndex-1<0? imagens.length-(2) : active - 1;
        setActiveIndex(prevIndex);
    }
    const nextImage = () =>{
        let nextIndex = active;
        nextIndex = nextIndex+2>imagens.length? 0 : active + 1;
        setActiveIndex(nextIndex);
    }

    return (
        <div id="custom-controls-gallery" className="relative w-full" data-carousel="slide">
            <div style={{ height: "70vh" }} className="relative overflow-hidden rounded-lg md:h-96">
                {imagens.map((src, index) =>
                    <div className="duration-700 ease-in-out gallery-item" key={`gallery_item+${index}`} data-carousel-item={`${index == active ? "active" : ""}`}>
                        <img src={src} className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
                    </div>
                )}

            </div>
            <div className="flex justify-center items-center pt-4">
                <button type="button" className="flex justify-center items-center mr-4 h-full cursor-pointer group focus:outline-none" onClick={prevImage}>
                    <span className="text-gray-400 hover:text-gray-900 group-focus:text-gray-900 group-focus:text-accent-green">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                        </svg>
                        <span className="sr-only">Anterior</span>
                    </span>
                </button>
                <button type="button" className="flex justify-center items-center h-full cursor-pointer group focus:outline-none"  onClick={nextImage}>
                    <span className="text-gray-400 hover:text-gray-900 group-focus:text-gray-900 group-focus:text-accent-green">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                        <span className="sr-only">Próximo</span>
                    </span>
                </button>
            </div>
        </div>
    )
}