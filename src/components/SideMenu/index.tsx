'use client'
import { UserIcon } from "@/fragments/UserIcon";
import { adminStore } from "@/stores/adminStore";
import { userStore } from "@/stores/userStore"
import Image from "next/image"
import Link from "next/link";

export const SideMenu = () => {
    const user = userStore((state) => state.userData?.user);
    const logout = userStore((state) => state.logoutUser);
    const sideMenuToggle = adminStore((state) => state.sideMenuToggle);

    return (
        <>
        {sideMenuToggle && (
          <section>
            <Image
              src="https://media.discordapp.net/attachments/1182108710965870744/1192518457904865331/CMALogoDiscord2.png"
              alt="Logo"
              width={100}
              height={100}
            />
            <div>
              {user && <h3>{user.nome}</h3>}
              {user && <h3>{user.cargo}</h3>}
            </div>
            <UserIcon />
            <ul>
              {user?.is_superuser && <li><Link href={"/admin"}>Admin</Link></li>}
              {user && <li><Link href={"/dashboard"}>Colaborador</Link></li>}
              {user && <li><Link href={"/indicadores"}>Indicadores</Link></li>}
              {user && <li><Link href={"/registro-de-ponto"}>Registro de Ponto</Link></li>}
              {user && <li><button onClick={() => logout()}>Logout</button></li>}
              {!user && <li><Link href={"/login"}>Login</Link></li>}
              {!user && <li><Link href={"/register"}>Cadastrar</Link></li>}
            </ul>
          </section>
        )}
      </>
    )
}