"use client";
import { Header } from "@/components/Header";
import { FormEntrevistaReingresso } from "@/components/FormEntrevistaReingresso";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";

export default function HomeFormEntrevistaReingresso() {
  const loading = userStore((state) => state.loading);
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <Header />
          <main>
            <FormEntrevistaReingresso />
          </main>
        </>
      }
    </>
  );
}
