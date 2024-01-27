'use client'
import { AdminSelectedUserCard } from "@/fragments/AdminSelectedUserCard"
import { AdminFuncionariosMenu } from "../AdminFuncionariosMenu"
import { AdminEspecialidadesMenu } from "../AdminEspecialidadesMenu"
import { adminStore } from "@/stores/adminStore"
import { AdminCursosMenu } from "../AdminCursosMenu"
import { AdminSelectedPeriodCard } from "@/fragments/AdminSelectedPeriodCard"
import { AdminPontosMenu } from "../AdminPontosMenu"
import { AdminBonusMenu } from "../AdminBonusMenu"

export const AdminNav = () => {
  const {
    setActiveAdminScreen,
    activeAdminScreen
  } = adminStore((state) => state);

  return (
    <>
      <section>
        <nav>
          <ul>
            <li onClick={() => setActiveAdminScreen("funcionarios")}>Funcionários</li>
            <li onClick={() => setActiveAdminScreen("pontos")}>Registros de ponto</li>
            <li onClick={() => setActiveAdminScreen("bonus")}>Listas de Bonus</li>
            <li onClick={() => setActiveAdminScreen("cursos")}>Cursos</li>
            <li onClick={() => setActiveAdminScreen("especialidades")}>Especialidades</li>
          </ul>
        </nav>
      </section>
      <div>
        <AdminSelectedUserCard />
        <AdminSelectedPeriodCard />
      </div>
      {activeAdminScreen === "funcionarios" && <AdminFuncionariosMenu />}
      {activeAdminScreen === "pontos" && <AdminPontosMenu />}
      {activeAdminScreen === "bonus" && <AdminBonusMenu />}
      {activeAdminScreen === "especialidades" && <AdminEspecialidadesMenu />}
      {activeAdminScreen === "cursos" && <AdminCursosMenu />}
    </>
  )
}