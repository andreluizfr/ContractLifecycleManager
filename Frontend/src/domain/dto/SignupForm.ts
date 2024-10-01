import { z } from "zod";

export const signupFormSchema = z.object({
  email: z.string().email({
    message: "Formato de e-mail inválido.",
  }),
  password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,{
    message: "A senha deve possuir pelo menos 1 letra minúscula, 1 letra maiúscula, 1 caractere especial ($*&@#) e 8 caracteres totais.",
  }),
});

export type SignupForm = z.infer<typeof signupFormSchema>;