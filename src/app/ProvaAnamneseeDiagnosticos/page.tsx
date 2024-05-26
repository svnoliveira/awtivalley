"use client";
import { Header } from "@/components/Header";
import { ProvaAnamneseeDiagnosticos } from "@/components/ProvaAnamneseeDiagnosticos";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";

export default function HomeProvaAnamneseeDiagnosticos() {
  const loading = userStore((state) => state.loading);
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <Header />
          <main>
            <ProvaAnamneseeDiagnosticos />
          </main>
        </>
      }
    </>
  );
}
