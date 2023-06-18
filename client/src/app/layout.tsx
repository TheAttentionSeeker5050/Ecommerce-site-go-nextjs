'use client'
import HeaderComponent from '@/components/globalComponents/headerComponent'
import './globals.css'
import { Inter } from 'next/font/google'
import FooterComponent from '@/components/globalComponents/footerComponent'
import { useEffect, useState } from 'react'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ecommerce-x: Pet Shop',
  description: 'Pet shop made by Nick Castellano',
}

// stringify the following variable to use it in the html tag
// const htmlClassnames = localStorage.theme === 'dark' ? 'dark' : ''

const useDarkMode = () => {

  // experimenting with dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
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

  return [isDarkMode, toggleDarkMode];
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  
  
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  
  return (
    <html lang="en" className={isDarkMode ? 'dark' : ''}>
      <body className='dark:bg-primary-dark bg-gray-light dark:text-white'>
        <p className='text-lg font-bold text-danger text-center dark:text-orange-400'>This is not a real shop. It is just for showing my web developer skills only. Please purchase your pet products somewhere else.</p> 
        <HeaderComponent toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}
        />
        {children}
        <FooterComponent toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}/>
        <p className='text-lg font-bold text-danger text-center dark:text-orange-400'>This is not a real shop. It is just for showing my web developer skills only. Please purchase your pet products somewhere else.</p> 
      </body>
    </html>
  )
}
