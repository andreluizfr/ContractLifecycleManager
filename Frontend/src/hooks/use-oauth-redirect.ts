import { useUserStore } from "@/infrastructure/store/zustand/use-user-store";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export const useOAuthRedirect = (accessToken: string) => {

  const router = useRouter();
  const { updateAccessToken } = useUserStore();

  useEffect(()=>{
    updateAccessToken(accessToken);

    router.push('/contratos');
  }, []);
}