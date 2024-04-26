"use client";

import React, { useCallback } from "react";

import { User as FirebaseUser } from "firebase/auth";
import {
    Authenticator,
    buildCollection,
    buildProperty,
    EntityReference,
    FirebaseCMSApp,
    PropertyPreviewProps
} from "firecms";
import CMSTextEditor from '@/app/components/CMSTextEditor'

import "typeface-rubik";
import "@fontsource/ibm-plex-mono";

const firebaseConfig = {

    apiKey: "AIzaSyBvBmPKTc1xR5PdwAemX9KFLqRX4goG_WM",

    authDomain: "simmpfirebase.firebaseapp.com",

    databaseURL: "https://simmpfirebase-default-rtdb.firebaseio.com",

    projectId: "simmpfirebase",

    storageBucket: "simmpfirebase.appspot.com",

    messagingSenderId: "41649693709",

    appId: "1:41649693709:web:21ffe4efc087d9967ce144"


};

const banners = buildCollection({
    icon: "MovieCreation",
    path: "banners",
    name: "Banners",
    permissions: {
        edit: true,
        create: true,
        delete: true
    },
    properties: {
        galeria: {
            name: "Galeria de imagens",
            dataType: "array",
            of: {
                dataType: "string",
                storage: {
                    storagePath: "imagens",
                    acceptedFiles: ["image/*"],
                    metadata: {
                        cacheControl: "max-age=1000000"
                    },
                    storeUrl: true
                }
            }
        },
    }
})
const institPageContent = buildCollection({
    icon: "AccountBalance",
    path: "institucional",
    name: "Conteúdo Institucional",
    permissions: {
        edit: true,
        create: false,
        delete: true
    },
    properties: {
        historia: {
            name: "História",
            description: "Texto sobre a história do sindicato",
            dataType: "string",
            Field: CMSTextEditor,
        },
        diretoria: {
            name: "Diretoria",
            description: "Conteúdo sobre diretoria do sindicato",
            dataType: "string",
            Field: CMSTextEditor,
        },
        estatuto: {
            name: "Estatuto",
            description: "Estatuto do sindicato listado",
            dataType: "string",
            storage: {
                storagePath: "estatutos",
                acceptedFiles: ['application/pdf'],
                metadata: {
                    cacheControl: "max-age=1000000"
                },
                fileName: (context) => {
                    return context.file.name;
                },
                storeUrl: true
            }
        },

        legislacao: {
            name: "Legislação",
            dataType: "array",
            of: {
                dataType: "map",
                properties: {
                    nome: {
                        name: "Nome de acompanhamento",
                        dataType: "string"
                    },
                    link: {
                        name: "Link",
                        dataType: "string"
                    },
                    arquivo: {
                        name: "Arquivo",
                        dataType: "string",
                        storage: {
                            storagePath: "legislação",
                            acceptedFiles: ['application/pdf'],
                            metadata: {
                                cacheControl: "max-age=1000000"
                            },
                            fileName: (context) => {
                                return context.file.name;
                            },
                            storeUrl: true
                        }
                    },

                }

            }
        },

        escolasECreches: {
            name: "Escolas e Creches",
            description: "Escolas e Creches associadas ao sindicato",
            dataType: "array",
            of: {
                dataType: "map",
                properties: {
                    nome: {
                        name: "Nome de acompanhamento",
                        dataType: "string"
                    },
                    arquivo: {
                        name: "Arquivo",
                        dataType: "string",
                        storage: {
                            storagePath: "crecheEscola",
                            acceptedFiles: ['application/pdf'],
                            metadata: {
                                cacheControl: "max-age=1000000"
                            },
                            fileName: (context) => {
                                return context.file.name;
                            },
                            storeUrl: true
                        }
                    },

                }
            }
        },

        convenios: {
            name: "Convênios",
            description: "Convênios para afiliados",
            dataType: "array",
            of: {
                dataType: "map",
                name: "Convênio",
                properties: {
                    convenioNome: {
                        name: "Convênio",
                        dataType: "string"
                    },
                    endreco: {
                        name: "Endereço",
                        dataType: "string"
                    },
                    telefone: {
                        name: "Telefone",
                        dataType: "string"
                    }
                },
                expanded: true
            }
        },

        vantagensAfiliado: {
            name: "Vantagens como afiliado",
            description: "Vantagens como afiliado ao sindicato",
            dataType: 'string',
            Field: CMSTextEditor,
        }

    }
});

export type TAfiliado = {
    nome: string,
    ativo: boolean,
    foto: string,
    rg: string,
    cpf: string,
    naturalidade: string,
    insc: string,
    matricula: string,
    lote: string,
    filiacao: string,
    email: string,
    senha: string,
    telefone: string,
    nascimento: string,
    endereco: string,
    uf: string,
    cidade: string,
    cep: string,
    formacao: string,
    cargo: string,
    admissao: string,
    assinatura: string
}

export function CustomPasswordPreview({
    value, property, size
}: PropertyPreviewProps<string>)
{
    return (
        value ? <strong>**********</strong>: <></>
    );
}

const afiliados = buildCollection({
    icon: "ContactMail",
    path: "afiliados",
    name: "Afiliados",
    singularName: "Afiliado",
    permissions: {
        edit: true,
        create: true,
        delete: true
    },
    properties: {
        nome: {
            name: "Nome Completo",
            validation: { required: true },
            dataType: "string"
        },
        ativo: {
            name: "Ativo",
            dataType: 'boolean'
        },
        foto: {
            name: "Foto",
            dataType: "string",
            storage: {
                storagePath: "fotos_carteiras",
                acceptedFiles: ["image/*"],
                metadata: {
                    cacheControl: "max-age=1000000"
                },
                fileName: (context) => {
                    return context.file.name;
                },
                storeUrl: true
            }
        },
        rg: {
            name: "RG",
            validation: { required: true },
            dataType: "string"
        },
        cpf: {
            name: "CPF",
            validation: { required: true },
            dataType: "string"
        },
        naturalidade: {
            name: "Naturalidade",
            validation: { required: true },
            dataType: "string"
        },
        insc: {
            name: "Inscrição sindical",
            dataType: "string"
        },
        matricula: {
            name: "Matrícula",
            validation: { required: true },
            dataType: "string"
        },
        lote: {
            name: "Lote",
            validation: { required: true },
            dataType: "string"
        },
        filiacao: {
            name: "Filiacao",
            validation: { required: true },
            dataType: "string"
        },
        email: {
            name: "Email",
            validation: { required: true },
            dataType: "string"
        },
        senha: {
            name: "Senha",
            validation: { required: true },
            dataType: "string",
            readOnly: true,
            Preview: CustomPasswordPreview
        },
        telefone: {
            name: "Telefone",
            validation: { required: true },
            dataType: "string"
        },
        nascimento: {
            name: "Nascimento",
            validation: { required: true },
            dataType: "string"
        },
        endereco: {
            name: "Endereço",
            validation: { required: true },
            dataType: "string"
        },
        uf: {
            name: "UF",
            validation: { required: true },
            dataType: "string"
        },
        bairro: {
            name: "Bairro",
            validation: { required: true },
            dataType: "string"
        },
        cidade: {
            name: "Cidade",
            validation: { required: true },
            dataType: "string"
        },
        CEP: {
            name: "CEP",
            validation: { required: true },
            dataType: "string"
        },
        formacao: {
            name: "Formação",
            validation: { required: true },
            dataType: "string"
        },
        cargo: {
            name: "Função",
            validation: { required: true },
            dataType: "string"
        },
        admissao: {
            name: "Adminissão",
            validation: { required: true },
            dataType: "date"
        },
        assinatura: {
            name: "Assinatura",
            validation: { required: true },
            dataType: "string",
            storage: {
                storagePath: "assinaturas",
                acceptedFiles: ['application/pdf'],
                metadata: {
                    cacheControl: "max-age=1000000"
                },
                fileName: (context) => {
                    return context.file.name;
                },
                storeUrl: true
            }
        }
    }
})

export type TPublicacao = {
    titulo: string,
    data: string,
    categories: string[],
    destaque: boolean,
    texto: string,
    capa: string,
    galeria: string[]
}
const publicacaoCollection = buildCollection({
    icon: "Article",
    path: "publicacao",
    name: "Publicações",
    singularName: "Publicação",
    permissions: {
        edit: true,
        create: true,
        delete: true
    },
    properties: {
        titulo: {
            name: "Título",
            validation: { required: true },
            dataType: "string"
        },

        data: {
            name: "Data de publicação",
            dataType: "date",
            validation: { required: true },
        },
        categories: {
            name: "Categoria",
            description: "Categoria de publicação",
            longDescription: "Categoria na qual a publicação será depositada no website",
            validation: { required: true },
            dataType: "array",
            of: {
                dataType: "string",
                enumValues: {
                    noticias: "Notícias",
                    fme: "FME",
                    afiliados: "Afiliados",
                    comunicados: "Comunicados",
                    agenda: "Agenda",
                }
            }
        },
        destaque: {
            name: "Destaque (?)",
            dataType: "boolean",
        },
        texto: {
            name: "Texto",
            description: "Corpo de texto da publicação",
            dataType: "string",
            Field: CMSTextEditor,
        },
        capa: {
            name: "Capa",
            description: "Imagem capa da publicação",
            dataType: "string",
            storage: {
                storagePath: "imagens",
                acceptedFiles: ["image/*"],
                metadata: {
                    cacheControl: "max-age=1000000"
                },
                fileName: (context) => {
                    return context.file.name;
                },
                storeUrl: true
            }
        },
        galeria: {
            name: "Galeria de imagens",
            dataType: "array",
            of: {
                dataType: "string",
                storage: {
                    storagePath: "imagens",
                    acceptedFiles: ["image/*"],
                    metadata: {
                        cacheControl: "max-age=1000000"
                    },
                    storeUrl: true
                }
            }
        },

    }
})

export type TGaleria = {
    id: string,
    data: {
        titulo: string,
        desc: string,
        capa: string,
        galeria: string[]
    }
}

const galeriaCollection = buildCollection({
    icon: "PhotoLibrary",
    path: "galerias",
    name: "Galerias do site",
    permissions: {
        edit: true,
        create: true,
        delete: true
    },
    properties: {
        titulo: {
            name: "Título",
            description: "Título da galeria",
            dataType: "string"
        },
        desc: {
            name: "Descrição",
            description: "Descrição da Galeria",
            dataType: "string",
            Field: CMSTextEditor,
        },
        visualizacoes: {
            name: "Visualizações",
            description: "Descrição da Galeria",
            dataType: "string",
            Field: CMSTextEditor,
            hideFromCollection: true
        },
        capa: {
            name: "Capa",
            description: "Imagem capa da publicação",
            dataType: "string",
            storage: {
                storagePath: "imagens",
                acceptedFiles: ["image/*"],
                metadata: {
                    cacheControl: "max-age=1000000"
                },
                fileName: (context) => {
                    return context.file.name;
                },
                storeUrl: true
            }
        },
        galeria: {
            name: "Galeria de imagens",
            dataType: "array",
            of: {
                dataType: "string",
                storage: {
                    storagePath: "imagens",
                    acceptedFiles: ["image/*"],
                    metadata: {
                        cacheControl: "max-age=1000000"
                    },
                    storeUrl: true
                }
            }
        },
    }
})

const calendarioCollection = buildCollection({
    icon: "CalendarMonth",
    path: "calendarios",
    name: "Calendários anuais",
    permissions: {
        edit: true,
        create: true,
        delete: true
    },
    properties: {


        titulo: {
            name: "Título",
            description: "Título para Calendário anual",
            dataType: "string"
        },

        atual: {
            name: "Atual (?)",
            dataType: "boolean",
        },

        arquivo: {
            name: "Arquivo",
            dataType: "string",
            storage: {
                storagePath: "legislação",
                acceptedFiles: ['application/pdf'],
                metadata: {
                    cacheControl: "max-age=1000000"
                },
                fileName: (context) => {
                    return context.file.name;
                },
                storeUrl: true
            }
        },

    }

})


export default function CMS() {

    const myAuthenticator: Authenticator<FirebaseUser> = useCallback(async ({
        user,
        authController
    }) => {
        const sampleUserRoles = await Promise.resolve(["admin"]);
        authController.setExtra(sampleUserRoles);

        return true;
    }, []);

    return <FirebaseCMSApp
        name={"Simmp"}
        basePath={"/cms"}
        logo="/logo incompleta branca.png"
        authentication={myAuthenticator}
        collections={[afiliados, institPageContent, publicacaoCollection, galeriaCollection, calendarioCollection, banners]}
        firebaseConfig={firebaseConfig}
    />;
}