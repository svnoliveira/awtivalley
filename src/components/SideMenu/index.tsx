"use client";
import { UserIcon } from "@/fragments/UserIcon";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { adminStore } from "@/stores/adminStore";
import { userStore } from "@/stores/userStore";
import Image from "next/image";
import Link from "next/link";
import { StyledAside, StyledContainer, StyledLi, StyledSideList } from "./style";
import { checkUserRole } from "@/utils/operations";

export const SideMenu = () => {
  const user = userStore((state) => state.userData?.user);
  const logout = userStore((state) => state.logoutUser);
  const sideMenuToggle = adminStore((state) => state.sideMenuToggle);
  const setSideMenuToggle = adminStore((state) => state.setSideMenuToggle);

  return (
    <>
      <GlobalStyle />
      {sideMenuToggle && (
        <StyledAside>
          <StyledContainer onClick={() => setSideMenuToggle(false)}>
            <Image
              src="/cma-logo-white.png"
              alt="Logo"
              width={500}
              height={500}
            />
            <div>
              {user && <h3>{user.nome}</h3>}
              {user && <h3>{user.cargo}</h3>}
            </div>
            <UserIcon />
          </StyledContainer>
          <StyledSideList>
            {user?.is_superuser && (
              <StyledLi>
                <Image
              src="/icons/lock.svg"
              alt="Logo"
              width={20}
              height={20}
            />
                <Link href={"/admin"}>Admin</Link>
                <Image
              src="/icons/arrow-right.svg"
              alt="Logo"
              width={15}
              height={15}
            />
              </StyledLi>
            )}
            {user && (
              <StyledLi>
                  <Image
              src="/icons/person.svg"
              alt="Logo"
              width={20}
              height={20}
            />
                <Link href={"/dashboard"}>Colaborador</Link>
                <Image
              src="/icons/arrow-right.svg"
              alt="Logo"
              width={15}
              height={15}
            />
              </StyledLi>
            )}
            {user && (
              <StyledLi>
                  <Image
              src="/icons/indicadores.svg"
              alt="Logo"
              width={20}
              height={20}
            />
                <Link href={"/indicadores"}>Indicadores</Link>
                <Image
              src="/icons/arrow-right.svg"
              alt="Logo"
              width={15}
              height={15}
            />
              </StyledLi>
            )}
            {user && (
              <StyledLi>
                  <Image
              src="/icons/ponto.svg"
              alt="Logo"
              width={20}
              height={20}
            />
                <Link href={"/registro-de-ponto"}>Registro de Ponto</Link>
                <Image
              src="/icons/arrow-right.svg"
              alt="Logo"
              width={15}
              height={15}
            />
              </StyledLi>
            )}
            {user && (
              <StyledLi>
                  <Image
              src="/icons/login.svg"
              alt="Logo"
              width={20}
              height={20}
            />
                <span onClick={() => logout()}>Logout</span>
                <Image
              src="/icons/arrow-right.svg"
              alt="Logo"
              width={15}
              height={15}
            />
              </StyledLi>
            )}
            {!user && (
              <StyledLi>
                  <Image
              src="/icons/login.svg"
              alt="Logo"
              width={20}
              height={20}
            />
                <Link href={"/login"}>Login</Link>
                <Image
              src="/icons/arrow-right.svg"
              alt="Logo"
              width={15}
              height={15}
            />
              </StyledLi>
            )}
            {checkUserRole(user) && (
              <StyledLi>
                  <Image
              src="/icons/register.svg"
              alt="Logo"
              width={20}
              height={20}
            />
                <Link href={"/register"}>Cadastrar</Link>
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
      )}
    </>
  );
};
