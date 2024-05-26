import { Loading } from "@/fragments/Loading";
import { adminStore } from "@/stores/adminStore";
import { cursoStore } from "@/stores/cursoStore";
import { userStore } from "@/stores/userStore";
import { useState } from "react";
import {
  StyledButton,
  StyledButtonsContainer,
  StyledDiv,
  StyledModal,
  StyledX,
} from "./style";

type TModal = {
  mode: "closed" | "create" | "edit" | "delete";
};

export const GestaoCursosModal = () => {
  const [modal, setModal] = useState<TModal>({ mode: "closed" });
  const [input, setInput] = useState<string>("");
  const [validade, setValidade] = useState<number>(0);
  const [select, setSelect] = useState<string>("");
  const error = adminStore((state) => state.setError);
  const token = userStore((state) => state.userData?.accessToken);
  const { loading, cursoList, registerCurso, editCurso, deleteCurso } =
    cursoStore((state) => state);

  const handleCreateClick = async () => {
    if (input.length < 3) {
      error("Precisa conter ao menos 3 caracteres");
      return;
    }
    if (validade < 0) {
      error("Validade deve ser um número positivo");
      return;
    }
    const success = await registerCurso(token!, input, validade);
    if (success) {
      setInput("");
      setValidade(0);
      setModal({ mode: "closed" });
    }
  };
  const handleEditClick = async () => {
    if (input.length < 3 && input.length > 0) {
      error("Precisa conter ao menos 3 caracteres");
      return;
    }
    if (select.length === 0) {
      error("Escolha um curso");
      return;
    }
    if (validade < 0) {
      error("Validade deve ser um número positivo");
      return;
    }
    const success = await editCurso(token!, input, Number(select), validade);
    if (success) {
      setInput("");
      setSelect("");
      setValidade(0);
      setModal({ mode: "closed" });
    }
  };
  const handleDeleteClick = async () => {
    if (select.length === 0) {
      error("Escolha um curso");
      return;
    }
    const success = await deleteCurso(token!, Number(select));
    if (success) {
      setSelect("");
      setModal({ mode: "closed" });
    }
  };

  return (
    <>
      <StyledButtonsContainer>
      </StyledButtonsContainer>
      {modal.mode !== "closed" && (
        <StyledModal>
          <div>
            {loading ? (
              <Loading />
            ) : (
              <>                                                
              </>
            )}
          </div>
        </StyledModal>
      )}
    </>
  );
};
