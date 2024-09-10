import { makeHttpClient } from "@/factories/makeHttpClient";

import { IHttpError } from "@/infrastructure/httpClient/IHttpError";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/providers/ReactQueryProvider";
import User from "@/domain/models/User";

export const useTest = () => {

    const mutation = useMutation<User, IHttpError, object, User> ({
        mutationFn: (variables: object) => testHttpRequest(variables),
        onMutate: (variables) => {
            return undefined;
        },
        onSuccess: (data, variables, context) => {
        },
        // onError(error, variables, context) {
        //     console.log(error);
        // },
        onSettled: (data, error, variables, context) => {
            // Error or success... doesn't matter!
        },
        retry: 0,
    });

    return mutation; //para fazer o devido uso com relação a camada de view do react
}

async function testHttpRequest(variables: object) {

    const httpClient = makeHttpClient<User>();

    const httpResponse = await httpClient.post(
        '/haha',
        {},
    );

    return httpResponse.data;
}