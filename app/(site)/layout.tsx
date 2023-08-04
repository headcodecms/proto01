import { VisualEditing } from '@headcode/client'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Homepage',
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
