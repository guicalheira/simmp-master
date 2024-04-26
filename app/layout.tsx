import type { Metadata } from 'next'
import Head from 'next/head'
import Nav from './components/Nav'
import "./styles.sass"
import 'leaflet/dist/leaflet.css'
import { Providers } from './providers'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material'


export const metadata: Metadata = {
  title: 'SIMMP - Sindicato do Magistério Municipal Público de Vitória da Conquista',
  description: 'Sindicato do Magistério Municipal Público de Vitória da Conquista',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.0/flowbite.min.css" rel="stylesheet" />
      </Head>
      <body>
        <div id="slot">
          <Providers>
            <Nav></Nav>
            {children}
          </Providers>
        </div>
        <script src="https://kit.fontawesome.com/5ecf56ed6f.js" crossOrigin="anonymous"></script>
        <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v17.0" nonce="MG4eJEAG"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.0/flowbite.min.js"></script>
      </body>
    </html>
  )
}
