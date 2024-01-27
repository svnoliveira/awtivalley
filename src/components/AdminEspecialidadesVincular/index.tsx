'use client'

import { adminStore } from "@/stores/adminStore"
import { especialidadeStore } from "@/stores/especialidadeStore";

export const AdminEspecialidadesVincular = () => {
    const { adminActiveUser, adminActiveEspecialidade } = adminStore((state) => state);
    const { addEspecialidade } = especialidadeStore((state) => state);
    return(
        <div>
            {
                adminActiveEspecialidade ? <p>Registrar Especialidade: {adminActiveEspecialidade?.nome} ao Colaborador selecionado</p>
                : <p>Selecione uma especialidade.</p>
            }
            {
                (adminActiveUser && adminActiveEspecialidade) && 
                <button onClick={() => addEspecialidade(adminActiveEspecialidade, adminActiveUser)}>
                    Registrar
                </button>
            }
        </div>
    )
}