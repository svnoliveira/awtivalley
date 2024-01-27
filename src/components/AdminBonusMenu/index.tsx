'use client'

import { adminStore } from "@/stores/adminStore"
import { userStore } from "@/stores/userStore";
import { getTimeFromSeconds, getTotalSeconds, totalHoras } from "@/utils/operations";
import { useState } from "react";

export const AdminBonusMenu = () => {
	const userList = userStore((state) => state.userList);
	const { adminActivePeriod } = adminStore((state) => state);
	const [bonusLimit, setBonusLimit] = useState<number>((0))

	const filteredList = () => {
		return userList.filter((user) => {
			const registros = user.registros_de_ponto.filter((ponto) => {
				const testingData = new Date(ponto.entrada);
				return testingData >= adminActivePeriod!.start && testingData <= adminActivePeriod!.end;
			});

			const horas = totalHoras(registros, adminActivePeriod!.start, adminActivePeriod!.end);

			return horas > 0 && horas >= bonusLimit;
		});
	};

	return (
		<section>
			{!adminActivePeriod && <p>Selecione Um Período para ver as listas de bonus</p>}
			{adminActivePeriod &&
				<>
					<nav>
						<ul>
							<li onClick={() => setBonusLimit(36000)}>100%</li>
							<li onClick={() => setBonusLimit(25200)}>75%</li>
							<li onClick={() => setBonusLimit(18000)}>50%</li>
						</ul>
					</nav>
					<table>
						<thead>
							<tr>
								<th>Colaborador</th>
								<th>Horas</th>
							</tr>
						</thead>
						<tbody>
							{filteredList()
								.sort((a, b) =>
									getTotalSeconds(b.registros_de_ponto) - getTotalSeconds(a.registros_de_ponto)
								)
								.map((user) => (
									<tr key={user.id}>
										<td>{user.nome}</td>
										<td>{getTimeFromSeconds(getTotalSeconds(user.registros_de_ponto))}</td>
									</tr>
								))}
						</tbody>
					</table>
				</>}
		</section>
	)
}