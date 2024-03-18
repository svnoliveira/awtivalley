import { Loading } from "@/fragments/Loading";
import { IRegistroDePonto } from "@/stores/@registroDePontoTypes";
import { registroStore } from "@/stores/registroDePonto";
import { userStore } from "@/stores/userStore";
import { useState } from "react";
import { StyledButtonContainer, StyledModal, StyledX } from "./style";

interface IAdminPontosModalProps {
  ponto: IRegistroDePonto;
}

export const AdminPontosModal = ({ ponto }: IAdminPontosModalProps) => {
  const [modalOpen, setModalOpen] = useState<IRegistroDePonto | false>(false);
  const [loading, setLoading] = useState(false);
  const deletePonto = registroStore((state) => state.deletePonto);
  const token = userStore((state) => state.userData?.accessToken);
  const userList = userStore((state) => state.userList);

  const handleDeleteClick = async () => {
    setLoading(true);
    await deletePonto(ponto.id, token!);
    setLoading(false);
    setModalOpen(false);
  }

  return (
    <>
      <button type="button" onClick={() => setModalOpen(ponto)}>Remover</button>
      {modalOpen === ponto && (
        <StyledModal>
          <div>
            {loading ? (
              <Loading />
            ) : (
              <>
                <StyledX onClick={() => setModalOpen(false)}>X</StyledX>
                <h1>Deletar ponto?</h1>
                <p>{userList.find((user) => user.id === ponto.user)?.nome}</p>
                <div>
                    <p>{new Date(ponto.entrada).toLocaleString('pt-br')}</p>
                    <p>{new Date(ponto.saida).toLocaleString('pt-br')}</p>
                </div>
                <StyledButtonContainer>
                  <button onClick={() => handleDeleteClick()}>Deletar</button>
                  <button onClick={() => setModalOpen(false)}>Cancelar</button>
                </StyledButtonContainer>
              </>
            )}
          </div>
        </StyledModal>
      )}
    </>
  );
};
