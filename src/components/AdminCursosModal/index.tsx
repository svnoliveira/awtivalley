import { Loading } from "@/fragments/Loading";
import { adminStore } from "@/stores/adminStore";
import { cursoStore } from "@/stores/cursoStore";
import { userStore } from "@/stores/userStore";
import { useState } from "react";
import { StyledButton, StyledButtonsContainer, StyledModal, StyledX } from "./style";

type TModal = {
  mode: "closed" | "create" | "edit" | "delete";
};

export const AdminCursosModal = () => {
  const [modal, setModal] = useState<TModal>({ mode: "closed" });
  const [input, setInput] = useState<string>('');
  const [select, setSelect] = useState<string>('');
  const error = adminStore((state) => state.setError);
  const token = userStore((state) => state.userData?.accessToken);
  const { loading, cursoList, registerCurso, editCurso, deleteCurso } = cursoStore((state) => state);

  const handleCreateClick = async () => {
    if (input.length < 3) {
      error('Precisa conter ao menos 3 caracteres');
      return;
    }
    const success = await registerCurso(token!, input);
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
      error('Escolha um curso');
      return;
    }
    const success = await editCurso(token!, input, Number(select));
    if (success){
      setInput('');
      setSelect('');
      setModal({ mode: "closed" });
    }
  };
  const handleDeleteClick = async () => {
    if (select.length === 0) {
      error('Escolha um curso');
      return;
    }
    const success = await deleteCurso(token!, Number(select));
    if (success) {
      setSelect('');
      setModal({ mode: "closed" });
    };
  };

  return (
    <>
      <StyledButtonsContainer>
        <button onClick={() => setModal({ mode: "create" })}>
          Criar Curso
        </button>
        <button onClick={() => setModal({ mode: "edit" })}>
          Renomear Curso
        </button>
        <button onClick={() => setModal({ mode: "delete" })}>
          Excluir Curso
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
                  <h1>Criar novo curso</h1>
                  <input type="text" placeholder="Digite o nome do curso" 
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
                  <h1>Renomear Curso</h1>
                  <select name="curso-select" id="curso-select"
                  value={select} onChange={(e) => setSelect(e.target.value)}>
                    <option value="">Escolha um curso</option>
                    {cursoList.map((curso) => <option key={curso.id} value={curso.id}>{curso.nome}</option>)}
                  </select>
                  <input type="text" placeholder="Digite o novo nome do curso" 
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
                  <h1>Deletar curso</h1>
                  <select name="curso-select" id="curso-select"
                  value={select} onChange={(e) => setSelect(e.target.value)}>
                    <option value="">Escolha um curso</option>
                    {cursoList.map((curso) => <option key={curso.id} value={curso.id}>{curso.nome}</option>)}
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
