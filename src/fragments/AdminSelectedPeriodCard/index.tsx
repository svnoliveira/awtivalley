import { adminStore } from "@/stores/adminStore";

export const AdminSelectedPeriodCard = () => {
    const period = adminStore((state) => state.adminActivePeriod);
    const clearPeriod = adminStore((state) => state.setAdminActivePeriod);

    // Função para obter a data final ajustada (data final - 1 dia)
    const getAdjustedEndDate = () => {
        if (!period) return null;
        const endDate = new Date(period.end);
        endDate.setDate(endDate.getDate() - 1);
        return endDate.toLocaleDateString('pt-br');
    };

    return (
        <>
        <li onClick={() => clearPeriod(null)}>
            <p>Período Selecionado:</p>
            <p>{period && `De ${period.start.toLocaleDateString('pt-br')} á ${getAdjustedEndDate()}`}</p>
        </li>
        <li></li>
        </>
    )
}
