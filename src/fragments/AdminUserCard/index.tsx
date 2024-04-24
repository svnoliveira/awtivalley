"use client";

import { IUser } from "@/stores/@userTypes";
import { adminStore } from "@/stores/adminStore";
import { InfoCard, StyledUserCard } from "./style";
import { AdminUserModal } from "@/components/AdminUserModal";

export const AdminUserCard = ({ user }: { user: IUser }) => {
  const setActiveUser = adminStore((state) => state.setAdminActiveUser);
  return (
    <section>
      <StyledUserCard onClick={() => setActiveUser(user)}>
        <div>
          <h1>{user.nome}</h1>
        </div>
        <InfoCard>
          <li>
            <span>Status: </span>
            <span>{user.ativo ? "✅ Ativo" : "❌ Desligado"}</span>
          </li>
          <li>
            <span>Passaporte: </span>
            <span>{user.passaporte}</span>
          </li>
          <li>
            <span>Cargo: </span>
            <span>{user.cargo}</span>
          </li>
          <li>
            <span>Discord ID: </span>
            <span>{user.discord_id}</span>
          </li>
          <li>
            <span>Setor: </span>
            <span>{user.setor}</span>
          </li>
          <li>
            <span>Efetivação: </span>
            <span>{user.efetivacao}</span>
          </li>
          <li>
            <span>Função: </span>
            <span>{user.funcao}</span>
          </li>
          <li>
            <span>Funções Extra: </span>
            <span>{user.funcoes_extra}</span>
          </li>
          <li>
            <span>Última Promoção: </span>
            <span>{user.ultima_promocao}</span>
          </li>
          <li>
            <span>Observações: </span>
            <span>{user.observacoes}</span>
          </li>
          <li>
            <span>Habilitação:</span>
            <span>{user.hab_aereo}</span>
          </li>
        </InfoCard>
        <h3>Licença Médica:</h3>
        <InfoCard>
          <li>
            <span>Ciclo: </span>
            <span>♻️{user.licenca_medica.ciclo}</span>
          </li>
          <li>
            <span>Data: </span>
            <span>📆{user.licenca_medica.data}</span>
          </li>
          <li>
            <span>Responsável: </span>
            <span>👨‍⚕️{user.licenca_medica.responsavel}</span>
          </li>
          <li>
            <span>CRM: </span>
            <span>🪪{user.licenca_medica.crm}</span>
          </li>
          <li></li>
        </InfoCard>
      </StyledUserCard>
      <AdminUserModal user={user} />
    </section>
  );
};
