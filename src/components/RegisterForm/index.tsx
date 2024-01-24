'use client'
import { useRouter } from "next/navigation";
import { userStore } from "@/stores/userStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRegisterValues, registerSchema } from "./schema";
import { FormInput } from "../FormInput";

export const RegisterForm = () => {
    const { registerUser } = userStore((store) => store);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TRegisterValues>({
        resolver: zodResolver(registerSchema),
    });
    const { push } = useRouter();

    const parseRegisterData = async (userData: TRegisterValues) => {
        const success = await registerUser({...userData, licenca_medica: {}});
        success && push("/login");
    };

    return (
        <section>
            <form onSubmit={handleSubmit((formData) => parseRegisterData(formData))}>
                <h2>Cadastrar novo colaborador</h2>
                <FormInput type="text" register={register("nome")} error={errors.nome}>Digite seu nome</FormInput>
                <FormInput type="text" register={register("passaporte")} error={errors.passaporte}>Digite seu Passaporte</FormInput>
                <FormInput type="text" register={register("discord_id")} error={errors.discord_id}>Digite o ID do seu Discord</FormInput>
                <FormInput type="password" register={register("senha")} error={errors.senha}>Digite sua senha</FormInput>
                <FormInput type="text" register={register("confirmPassword")} error={errors.confirmPassword}>Confirme sua Senha</FormInput>
                <button type="submit">CADASTRAR</button>
            </form>
        </section>       
    )
}