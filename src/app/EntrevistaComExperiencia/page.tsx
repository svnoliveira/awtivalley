"use client";
import { Header } from "@/components/Header";
import { EntrevistaComExperiencia } from "@/components/EntrevistaComExperiencia";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";

export default function HomeEntrevistaComExperiencia() {
  const loading = userStore((state) => state.loading);
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <Header />
          <main>
            <EntrevistaComExperiencia />
          </main>
        </>
      }
    </>
  );
}
