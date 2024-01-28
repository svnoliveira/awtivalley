'use client'
import { Header } from "@/components/Header";
import { HomeHero } from "@/components/HomeHero";
import { GlobalStyle } from "@/globalStyles/globalstyle";


export default function Home() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <HomeHero />
      </main>
    </>
  );
}
