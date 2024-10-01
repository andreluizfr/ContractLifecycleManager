import { SignupForm } from "@/domain/dto/SignupForm";
import { makeHttpClient } from "@/factories/makeHttpClient";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {

  const mutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: (signupProps: SignupForm) => signup(signupProps),
    gcTime: 0,
    onMutate: (variables: SignupForm) => {},
    onSettled: (data: void | undefined, error: Error | null, variables: SignupForm, context: void | undefined) => {},
    onError: (error: Error, variables: SignupForm, context: unknown) => {},
    onSuccess: (data: void, variables: SignupForm, context: void) => {},
  });

  return mutation;
}

export async function signup (requestBody: SignupForm) {

  const httpClient = makeHttpClient<void>();

  await httpClient.post("/user/create", requestBody);
}