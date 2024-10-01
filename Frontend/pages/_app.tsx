import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import { ReactQueryProvider } from '@/providers/ReactQueryProvider'
import { ReduxProvider } from '@/providers/ReduxProvider'
import ThemeProvider from '@/providers/ThemeProvider'
import { ToastContainer } from 'react-toastify'
import { Toaster } from '@/components/ui/toaster'
import Header from '@/components/ui/custom/header'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Loading from './loading'

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleStart = () => setLoading(true);
  const handleStop = () => setLoading(false);

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <ReduxProvider>
      <ReactQueryProvider>
        <ThemeProvider>
          {loading ?
            <Loading />
            :
            <>
              <Header />
              <Component {...pageProps} />
            </>
          }
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
