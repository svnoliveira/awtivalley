"use client";
import { Header } from "@/components/Header";
import { ProvaComporCondEmedConflitos } from "@/components/ProvaComporCondEmedConflitos";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";

export default function HomeProvaComporCondEmedConflitos() {
  const loading = userStore((state) => state.loading);
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <Header />
          <main>
            <ProvaComporCondEmedConflitos />
          </main>
        </>
      }
    </>
  );
}
