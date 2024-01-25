'use client'

import { registroStore } from "@/stores/registroDePonto";
import { useForm } from "react-hook-form";
import { TPontoValues, pontoSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../FormInput";
import { userStore } from "@/stores/userStore";
import { useEffect } from "react";


export const PontoForm = () => {
    const { addPonto } = registroStore((store) => store);
    const userId = userStore((store) => store.userData?.user.id);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<TPontoValues>({
        resolver: zodResolver(pontoSchema),
    });

    const formatHorario = (texto: string) => {
        const newTexto = texto.replace(/\s/g, ' ');
        const regexData = /Data: (\d{1,2}\/\d{1,2}\/\d{4})/;
        const regexEntrada = /ENTRADA: (\d{1,2}:\d{1,2}:\d{1,2})/;
        const regexSaida = /SAÍDA: (\d{1,2}:\d{1,2}:\d{1,2})/;

        const matchData = newTexto.match(regexData);
        const matchEntrada = newTexto.match(regexEntrada);
        const matchSaida = newTexto.match(regexSaida);

        const informacoes = {
            data: matchData ? matchData[1] : '',
            entrada: matchEntrada ? matchEntrada[1] : '',
            saida: matchSaida ? matchSaida[1] : ''
        };
        const dateParts = informacoes.data.split("/");
        const formattedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
        if (informacoes.entrada) {
            return `${formattedDate} ${informacoes.entrada}`;
        } else if (informacoes.saida) {
            return `${formattedDate} ${informacoes.saida}`;
        }
    }

    const parsePontoData = async (formData: TPontoValues) => {
        const pontoData = {
            entrada: formatHorario(formData.entrada) || '',
            saida: formatHorario(formData.saida) || '',
            justificativa: formData.justificativa || '-'
        }
        await addPonto(pontoData, userId!);
    };

    useEffect(() => {
        reset({
            entrada: '',
            saida: '',
            justificativa: ''
        })
    }, [isSubmitSuccessful])

    return (
        <section>
            <form onSubmit={handleSubmit((formData) => parsePontoData(formData))}>
                <h2>Registro de Ponto</h2>
                <FormInput type="text" register={register("entrada")} error={errors.entrada}>Entrada</FormInput>
                <FormInput type="text" register={register("saida")} error={errors.entrada}>Saída</FormInput>
                <FormInput type="text" register={register("justificativa")} error={errors.justificativa}>Justificativa</FormInput>
                <button type="submit">REGISTRAR PONTO</button>
            </form>
        </section>
    )
}