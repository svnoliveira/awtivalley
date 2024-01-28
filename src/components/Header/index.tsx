'use client'
import { UserCard } from "@/fragments/UserCard";
import { adminStore } from "@/stores/adminStore";
import { userStore } from "@/stores/userStore"
import Image from "next/image"
import Link from "next/link";
import { StyledHeader, StyledImageContainer, StyledMenuButton, StyledNav } from "./style";
import { useState } from "react";

export const Header = () => {
  const user = userStore((state) => state.userData?.user);
  const logout = userStore((state) => state.logoutUser);
  const { sideMenuToggle, setSideMenuToggle } = adminStore((state) => state);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSideMenuClick = () => {
    sideMenuToggle ? setSideMenuToggle(false) : setSideMenuToggle(true);
  };

  return (
    <StyledHeader>
      <StyledImageContainer>
        <Image
          src="/cma-logo-white.png"
          alt="Logo"
          width={300}
          height={100}
        />
      </StyledImageContainer>
      <StyledNav>
        <div>
          {user && (
            <div className="user-card" onClick={toggleDropdown}>
              <UserCard />
              <Image
                src={`/icons/arrow-${isDropdownVisible ? "up" : "down"}.svg`}
                alt="arrow icon"
                width={10}
                height={10}
              />
              {isDropdownVisible && (
                <div className="dropdown">
                  <button className="logout-btn" onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
        <StyledMenuButton onClick={() => handleSideMenuClick()}>
          <Image
            src="/icons/menu.svg"
            alt="menu icon"
            width={40}
            height={40}
          />
        </StyledMenuButton>
      </StyledNav>
    </StyledHeader>
  )
}