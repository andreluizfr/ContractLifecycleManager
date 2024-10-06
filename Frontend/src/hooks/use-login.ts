import { LoginForm } from "@/domain/dto/LoginForm";
import { useMutation } from "@tanstack/react-query";
import { useHttpClient } from "./useHttpClient";
import { IHttpClient } from "@/infrastructure/httpClient/IHttpClient";
import { useEffect } from "react";
import _ from 'lodash';
import { useRouter } from "next/navigation";

export const useLogin = () => {

  const httpClient = useHttpClient<void>();
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (loginProps: LoginForm) => login(httpClient, loginProps),
    gcTime: 0,
    onMutate: (variables: LoginForm) => {},
    onSettled: (data: void | undefined, error: Error | null, variables: LoginForm, context: void | undefined) => {},
    onError: (error: Error, variables: LoginForm, context: unknown) => {},
    onSuccess: (data: void, variables: LoginForm, context: void) => {},
  });

  useEffect(()=>{
    if(mutation.isSuccess) {
      _.delay(() => router.push('/contratos'), 1000);
    }

  }, [mutation.isSuccess]);

  return mutation;
}

export async function login (httpClient: IHttpClient<void>, requestBody: LoginForm) {
  await httpClient.post("/auth/login", requestBody);
}