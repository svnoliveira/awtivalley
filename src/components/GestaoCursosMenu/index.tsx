import React, { ChangeEvent, useState } from "react";
import { IUser } from "@/stores/@userTypes";
import { adminStore } from "@/stores/adminStore";
import { cursoStore } from "@/stores/cursoStore";
import { userStore } from "@/stores/userStore";
import { GestaoCursosVincular } from "../GestaoCursosVincular";
import { CursosNav } from "@/globalStyles/CursosNav/style";
import { AdminNavButton } from "@/globalStyles/AdminNavButton/style";
import { StyledTable, ThCellHeader, ThTitleRow,} from "@/globalStyles/StyledTable/style";
import { StyledSection, StyledSearch, StyledButtonLink, ModalOverlay, ModalContent,} from "./style";

import { GestaoCursosModal } from "../GestaoCursosModal";
import { checkValidade } from "@/utils/operations";

type TFilter = {
  search: string;
  list: IUser[];
};

export const GestaoCursosMenu = () => {
  const userList = userStore((state) => state.userList);

  const [filter, setFilter] = useState<TFilter>({
    search: "",
    list: userList, // Iniciar com a lista completa de usuários
  });

  const [showModal, setShowModal] = useState(false);
  const [certificadoUrl, setCertificadoUrl] = useState("");

  const handleFilterInput = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredList = userList.filter((user) =>
      user.nome.toLowerCase().includes(searchValue) ||
      user.cargo.toLowerCase().includes(searchValue) ||
      user.passaporte.toLowerCase().includes(searchValue) ||      
      user.cursos.some((curso) => curso.nome.toLowerCase().includes(searchValue))
    );
    setFilter({ ...filter, list: filteredList, search: searchValue });
  };

  interface ModalProps {
    url: string;
    onClose: () => void;
  }

  const Modal: React.FC<ModalProps> = ({ url, onClose }) => {
    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent>
          <img
            src={url}
            alt="Imagem"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </ModalContent>
      </ModalOverlay>
    );
  };

  return (
    <StyledSection>
      <StyledSearch>
        <h2>Pesquisa</h2>
        <input
          type="text"
          name="filter-list"
          id="filterlist"
          placeholder="Pesquise um funcionário"
          onChange={(e) => handleFilterInput(e)}
        />
        
      </StyledSearch>
      <GestaoCursosModal />
      <GestaoCursosVincular />
      <StyledTable>
        <thead>
          <tr>
            <ThCellHeader colSpan={8}>Funcionários e Cursos</ThCellHeader>
          </tr>
          <tr>
            <ThTitleRow>Nome</ThTitleRow>
            <ThTitleRow>Passaporte</ThTitleRow>
            <ThTitleRow>Cargo</ThTitleRow>
            <ThTitleRow>Setor</ThTitleRow>
            <ThTitleRow>Nome Curso</ThTitleRow>
            <ThTitleRow>Certificado</ThTitleRow>
            <ThTitleRow>Início</ThTitleRow>
            <ThTitleRow>Vencimento</ThTitleRow>
          </tr>
        </thead>
        <tbody>          
          {filter.list.map((user) => (
            <React.Fragment key={user.id}>
              {user.cursos.map((userCurso) => (
                <tr key={`${user.id}-${userCurso.nome}`}>
                  <td>{user.nome}</td>
                  <td>{user.passaporte}</td>
                  <td>{user.cargo}</td>
                  <td>{user.setor}</td>
                  <td>{userCurso.nome}</td>
                  <td>
                    {userCurso.certificado ? (
                      <StyledButtonLink
                        onClick={() => {
                          setCertificadoUrl(userCurso.certificado);
                          setShowModal(true);
                        }}
                      >
                        Certificado
                      </StyledButtonLink>
                    ) : (
                      " - "
                    )}
                  </td>
                  <td>
                    {userCurso.inicio
                      ? new Date(userCurso.inicio).toLocaleDateString("pt-br")
                      : " - "}
                  </td>
                  <td>
                    {userCurso.vencimento ? (
                      checkValidade(userCurso.vencimento) ? (
                        new Date(userCurso.vencimento).toLocaleDateString(
                          "pt-br"
                        )
                      ) : (
                        `EXPIRADO em ${new Date(
                          userCurso.vencimento
                        ).toLocaleDateString("pt-br")}`
                      )
                    ) : (
                      " - "
                    )}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </StyledTable>

      {showModal && (
        <Modal url={certificadoUrl} onClose={() => setShowModal(false)} />
      )}
    </StyledSection>
  );
};
