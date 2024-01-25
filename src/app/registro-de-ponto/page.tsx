'use client'
import { PontoForm } from "@/components/PontoForm";
import { userStore } from "@/stores/userStore";
import { redirect } from "next/navigation";


export default function PontoPage() {
  const { loading, userData } = userStore((state) => state)

  if (!userData) {
    redirect('/login');
  }

  return (
    <main>
      <h1>Registro de Ponto</h1>
      <PontoForm />
    </main>
  );
}
