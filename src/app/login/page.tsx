"use client";
import { LoginForm } from "@/components/LoginForm";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const { loading, userData } = userStore((state) => state);

  if (userData) {
    redirect("/dashboard");
  }

  return (
    <>
      <GlobalStyle />
      {loading ? (
        <Loading />
      ) : (
        <>
          <main>
            <LoginForm />
          </main>
        </>
      )}
    </>
  );
}
