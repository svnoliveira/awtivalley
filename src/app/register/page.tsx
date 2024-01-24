'use client'
import { RegisterForm } from "@/components/RegisterForm";
import { userStore } from "@/stores/userStore";
import { redirect } from "next/navigation";


export default function RegisterPage() {
  const { loading, userData } = userStore((state) => state)

  if (userData) {
    redirect('/dashboard');
  }

    return (
      <main>
        <h1>Cadastrar</h1>
        <RegisterForm />
      </main>
    )
}
