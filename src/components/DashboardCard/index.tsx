import { userStore } from "@/stores/userStore";
import {
  InfoCard,
  InfoCursoCard,
  InfoHabCard,
  StyledContainer,
  StyledSection,
  StyledUserBanner,
  StyledButtonLink,
  ModalOverlay,
  ModalContent,
} from "./style";
import { useState } from "react";
import { MenuNav } from "@/globalStyles/MenuNav/style";
import { MenuButton } from "@/globalStyles/MenuButton/style";
import { DashboardPasswordRecovery } from "../DashboardPasswordRecovery";
import { checkValidade } from "@/utils/operations";

export const DashboardCard = () => {

  const [showModalCurso, setShowModalCurso] = useState(false);
  const [showModalHabilitacao, setShowModalHabilitacao] = useState(false);

  const user = userStore((state) => state.userData?.user);
  const [menu, setMenu] = useState<string>("");

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
      <StyledUserBanner>
        <h1>
          Bem Vindo{"(a)"} {user?.nome} {"|"} {user?.passaporte}
        </h1>
      </StyledUserBanner>
      <MenuNav>
        <MenuButton
          $selected={menu === "pessoal" ? true : false}
          onClick={() => setMenu("pessoal")}
        >
          Informações pessoais
        </MenuButton>
        <MenuButton
          $selected={menu === "licença" ? true : false}
          onClick={() => setMenu("licença")}
        >
          Licença Médica
        </MenuButton>
        <MenuButton
          $selected={menu === "especialidade" ? true : false}
          onClick={() => setMenu("especialidade")}
        >
          Especialidades
        </MenuButton>
        <MenuButton
          $selected={menu === "curso" ? true : false}
          onClick={() => setMenu("curso")}
        >
          Cursos
        </MenuButton>
        <MenuButton
          $selected={menu === "habilitacao" ? true : false}
          onClick={() => setMenu("habilitacao")}
        >
          Habilitação
        </MenuButton>
      </MenuNav>
      <StyledContainer>
        {menu == "pessoal" && (
          <>
            <DashboardPasswordRecovery />
            <InfoCard>
              <li>
                <span>Nome: </span>
                <span>👨‍⚕️{user?.nome}</span>
              </li>
              <li>
                <span>Passaporte: </span>
                <span>🪪{user?.passaporte}</span>
              </li>
              <li>
                <span>Discord ID: </span>
                <span>{user?.discord_id}</span>
              </li>
              <li>
                <span>Cargo: </span>
                <span>{user?.cargo}</span>
              </li>
              <li>
                <span>Setor: </span>
                <span>{user?.setor}</span>
              </li>
              <li>
                <span>Função: </span>
                <span>{user?.funcao}</span>
              </li>
              <li>
                <span>Funções Extra: </span>
                <span>{user?.funcoes_extra}</span>
              </li>
              <li>
                <span>Efetivação: </span>
                <span>{user?.efetivacao}</span>
              </li>
              <li>
                <span>Última Promoção: </span>
                <span>{user?.ultima_promocao}</span>
              </li>
              <li>
                <span>Observações: </span>
                <span>📝{user?.observacoes}</span>
              </li>
              <li></li>
            </InfoCard>
          </>
        )}
        {menu == "licença" && (
          <InfoCard>
            <li>
              <span>Ciclo: </span>
              <span>♻️{user?.licenca_medica.ciclo}</span>
            </li>
            <li>
              <span>Data: </span>
              <span>📆{user?.licenca_medica.data}</span>
            </li>
            <li>
              <span>Responsável: </span>
              <span>👨‍⚕️{user?.licenca_medica.responsavel}</span>
            </li>
            <li>
              <span>CRM: </span>
              <span>🪪{user?.licenca_medica.crm}</span>
            </li>
            <li></li>
          </InfoCard>
        )}
        {menu == "especialidade" && (
          <InfoCard>
            {user?.especialidades.map((especialidade) => (
              <li key={especialidade.id}>
                <span></span>
                <span>{especialidade.nome}</span>
              </li>
            ))}
            <li></li>
          </InfoCard>
        )}
        {menu === "curso" && (
          <InfoCursoCard>
            <li>
              <span>Cursos</span>
              <span>Validade</span>
              <span>Certificado</span>
            </li>
            {user?.cursos.map((curso) => {              
              if (curso.nome !== "Habilitação Aérea") {
                return (
                  <li key={curso.nome}>
                    <span>{curso.nome}</span>
                    {curso.vencimento ? (
                      <span>
                        {checkValidade(curso.vencimento)
                          ? new Date(curso.vencimento).toLocaleDateString("pt-br")
                          : "EXPIRADO"}
                      </span>
                    ) : (
                      <span> - </span>
                    )}
                    {curso.certificado ? (
                      <span>
                        <StyledButtonLink onClick={() => setShowModalCurso(true)}>
                          Certificado
                        </StyledButtonLink>
                        {showModalCurso && (
                          <Modal url={curso.certificado} onClose={() => setShowModalCurso(false)} />
                        )}
                    </span>
                    ) : (
                      <span> - </span>
                    )}
                  </li>
                );
              } else {                
                return null;
              }
            })}
            <li></li>
          </InfoCursoCard>
        )}
        {menu === "habilitacao" && (
          <InfoHabCard>
            <li>
              <span>Tipo</span>
              <span>Data</span>
              <span>Validade</span>
              <span>Certificado</span>
            </li>
            {user?.cursos.map((curso) => {
              if (curso.nome === "Habilitação Aérea") {
                return (
                  <li key={curso.nome}>
                    <span>{curso.nome}</span>
                    <span>{curso.inicio ? new Date(curso.inicio).toLocaleDateString("pt-br") : "-"}</span>
                    {curso.vencimento ? (
                      <span>
                        {checkValidade(curso.vencimento)
                          ? new Date(curso.vencimento).toLocaleDateString("pt-br")
                          : "EXPIRADO"}
                      </span>
                    ) : (
                      <span> - </span>
                    )}
                    {curso.certificado ? (
                      <span>
                        <StyledButtonLink onClick={() => setShowModalHabilitacao(true)}>
                          Certificado
                        </StyledButtonLink>
                        {showModalHabilitacao && (
                          <Modal url={curso.certificado} onClose={() => setShowModalHabilitacao(false)} />
                        )}
                      </span>
                    ) : (
                      <span> - </span>
                    )}
                  </li>
                );
              } else {
                return null;
              }
            })}
            <li></li>
          </InfoHabCard>
        )}
      </StyledContainer>
    </StyledSection>
  );
};
