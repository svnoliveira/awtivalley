"use client";
import { Header } from "@/components/Header";
import { HomeHero } from "@/components/HomeHero";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";

export default function Home() {
  const loading = userStore((state) => state.loading);
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <Header />
          <main>
            <HomeHero />
          </main>
        </>
      }
    </>
  );
}
