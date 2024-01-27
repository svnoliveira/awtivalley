'use client'

import { adminStore } from "@/stores/adminStore"
import { cursoStore } from "@/stores/cursoStore"
import { userStore } from "@/stores/userStore"
import { AdminCursosVincular } from "../AdminCursosVincular"

export const AdminCursosMenu = () => {
  const userList = userStore((state) => state.userList);
  const {
    adminActiveCurso,
    setAdminActiveCurso,
    setAdminActiveUser,
  } = adminStore((state) => state)
  const {
    cursoList,
    removeCurso
  } = cursoStore((state) => state)
  return (
    <section>
      <nav>
        <ul>
          {
            cursoList &&
            cursoList.map(
              (curso) =>
                <li key={curso.id}>
                  <button onClick={() => setAdminActiveCurso(curso)}>
                    {curso.nome}
                  </button>
                </li>
            )
          }
        </ul>
      </nav>
      <h3>
        {adminActiveCurso &&
          `Funcionários da curso ${adminActiveCurso?.nome}`}
      </h3>
      <AdminCursosVincular />
      <table>
        <tr>
          <th>Nome</th>
          <th>Passaporte</th>
          <th>Cargo</th>
          <th>Setor</th>
        </tr>
        {adminActiveCurso && adminActiveCurso.users.map((userID) => {
          const user = userList.find((entry) => entry.id === userID)
          return <tr onClick={() => setAdminActiveUser(user!)}>
            <td>{user?.nome}</td>
            <td>{user?.passaporte}</td>
            <td>{user?.cargo}</td>
            <td>{user?.setor}</td>
            <td><button onClick={() => removeCurso(adminActiveCurso, user!)}>
              Desvincular
            </button></td>
          </tr>
        })}
      </table>
    </section>
  )
}