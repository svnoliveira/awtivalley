"use client";
import { Header } from "@/components/Header";
import { ProvaResgateAereoeAquatico } from "@/components/ProvaResgateAereoeAquatico";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";

export default function HomeProvaResgateAereoeAquatico() {
  const loading = userStore((state) => state.loading);
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <Header />
          <main>
            <ProvaResgateAereoeAquatico />
          </main>
        </>
      }
    </>
  );
}
