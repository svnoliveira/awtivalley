'use client'

import { adminStore } from "@/stores/adminStore"
import { especialidadeStore } from "@/stores/especialidadeStore"
import { userStore } from "@/stores/userStore"
import { AdminEspecialidadesVincular } from "../AdminEspecialidadesVincular"

export const AdminEspecialidadesMenu = () => {
  const userList = userStore((state) => state.userList);
  const {
    adminActiveEspecialidade,
    setAdminActiveEspecialidade,
    setAdminActiveUser,
  } = adminStore((state) => state)
  const {
    especialidadeList,
    removeEspecialidade
  } = especialidadeStore((state) => state)
  return (
    <section>
      <nav>
        <ul>
          {
            especialidadeList &&
            especialidadeList.map(
              (especialidade) =>
                <li key={especialidade.id}>
                  <button onClick={() => setAdminActiveEspecialidade(especialidade)}>
                    {especialidade.nome}
                  </button>
                </li>
            )
          }
        </ul>
      </nav>
      <h3>
        {adminActiveEspecialidade &&
          `Funcionários da especialidade ${adminActiveEspecialidade?.nome}`}
      </h3>
      <AdminEspecialidadesVincular />
      <table>
        <tr>
          <th>Nome</th>
          <th>Passaporte</th>
          <th>Cargo</th>
          <th>Setor</th>
        </tr>
        {adminActiveEspecialidade && adminActiveEspecialidade.users.map((userID) => {
          const user = userList.find((entry) => entry.id === userID)
          return <tr key={userID}
          onClick={() => setAdminActiveUser(user!)}>
            <td>{user?.nome}</td>
            <td>{user?.passaporte}</td>
            <td>{user?.cargo}</td>
            <td>{user?.setor}</td>
            <td><button onClick={() => removeEspecialidade(adminActiveEspecialidade, user!)}>
              Desvincular
            </button></td>
          </tr>
        })}
      </table>
    </section>
  )
}