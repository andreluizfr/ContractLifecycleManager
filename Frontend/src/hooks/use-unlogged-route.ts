import { useUserStore } from "@/infrastructure/store/zustand/use-user-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useOnlyUnloggedRoute = () => {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(()=>{
    if(user) router.push('/contratos');
  }, [user]);
}