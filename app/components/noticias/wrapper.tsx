import { SimpleGrid } from "@chakra-ui/react";
import Noticia from "./noticia";

export default function Noticias(){
    return(
        <SimpleGrid columns={[2, null, 3]} spacing='40px'>
            {
                // anexar posts de notícias públicas
                <Noticia></Noticia>
            }
        </SimpleGrid>
    )
}