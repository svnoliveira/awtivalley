"use client";
import { Header } from "@/components/Header";
import { EntrevistaReingresso } from "@/components/EntrevistaReingresso";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";

export default function HomeEntrevistaReingresso() {
  const loading = userStore((state) => state.loading);
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <Header />
          <main>
            <EntrevistaReingresso />
          </main>
        </>
      }
    </>
  );
}
