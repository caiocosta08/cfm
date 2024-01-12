import './globals.css'

export const metadata = {
  title: 'Inscrição CFM',
  description: 'Realize sua inscrição no Evento Livres de Toda Maldição com Roberto Tannus e Padre George Batista.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
