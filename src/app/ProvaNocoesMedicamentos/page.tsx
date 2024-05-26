"use client";
import { Header } from "@/components/Header";
import { ProvaNocoesMedicamentos } from "@/components/ProvaNocoesMedicamentos";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";

export default function HomeProvaNocoesMedicamentos() {
  const loading = userStore((state) => state.loading);
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <Header />
          <main>
            <ProvaNocoesMedicamentos />
          </main>
        </>
      }
    </>
  );
}
