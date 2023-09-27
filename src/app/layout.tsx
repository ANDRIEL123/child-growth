'use client'

import { AuthProvider } from '@/contexts/Auth';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import { DialogProvider } from '@/contexts/Dialog';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Child Growth',
  description: 'Aplicação Child Growth',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <DialogProvider>
          <body className={inter.className}>
            {children}
            <ToastContainer
              position="bottom-left"
              theme="dark"
            />
          </body>
        </DialogProvider>
      </AuthProvider>
    </html>
  )
}
