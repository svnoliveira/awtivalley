'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TPeriodValues, periodSchema } from "./schema";
import { adminStore } from "@/stores/adminStore";

export const AdminDateSelector = () => {
    const { setAdminActivePeriod } = adminStore((state)=> state)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TPeriodValues>({
        resolver: zodResolver(periodSchema),
    });

    const parseData = async ({ inicio, fim }: TPeriodValues) => {
        const start = new Date(inicio + " 00:00:00");
        const end = new Date(fim + " 00:00:00");
        end.setDate(end.getDate() + 1);
        setAdminActivePeriod({start, end})
    }

    return(
        <div>
            <h3>Selecione uma data</h3>
            <form onSubmit={handleSubmit((formData) => parseData(formData))}>
                <input type="date" {...register("inicio")} />
                {errors && <p>{errors.inicio?.message}</p>}
                <input type="date" {...register("fim")} />
                {errors && <p>{errors.fim?.message}</p>}
                <button type="submit">Filtrar</button>
            </form>
        </div>
    )
}