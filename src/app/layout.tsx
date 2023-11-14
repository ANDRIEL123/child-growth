'use client'

import { AuthProvider } from '@/contexts/Auth';
import { DialogProvider } from '@/contexts/Dialog';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { Inter } from 'next/font/google';
import { GlobalLoading } from 'react-global-loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <DialogProvider>
            <body className={inter.className}>
              {children}
              <ToastContainer
                position="bottom-left"
                theme="dark"
              />
              <GlobalLoading />
            </body>
          </DialogProvider>
        </AuthProvider>
      </QueryClientProvider>
    </html>
  )
}
