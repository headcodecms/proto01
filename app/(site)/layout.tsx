import { VisualEditing } from '@headcode/client'
import { Section } from '@headcode/server'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Homepage',
  description: 'This is the prototype homepage'
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Section name="global.navigation" />

        {children}

        <Section name="global.footer" />
        <VisualEditing />
      </body>
    </html>
  )
}

export default Layout
