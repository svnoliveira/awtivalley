"use client";

import { Header } from "@/components/Header";
import { IndicadoresPersonalList } from "@/components/IndicadoresPersonalList";
import { IndicadoresSemanais } from "@/components/IndicadoresSemanais";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";
import { redirect } from "next/navigation";

export default function IndicadoresPage() {
  const { loading, userData } = userStore((state) => state);
  if (!userData) {
    redirect("/login");
  }

  return (
    <>
      <GlobalStyle />
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <main>
          <>
            <IndicadoresPersonalList />
          </>
        </main>
      )}
    </>
  );
}
