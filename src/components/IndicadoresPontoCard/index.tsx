'use client'
import { IRegistroDePonto } from "@/stores/@registroDePontoTypes"

export const IndicadoresPontoCard = ({ ponto }: { ponto: IRegistroDePonto }) => {
    return (
        <tr>
            <td>{new Date(ponto.entrada).toLocaleString('pt-br')}</td>
            <td>{new Date(ponto.saida).toLocaleString('pt-br')}</td>
            <td>{ponto.horas}</td>
        </tr>
    )
}