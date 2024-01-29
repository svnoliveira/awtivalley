"use client";
import { PontoForm } from "@/components/PontoForm";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";
import { redirect } from "next/navigation";

export default function PontoPage() {
  const { loading, userData } = userStore((state) => state);

  if (!userData) {
    redirect("/login");
  }

  return (
    <>
      <GlobalStyle />
      {loading ? (
        <Loading />
      ) : (
        <>
          <main>
            <PontoForm />
          </main>
        </>
      )}
    </>
  );
}
