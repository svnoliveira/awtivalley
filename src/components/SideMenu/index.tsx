"use client";
import { UserIcon } from "@/fragments/UserIcon";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { adminStore } from "@/stores/adminStore";
import { userStore } from "@/stores/userStore";
import Image from "next/image";
import {
  StyledAside,
  StyledBlankDiv,
  StyledContainer,
  StyledLi,
  StyledSideList,
} from "./style";
import { checkUserCursosRole, checkIngressoRole, checkUserRole } from "@/utils/operations";
import React from "react";
import { useRouter } from "next/navigation";

export const SideMenu = () => {
  const user = userStore((state) => state.userData?.user);
  const logout = userStore((state) => state.logoutUser);
  const sideMenuToggle = adminStore((state) => state.sideMenuToggle);
  const setSideMenuToggle = adminStore((state) => state.setSideMenuToggle);

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      setSideMenuToggle(false);
    };
  };

  const { push } = useRouter()

  return (
    <>
      <GlobalStyle />
      {sideMenuToggle && (
        <StyledBlankDiv onClick={(e) => handleOutsideClick(e)}>
          <StyledAside>
            <StyledContainer onClick={() => setSideMenuToggle(false)}>
              <Image
                src="/cma-logo-white.png"
                alt="Logo"
                width={500}
                height={500}
              />
              <div>
                {user && <h3><center>{user.nome}</center></h3>}
                {user && <h3><center>{user.cargo}</center></h3>}
              </div>
              <UserIcon />
            </StyledContainer>
            <StyledSideList>
              {user?.is_superuser && (
                <StyledLi onClick={() => push("/admin")}>
                  <Image
                    src="/icons/lock.svg"
                    alt="Logo"
                    width={20}
                    height={20}
                  />
                  <span>Admin</span>
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="Logo"
                    width={15}
                    height={15}
                  />
                </StyledLi>
              )}
              {user && (
                <StyledLi onClick={() => push("/dashboard")}>
                  <Image
                    src="/icons/person.svg"
                    alt="Logo"
                    width={20}
                    height={20}
                  />
                  <span>Colaborador</span>
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="Logo"
                    width={15}
                    height={15}
                  />
                </StyledLi>
              )}
              {user && (
                <StyledLi onClick={() => push("/indicadores")}>
                  <Image
                    src="/icons/indicadores.svg"
                    alt="Logo"
                    width={20}
                    height={20}
                  />
                  <span>Histórico de Registros</span>
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="Logo"
                    width={15}
                    height={15}
                  />
                </StyledLi>
              )}
              {user && (
                <StyledLi onClick={() => push("/registro-de-ponto")}>
                  <Image
                    src="/icons/ponto.svg"
                    alt="Logo"
                    width={20}
                    height={20}
                  />
                  <span>Registro de Ponto</span>
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="Logo"
                    width={15}
                    height={15}
                  />
                </StyledLi>
              )}
              {user && (
                <StyledLi onClick={() => push("/MiniGameCDA")}>
                  <Image
                    src="/icons/icon_minigame.gif"
                    alt="Logo"
                    width={20}
                    height={20}
                  />
                  <span>MiniGameCDA</span>
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="Logo"
                    width={15}
                    height={15}
                  />
                </StyledLi>
              )}
              {!user && (
                <StyledLi onClick={() => push("/login")}>
                  <Image
                    src="/icons/login.svg"
                    alt="Logo"
                    width={20}
                    height={20}
                  />
                  <span>Login</span>
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="Logo"
                    width={15}
                    height={15}
                  />
                </StyledLi>
              )}
              {user?.is_superuser || checkUserRole(user) || checkIngressoRole(user)&& (
                <StyledLi onClick={() => push("/register")}>
                  <Image
                    src="/icons/register.svg"
                    alt="Logo"
                    width={20}
                    height={20}
                  />
                  <span>Gestão Ingressos</span>
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="Logo"
                    width={15}
                    height={15}
                  />
                </StyledLi>
              )}
              <StyledLi onClick={() => push("/DashboardCursos")}>
                <Image
                  src="/icons/book.svg"
                  alt="Logo"
                  width={20}
                  height={20}
                />
                <span>Provas dos Cursos</span>
                <Image
                  src="/icons/arrow-right.svg"
                  alt="Logo"
                  width={15}
                  height={15}
                />
              </StyledLi>
              {user?.is_superuser || checkUserCursosRole(user) && (
                <StyledLi onClick={() => push("/cursos")}>
                  <Image
                    src="/icons/register.svg"
                    alt="Logo"
                    width={20}
                    height={20}
                  />
                  <span>Gestão de Cursos</span>
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="Logo"
                    width={15}
                    height={15}
                  />
                </StyledLi>
              )}
              {/* <StyledLi onClick={() => push("/registerchamados")}>
                <Image
                  src="/icons/register.svg"
                  alt="Logo"
                  width={20}
                  height={20}
                />
                <span>Formulário de Chamados</span>
                <Image
                  src="/icons/arrow-right.svg"
                  alt="Logo"
                  width={15}
                  height={15}
                />
              </StyledLi> */}
              <StyledLi onClick={() => push("/registercurriculo")}>
                <Image
                  src="/icons/register.svg"
                  alt="Logo"
                  width={20}
                  height={20}
                />
                <span>Cadastrar currículos</span>
                <Image
                  src="/icons/arrow-right.svg"
                  alt="Logo"
                  width={15}
                  height={15}
                />
              </StyledLi>
              <StyledLi onClick={() => push("/agendamento-de-consultas")}>
                <Image
                  src="/icons/register.svg"
                  alt="Logo"
                  width={20}
                  height={20}
                />
                <span>Agendamento de Consultas</span>
                <Image
                  src="/icons/arrow-right.svg"
                  alt="Logo"
                  width={15}
                  height={15}
                />
              </StyledLi>
              <StyledLi onClick={() => push("/agendamento-psicotecnico")}>
                <Image
                  src="/icons/register.svg"
                  alt="Logo"
                  width={20}
                  height={20}
                />
                <span>Agendamento de Psicotécnico</span>
                <Image
                  src="/icons/arrow-right.svg"
                  alt="Logo"
                  width={15}
                  height={15}
                />
              </StyledLi>
              {user && (
                <StyledLi onClick={() => logout()}>
                  <Image
                    src="/icons/login.svg"
                    alt="Logo"
                    width={20}
                    height={20}
                  />
                  <span>Logout</span>
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="Logo"
                    width={15}
                    height={15}
                  />
                </StyledLi>
              )}
            </StyledSideList>
          </StyledAside>
        </StyledBlankDiv>
      )}
    </>
  );
};
