import InstituctionalContentProvider from "@/contexts/institucional";
import Page from "./page";

export default function (){
    return(
        <InstituctionalContentProvider>
            <Page></Page>
        </InstituctionalContentProvider>
    )
}