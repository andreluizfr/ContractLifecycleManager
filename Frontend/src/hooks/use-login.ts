import { LoginForm } from "@/domain/dto/LoginForm";
import { makeHttpClient } from "@/factories/makeHttpClient";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (loginProps: LoginForm) => login(loginProps),
    gcTime: 0,
    onMutate: (variables: LoginForm) => {},
    onSettled: (data: void | undefined, error: Error | null, variables: LoginForm, context: void | undefined) => {},
    onError: (error: Error, variables: LoginForm, context: unknown) => {},
    onSuccess: (data: void, variables: LoginForm, context: void) => {},
  });

  return mutation;
}

export async function login (requestBody: LoginForm) {

  const httpClient = makeHttpClient<void>();

  await httpClient.post("/auth/login", requestBody);
}