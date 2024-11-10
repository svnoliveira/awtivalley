"use client";
import { MinigameCDA } from "@/components/MinigameCDA";
import { Header } from "@/components/Header";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function HomeMinigameCDA() {
  const { loading, userData, loadUser } = userStore((state) => state);

  useEffect(() => {
    const loadData = async () => {
      await loadUser();
      if (!userData) {
        redirect("/login");
      }
    };
    loadData();
  }, [loadUser]);

  return (
    <>
      <GlobalStyle />
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <>
          <main>
            <MinigameCDA />
          </main>
        </>
      )}
    </>
  );
}
