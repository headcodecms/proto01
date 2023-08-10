import { VisualEditing } from '@headcode/client'
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
        {children}
        <VisualEditing />
      </body>
    </html>
  )
}

export default Layout
