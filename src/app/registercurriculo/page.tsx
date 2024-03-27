"use client";
import { RegisterCurriculoForm } from "@/components/RegisterCurriculoForm";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";
import { checkUserRole } from "@/utils/operations";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  const { loading, userData } = userStore((state) => state);

  if (checkUserRole(userData?.user) === false) {
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
            <RegisterCurriculoForm />
          </main>
        </>
      )}
    </>
  );
}
