'use client'

import { adminStore } from "@/stores/adminStore"
import { cursoStore } from "@/stores/cursoStore";

export const AdminCursosVincular = () => {
    const { adminActiveUser, adminActiveCurso } = adminStore((state) => state);
    const { addCurso } = cursoStore((state) => state);
    return(
        <div>
            {
                adminActiveCurso ? <p>Registrar Curso: {adminActiveCurso?.nome} ao Colaborador selecionado</p>
                : <p>Selecione uma curso.</p>
            }
            {
                (adminActiveUser && adminActiveCurso) && 
                <button onClick={() => addCurso(adminActiveCurso, adminActiveUser)}>
                    Registrar
                </button>
            }
        </div>
    )
}