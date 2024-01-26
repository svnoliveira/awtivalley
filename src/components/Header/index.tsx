'use client'
import { UserCard } from "@/fragments/UserCard";
import { adminStore } from "@/stores/adminStore";
import { userStore } from "@/stores/userStore"
import Image from "next/image"
import Link from "next/link";

export const Header = () => {
    const user = userStore((state) => state.userData?.user);
    const logout = userStore((state) => state.logoutUser);
    const { sideMenuToggle, setSideMenuToggle } = adminStore((state) => state);

    const handleSideMenuClick = () => {
        sideMenuToggle ? setSideMenuToggle(false) : setSideMenuToggle(true);
    };

    return (
        <header>
            <Image
                src="https://media.discordapp.net/attachments/1182108710965870744/1192518457904865331/CMALogoDiscord2.png"
                alt="Logo"
                width={50}
                height={50}
            />
            <div></div>
            <nav>
                {user && <UserCard />}
                {user && <button onClick={() => logout()}>Logout</button>}
                {!user && <Link href={"/login"}>Login</Link>}
                {!user && <Link href={"/register"}>Cadastrar</Link>}
                <button onClick={() => handleSideMenuClick()}>OPEN/CLOSE SIDE MENU</button>
            </nav>
        </header>
    )
}