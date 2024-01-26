'use client'
import { AdminFuncionariosMenu } from "@/components/AdminFuncionariosMenu";
import { AdminHeader } from "@/components/AdminHeader";
import { AdminNav } from "@/components/AdminNav";
import { AdminSelectedUserCard } from "@/fragments/AdminSelectedUserCard";
import { userStore } from "@/stores/userStore";
import { redirect } from "next/navigation";


export default function AdminPage() {
  const { loading, userData } = userStore((state) => state)

  if (!userData?.user.is_superuser) {
    redirect('/login');
  }
  return (
    <main>
      <AdminHeader />
      <AdminNav />
      <AdminSelectedUserCard />
      <AdminFuncionariosMenu />
      <AdminSelectedUserCard />
    </main>
  );
}
