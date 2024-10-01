import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string({
    required_error: "Campo obrigatório",
  }),
  password: z.string({
    required_error: "Campo obrigatório",
  }),
});

export type LoginForm = z.infer<typeof loginFormSchema>;