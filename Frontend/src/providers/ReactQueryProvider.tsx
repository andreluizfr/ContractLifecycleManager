import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import i18next from '@/i18n';
import { toast } from 'react-toastify';

interface ProviderProps {
    children?: React.ReactNode,
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            enabled: true,
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 0,
            gcTime: 1000 * 60 * 60 * 24 //24 horas
        },
        mutations: {
            onError(error, variables, context) {
                toast.error(i18next.t(error.message) , {
                    position: "top-center",
                    hideProgressBar: true
                })
            }
        }
    },
});

export const ReactQueryProvider = ({children}: ProviderProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {process.env.NODE_ENV === "development" &&
                <ReactQueryDevtools initialIsOpen={false} />
            }
        </QueryClientProvider>
    );
}