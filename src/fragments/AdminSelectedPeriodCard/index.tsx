'use client'

import { adminStore } from "@/stores/adminStore";

export const AdminSelectedPeriodCard = () => {
    const period = adminStore((state) => state.adminActivePeriod);
    const clearPeriod = adminStore((state) => state.setAdminActivePeriod);

    return (
        <>
        <li onClick={() => clearPeriod(null)}>
            <p>Período Selecionado:</p>
            <p>{period && `De ${period.start.toLocaleDateString('pt-br')} á ${period.end.toLocaleDateString('pt-br')}`}</p>
        </li>
        <li></li>
        </>
    )
}