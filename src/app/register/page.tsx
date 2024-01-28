"use client";
import { RegisterForm } from "@/components/RegisterForm";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  const { loading, userData } = userStore((state) => state);

  if (userData) {
    redirect("/dashboard");
  }

  return (
    <main>
      <GlobalStyle />
      {loading ? <Loading /> : <RegisterForm />}
    </main>
  );
}
