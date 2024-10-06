import { SignupForm } from "@/domain/dto/SignupForm";
import { useMutation } from "@tanstack/react-query";
import { useHttpClient } from "./useHttpClient";
import { IHttpClient } from "@/infrastructure/httpClient/IHttpClient";

export const useSignup = () => {

  const httpClient = useHttpClient<void>();

  const mutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: (signupProps: SignupForm) => signup(httpClient, signupProps),
    gcTime: 0,
    onMutate: (variables: SignupForm) => {},
    onSettled: (data: void | undefined, error: Error | null, variables: SignupForm, context: void | undefined) => {},
    onError: (error: Error, variables: SignupForm, context: unknown) => {},
    onSuccess: (data: void, variables: SignupForm, context: void) => {},
  });

  return mutation;
}

export async function signup (httpClient: IHttpClient<void>, requestBody: SignupForm) {
  await httpClient.post("/user/create", requestBody);
}