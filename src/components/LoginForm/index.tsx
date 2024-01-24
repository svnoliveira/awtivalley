'use client'

import { useRouter } from "next/navigation";
import { userStore } from "@/stores/userStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TLoginValues, loginSchema } from "./schema";
import { FormInput } from "../FormInput";

export const LoginForm = () => {
    const { loginUser } = userStore((store) => store);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TLoginValues>({
        resolver: zodResolver(loginSchema),
    });
    const { push } = useRouter();

    const parseLoginData = async (userData: TLoginValues) => {
        const success = await loginUser(userData);
        success && push("/dashboard");
    };

    return (
        <section>
            <form onSubmit={handleSubmit((formData) => parseLoginData(formData))}>
                <FormInput type="text" register={register("username")} error={errors.username}>Digite seu Passaporte</FormInput>
                <FormInput type="text" register={register("password")} error={errors.password}>Digite sua senha</FormInput>
                <button type="submit">Entrar</button>
            </form>
        </section>
    )
}