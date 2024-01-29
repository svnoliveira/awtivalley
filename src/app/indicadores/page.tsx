"use client";

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
      {loading ? (
        <Loading />
      ) : (
        <main>
          <>
            <IndicadoresPersonalList />
            <IndicadoresSemanais />
          </>
        </main>
      )}
    </>
  );
}
