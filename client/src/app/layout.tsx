'use client'
import HeaderComponent from '@/components/globalComponents/headerComponent'
import './globals.css'
import { Inter } from 'next/font/google'
import FooterComponent from '@/components/globalComponents/footerComponent'
import { useEffect, useState } from 'react'
import MaintenanceModePage from '@/components/pageComponents/maintenanceModePage'
const inter = Inter({ subsets: ['latin'] })
import PageDisclaimerComponent from '@/components/globalComponents/pageDisclaimerComponent'

// export const metadata = {
//   title: 'Ecommerce-x: Pet Shop',
//   description: 'Pet shop made by Nick Castellano',
// }

const useDarkMode = () => {
  
  // experimenting with dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const ToggleDarkMode = () => {
    const newMode = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(newMode === 'dark');
    window.localStorage.setItem('theme', newMode);
    window.document.documentElement.classList.toggle('dark', newMode === 'dark');
  };
  
  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    setIsDarkMode(savedMode === 'dark');
    document.documentElement.classList.toggle('dark', savedMode === 'dark');
  }, []);
  
  return [isDarkMode, ToggleDarkMode];
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  
  
  const [isDarkMode, ToggleDarkMode] = useDarkMode();
  
  return (
    <html lang="en" className={isDarkMode ? 'dark' : ''}>
     
      {/* create a maintenance mode page component, conditional to environment variable MAINTENANCE_MODE */}
      { process.env.MAINTENANCE_MODE == 'true' ?
        <MaintenanceModePage /> : 
      


        <body className='dark:bg-primary-dark w-full   bg-gray-light dark:text-white p-0'>
          <PageDisclaimerComponent ToggleDarkMode={ToggleDarkMode} isDarkMode={isDarkMode} />

          <HeaderComponent ToggleDarkMode={ToggleDarkMode} isDarkMode={isDarkMode}
          />

          {children}
          <FooterComponent 
            isDarkMode={isDarkMode}
            ToggleDarkMode={ToggleDarkMode} 
            />
          
          <PageDisclaimerComponent ToggleDarkMode={ToggleDarkMode} isDarkMode={isDarkMode} />
          
        </body>
      }
    </html>
  )
}
