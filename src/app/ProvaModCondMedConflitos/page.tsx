"use client";
import { Header } from "@/components/Header";
import { ProvaModCondMedConflitos } from "@/components/ProvaModCondMedConflitos";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";

export default function HomeProvaModCondMedConflitos() {
  const loading = userStore((state) => state.loading);
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <Header />
          <main>
            <ProvaModCondMedConflitos />
          </main>
        </>
      }
    </>
  );
}
