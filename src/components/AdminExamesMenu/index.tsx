import { useState } from "react";
import { adminStore } from "@/stores/adminStore";
import { exameStore } from "@/stores/exameStore";
import { userStore } from "@/stores/userStore";
import { AdminExamesVincular } from "../AdminExamesVincular";
import { AdminNav } from "@/globalStyles/AdminNav/style";
import { AdminNavButton } from "@/globalStyles/AdminNavButton/style";
import {
  StyledTable,
  ThCellHeader,
  ThTitleRow,
} from "@/globalStyles/StyledTable/style";
import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import { StyledSection, StyledTitle, StyledButtonLink, ModalOverlay, ModalContent } from "./style";
import { AdminExamesModal } from "../AdminExamesModal";
import { checkValidade } from "@/utils/operations";

export const AdminExamesMenu = () => {
  const [showModal, setShowModal] = useState(false);
  const [docExameUrl, setdocExameUrl] = useState("");

  const userList = userStore((state) => state.userList);
  const { adminActiveExame, setAdminActiveExame, setAdminActiveUser } =
    adminStore((state) => state);
  const { exameList, removeExame } = exameStore((state) => state);

  interface ModalProps {
    url: string;
    onClose: () => void;
  }

  const Modal: React.FC<ModalProps> = ({ url, onClose }) => {
    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent>          
          <img src={url} alt="Imagem" style={{ maxWidth: "100%", maxHeight: "100%" }} />
        </ModalContent>
      </ModalOverlay>
    );
  }; 

  return (
    <StyledSection>
      <AdminExamesModal />
      <AdminNav>
        {exameList &&
          exameList.map((exame) => (
            <AdminNavButton
              $selected={adminActiveExame === exame ? true : false}
              onClick={() => setAdminActiveExame(exame)}
              key={exame.id}
            >
              {exame.nome}
            </AdminNavButton>
          ))}
      </AdminNav>
      {adminActiveExame && (
        <StyledTitle>
          {adminActiveExame.nome} -{" "}
          {adminActiveExame.validade > 0
            ? `Exame válido por ${adminActiveExame.validade} dias`
            : "Permanente"}
        </StyledTitle>
      )}
      <AdminExamesVincular />
      <StyledTable>
        <tr>
          <ThCellHeader colSpan={8}>
            {adminActiveExame &&
              `Funcionários no exame de ${adminActiveExame?.nome}`}
          </ThCellHeader>
        </tr>
        <tr>
          <ThTitleRow>Nome</ThTitleRow>
          <ThTitleRow>Passaporte</ThTitleRow>
          <ThTitleRow>Cargo</ThTitleRow>
          <ThTitleRow>Setor</ThTitleRow>
          <ThTitleRow>Exame</ThTitleRow>
          <ThTitleRow>Início</ThTitleRow>
          <ThTitleRow>Vencimento</ThTitleRow>
        </tr>
        {adminActiveExame &&
          adminActiveExame.users.map((userID) => {
            const user = userList.find((entry) => entry.id === userID);
            const userExame = user?.exames.find(
              (entry) => entry.nome === adminActiveExame.nome
            );
            return (
              <tr key={userID} onClick={() => setAdminActiveUser(user!)}>
                <td>{user?.nome}</td>
                <td>{user?.passaporte}</td>
                <td>{user?.cargo}</td>
                <td>{user?.setor}</td>
                <td>
                  {userExame?.docExame ? (
                    <StyledButtonLink
                      onClick={() => {
                        setdocExameUrl(userExame.docExame);
                        setShowModal(true);
                      }}
                    >
                      Exame
                    </StyledButtonLink>
                  ) : (
                    " - "
                  )}
                </td>
                <td>
                  {userExame?.inicio
                    ? new Date(userExame.inicio).toLocaleDateString("pt-br")
                    : " - "}
                </td>
                <td>
                  {userExame?.vencimento
                    ? checkValidade(userExame.vencimento)
                      ? new Date(userExame.vencimento).toLocaleDateString(
                          "pt-br"
                        )
                      : `EXPIRADO em ${new Date(
                          userExame.vencimento
                        ).toLocaleDateString("pt-br")}`
                    : " - "}
                </td>
                <td>
                  <StyledSubmitButton
                    $error={false}
                    onClick={() => removeExame(adminActiveExame, user!)}
                  >
                    Desvincular
                  </StyledSubmitButton>
                </td>
              </tr>
            );
          })}
      </StyledTable>

      {showModal && (
        <Modal url={docExameUrl} onClose={() => setShowModal(false)} />
      )}
    </StyledSection>
  );
};
