import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import { ReactQueryProvider } from '@/providers/ReactQueryProvider'
import { ReduxProvider } from '@/providers/ReduxProvider'
import ThemeProvider from '@/providers/ThemeProvider'
import { ToastContainer } from 'react-toastify'
import { Toaster } from '@/components/ui/toaster'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <ReactQueryProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
        <ToastContainer
          autoClose={2000} //mesmo tempo do redirecionamento feito pelo serviço do login
          newestOnTop={true}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          hideProgressBar={false}
          theme="dark"
        />
        <Toaster />
      </ReactQueryProvider>
    </ReduxProvider>
  )
}
