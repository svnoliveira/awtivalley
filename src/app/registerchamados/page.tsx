"use client";
import { RregisterchamadosForm } from "@/components/RregisterchamadosForm";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { Loading } from "@/fragments/Loading";
import { userStore } from "@/stores/userStore";

export default function RregisterchamadosPage() {
  const loading = userStore((state) => state.loading);
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <main>
            <RregisterchamadosForm />
          </main>
        </>
      }
    </>
  );
}
