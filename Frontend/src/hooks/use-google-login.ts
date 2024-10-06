import { useMutation } from "@tanstack/react-query";
import { useHttpClient } from "./useHttpClient";
import { IHttpClient } from "@/infrastructure/httpClient/IHttpClient";

export const useGoogleLogin = () => {

  const httpClient = useHttpClient<void>();
  const mutation = useMutation({
    mutationKey: ['googleLogin'],
    mutationFn: () => login(httpClient),
    gcTime: 0,
    onMutate: () => {},
    onSettled: (data: void | undefined, error: Error | null) => {},
    onError: (error: Error) => {},
    onSuccess: (data: void) => {},
  });

  return mutation;
}

export async function login (httpClient: IHttpClient<void>) {
  await httpClient.get("/auth/google/login");
}