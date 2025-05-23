"use client";
import { Header } from "@/components/Header";
import { ProvaDirecDefensiva } from "@/components/ProvaDirecDefensiva";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";

export default function HomeProvaDirecDefen() {
  const loading = userStore((state) => state.loading);
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <Header />
          <main>
            <ProvaDirecDefensiva />
          </main>
        </>
      }
    </>
  );
}
