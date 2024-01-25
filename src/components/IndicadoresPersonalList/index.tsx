'use client'

import { userStore } from "@/stores/userStore"
import { useEffect, useState } from "react"
import { IndicadoresPontoCard } from "../IndicadoresPontoCard"
import { IRegistroDePonto } from "@/stores/@registroDePontoTypes"
import { useForm } from "react-hook-form"
import { TIndicadorValues, indicadorSchema } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { registroStore } from "@/stores/registroDePonto"
import { getTimeFromSeconds, getTotalSeconds } from "@/utils/operations"

export const IndicadoresPersonalList = () => {
    const user = userStore((state) => state.userData?.user)
    const { pontoList, loadPontos } = registroStore((state) => state)
    const userPontoList = pontoList.filter((ponto) => ponto.user === user?.id)
    const [dateList, setDateList] = useState<IRegistroDePonto[]>([])
    const [totalHours, setTotalHours] = useState<string>("")

    useEffect(() => {
        const loadList = () => {
            if (user) {
                loadPontos();
                const list = userPontoList;
                setDateList(list);
            }
        };
        loadList();
    }, [pontoList]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TIndicadorValues>({
        resolver: zodResolver(indicadorSchema),
    });

    const parseData = async ({ entrada, saida }: TIndicadorValues) => {
        user && setDateList([...userPontoList]);
        let newList: IRegistroDePonto[] = []
        const start = new Date(entrada + " 00:00:00");
        const end = new Date(saida + " 00:00:00");
        end.setDate(end.getDate() + 1);

        userPontoList.map((date) => {
            const currentDateStart = new Date(date.entrada);
            if (currentDateStart <= end && currentDateStart >= start) {
                newList.push(date)
            }
        })
        if (newList.length > 0){
            const totalSeconds = getTotalSeconds(newList);
            const totalHours = getTimeFromSeconds(totalSeconds);
            setTotalHours(totalHours);
        } else {
            setTotalHours("");
        }
        setDateList([...newList]);
    };

    return (
        <section>
            <h1>Olá {user?.nome}</h1>
            <ul>
                <h1>Pontos Registrados</h1>
                {dateList.map((ponto) =>
                    <IndicadoresPontoCard key={ponto.id} ponto={ponto} />
                )}
            </ul>
            <h3>Filtrar por data:</h3>
            <form onSubmit={handleSubmit((formData) => parseData(formData))}>
                <input type="date" {...register("entrada")} />
                {errors && <p>{errors.entrada?.message}</p>}
                <input type="date" {...register("saida")} />
                {errors && <p>{errors.saida?.message}</p>}
                <button type="submit">Filtrar</button>
            </form>
            {totalHours && <h1>Total de horas: {totalHours}</h1>}
        </section>
    )
}