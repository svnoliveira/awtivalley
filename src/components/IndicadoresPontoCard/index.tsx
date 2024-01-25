'use client'
import { IRegistroDePonto } from "@/stores/@registroDePontoTypes"

export const IndicadoresPontoCard = ({ ponto }: { ponto: IRegistroDePonto }) => {
    return (
        <li key={ponto.id}>

            <p>=================================</p>
            <p>Entrada: {new Date(ponto.entrada).toLocaleString('pt-br')}</p>
            <p>Saída: {new Date(ponto.saida).toLocaleString('pt-br')}</p>
            <p>Horas trabalhadas: {ponto.horas}</p>
            <p>=================================</p>
        </li>
    )
}