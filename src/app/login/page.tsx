'use client'
import { LoginForm } from "@/components/LoginForm";
import { userStore } from "@/stores/userStore";
import { redirect } from "next/navigation";


export default function LoginPage() {
  const { loading, userData } = userStore((state) => state)

  if (userData) {
    redirect('/dashboard');
  }

    return (
      <main>
        <h1>Login</h1>
        <LoginForm />
      </main>
    );
}
