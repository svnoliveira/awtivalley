"use client";
import { RegisterForm } from "@/components/RegisterForm";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";
import { checkUserRole } from "@/utils/operations";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function RegisterPage() {
  const { loading, userData, loadUser } = userStore((state) => state);

  useEffect(() => {
    const loadData = async () => {
      await loadUser();
      if (!userData?.user.is_superuser === false) {
        redirect("/dashboard");
      }
    };
    loadData();
  }, [loadUser, checkUserRole ]);

  return (
    <>
      <GlobalStyle />
      {loading ? (
        <Loading />
      ) : (
        <>
          <main>
            <RegisterForm />
          </main>
        </>
      )}
    </>
  );
}
