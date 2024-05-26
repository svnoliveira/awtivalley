"use client";
import { LoginForm } from "@/components/LoginForm";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { loading, userData, loadUser } = userStore((state) => state);

  useEffect(() => {
    const loadData = async () => {
      await loadUser();
      if (userData) {
        redirect("/dashboard");
      }
    };
    loadData();
  }, [loadUser]);

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
