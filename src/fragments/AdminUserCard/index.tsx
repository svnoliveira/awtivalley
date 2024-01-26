'use client'

import { IUser } from "@/stores/@userTypes"
import { UserCard } from "../UserCard"
import { adminStore } from "@/stores/adminStore"

export const AdminUserCard = ({user}:{user:IUser}) => {
    const setActiveUser = adminStore((state) => state.setAdminActiveUser)
    return (
        <li onClick={() => setActiveUser(user)}>
            <UserCard />
            <h1>Status: {user.ativo ? "Ativo" : "Desligado"}</h1>
            <ul>
                <li>Passaporte: {user.passaporte}</li>
                <li>Cargo: {user.cargo}</li>
                <li>Discord ID: {user.discord_id}</li>
                <li>Setor: {user.setor}</li>
                <li>Efetivação: {user.efetivacao}</li>
                <li>Função: {user.funcao}</li>
                <li>Funções Extra: {user.funcoes_extra}</li>
                <li>Observações: {user.observacoes}</li>
                <li>Última Promoção: {user.ultima_promocao}</li>
            </ul>
            <h1>Licença Médica:</h1>
            <ul>
                <li>Ciclo: {user.licenca_medica.ciclo}</li>
                <li>Data: {user.licenca_medica.data}</li>
                <li>Responsável: {user.licenca_medica.responsavel}</li>
                <li>CRM: {user.licenca_medica.crm}</li>
            </ul>
        </li>
    )
}