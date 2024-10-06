import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import User from "@/domain/models/User";
import { IHttpResponse } from "@/infrastructure/httpClient/IHttpResponse";
import { IHttpError } from "@/infrastructure/httpClient/IHttpError";
import { useHttpClient } from "@/hooks/useHttpClient";
import { useUserStore } from "@/infrastructure/store/zustand/use-user-store";
import { useRouter } from "next/navigation";
import { IHttpClient } from "@/infrastructure/httpClient/IHttpClient";

export const useFetchUser = () => {

  const { user, updateUser, removeUser } = useUserStore();

  const router = useRouter();

  const httpClient = useHttpClient<User>();

  const queryResult = useQuery<IHttpResponse<User>, IHttpError>({
    queryKey: ['fetchUser'],
    queryFn: async () => fetchUserHttpRequest(httpClient),
    staleTime: 5 * 1000,
    gcTime: 60 * 60 * 1000,
    initialData: () => {
      if(user)
        return {
          message: "Usuário da Store",
          data: user
        };
      else return undefined;
    }
  });

  useEffect(()=>{
    if (queryResult.isError && queryResult.error) {
      removeUser();
      router.push('/login');
    } else if (queryResult.data?.data) {
      updateUser(queryResult.data.data);
    }
  }, [queryResult.isError, queryResult.error, queryResult.data]);

  return queryResult;
}

export async function fetchUserHttpRequest(httpClient: IHttpClient<User>) {
  return await httpClient.get('/auth/user');
}