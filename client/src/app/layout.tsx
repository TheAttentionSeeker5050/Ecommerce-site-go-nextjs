import HeaderComponent from '@/components/globalComponents/headerComponent'
import './globals.css'
import { Inter } from 'next/font/google'
import FooterComponent from '@/components/globalComponents/footerComponent'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ecommerce-x: Pet Shop',
  description: 'Pet shop made by Nick Castellano',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en" >
      <body className={inter.className}>
        <p className='text-lg font-bold text-danger text-center'>This is not a real shop. It is just for showing my web developer skills only. Please purchase your pet products somewhere else.</p> 
        <HeaderComponent />
        {children}
        <FooterComponent />
      </body>
    </html>
  )
}
