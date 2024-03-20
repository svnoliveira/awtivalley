import { Loading } from "@/fragments/Loading";
import { adminStore } from "@/stores/adminStore";
import { especialidadeStore } from "@/stores/especialidadeStore";
import { userStore } from "@/stores/userStore";
import { useState } from "react";
import { StyledButton, StyledButtonsContainer, StyledModal, StyledX } from "./style";

type TModal = {
  mode: "closed" | "create" | "edit" | "delete";
};

export const AdminEspecialidadesModal = () => {
  const [modal, setModal] = useState<TModal>({ mode: "closed" });
  const [input, setInput] = useState<string>('');
  const [select, setSelect] = useState<string>('');
  const error = adminStore((state) => state.setError);
  const token = userStore((state) => state.userData?.accessToken);
  const { loading, especialidadeList, registerEspecialidade, editEspecialidade, deleteEspecialidade } = especialidadeStore((state) => state);

  const handleCreateClick = async () => {
    if (input.length < 3) {
      error('Precisa conter ao menos 3 caracteres');
      return;
    }
    const success = await registerEspecialidade(token!, input);
    if (success) {
      setInput('');
      setModal({ mode: "closed" });
    }
  };
  const handleEditClick = async () => {
    if (input.length < 3) {
      error('Precisa conter ao menos 3 caracteres');
      return;
    }
    if (select.length === 0) {
      error('Escolha um especialidade');
      return;
    }
    const success = await editEspecialidade(token!, input, Number(select));
    if (success){
      setInput('');
      setSelect('');
      setModal({ mode: "closed" });
    }
  };
  const handleDeleteClick = async () => {
    if (select.length === 0) {
      error('Escolha um especialidade');
      return;
    }
    const success = await deleteEspecialidade(token!, Number(select));
    if (success) {
      setSelect('');
      setModal({ mode: "closed" });
    };
  };

  return (
    <>
      <StyledButtonsContainer>
        <button onClick={() => setModal({ mode: "create" })}>
          Criar Especialidade
        </button>
        <button onClick={() => setModal({ mode: "edit" })}>
          Renomear Especialidade
        </button>
        <button onClick={() => setModal({ mode: "delete" })}>
          Excluir Especialidade
        </button>
      </StyledButtonsContainer>
      {modal.mode !== 'closed' && 
      <StyledModal>
        <div>
          {loading ? (
            <Loading />
          ) : (
            <>
              {modal.mode === "create" && (
                <form onSubmit={(e) => handleCreateClick()}>
                  <StyledX
                    onClick={() => setModal({ mode: "closed" })}
                    type="button"
                  >
                    X
                  </StyledX>
                  <h1>Criar novo especialidade</h1>
                  <input type="text" placeholder="Digite o nome do especialidade" 
                  value={input} onChange={(e) => setInput(e.target.value)}/>
                  <StyledButton type="submit">Criar</StyledButton>
                </form>
              )}
              {modal.mode === "edit" && (
                <form onSubmit={() => handleEditClick()}>
                  <StyledX
                    onClick={() => setModal({ mode: "closed" })}
                    type="button"
                  >
                    X
                  </StyledX>
                  <h1>Renomear Especialidade</h1>
                  <select name="especialidade-select" id="especialidade-select"
                  value={select} onChange={(e) => setSelect(e.target.value)}>
                    <option value="">Escolha um especialidade</option>
                    {especialidadeList.map((especialidade) => <option key={especialidade.id} value={especialidade.id}>{especialidade.nome}</option>)}
                  </select>
                  <input type="text" placeholder="Digite o novo nome do especialidade" 
                  value={input} onChange={(e) => setInput(e.target.value)}/>
                  <StyledButton type="submit">Editar</StyledButton>
                </form>
              )}
              {modal.mode === 'delete' && (
                <form onSubmit={() => handleDeleteClick()}>
                  <StyledX
                    onClick={() => setModal({ mode: "closed" })}
                    type="button"
                  >
                    X
                  </StyledX>
                  <h1>Deletar especialidade</h1>
                  <select name="especialidade-select" id="especialidade-select"
                  value={select} onChange={(e) => setSelect(e.target.value)}>
                    <option value="">Escolha um especialidade</option>
                    {especialidadeList.map((especialidade) => <option key={especialidade.id} value={especialidade.id}>{especialidade.nome}</option>)}
                  </select>
                  <StyledButton type="submit">Deletar</StyledButton>
                </form>
              )}
            </>
          )}
        </div>
      </StyledModal>
      }
    </>
  );
};
