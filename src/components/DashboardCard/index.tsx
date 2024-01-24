'use client'

import { userStore } from "@/stores/userStore"

export const DashboardCard = () => {
    const user = userStore((state) => state.userData?.user);

    return (
        <section>
            <h1>dashboard</h1>
            <ul>
                <li>Nome: {user?.nome}</li>
                <li>Passaporte: {user?.passaporte}</li>
                <li>Cargo: {user?.cargo}</li>
                <li>Discord ID: {user?.discord_id}</li>
                <li>Setor: {user?.setor}</li>
                <li>Efetivação: {user?.efetivacao}</li>
                <li>Função: {user?.funcao}</li>
                <li>Funções Extra: {user?.funcoes_extra}</li>
                <li>Observações: {user?.observacoes}</li>
                <li>Última Promoção: {user?.ultima_promocao}</li>
            </ul>
            <h1>Licença Médica:</h1>
            <ul>
                <li>Ciclo: {user?.licenca_medica.ciclo}</li>
                <li>Data: {user?.licenca_medica.data}</li>
                <li>Responsável: {user?.licenca_medica.responsavel}</li>
                <li>CRM: {user?.licenca_medica.crm}</li>
            </ul>
            <h1>Especialidades:</h1>
            <ul>
                {user?.especialidades.map((especialidade => 
                <li>{especialidade.nome}</li>
                ))}
            </ul>
            <h1>Cursos:</h1>
            <ul>
                {user?.cursos.map((curso => 
                <li>{curso.nome}</li>
                ))}
            </ul>
        </section>
    )
}