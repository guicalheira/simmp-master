import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SIMMP - CMS',
  description: 'Sindicato do Magistério Municipal Público de Vitória da Conquista',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        {children}</body>
    </html>
  )
}
