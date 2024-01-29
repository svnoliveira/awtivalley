"use client";
import { DashboardCard } from "@/components/DashboardCard";
import { Header } from "@/components/Header";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { loading, userData } = userStore((state) => state);

  if (!userData) {
    redirect("/login");
  }

  return (
    <>
      <GlobalStyle />
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <>
          <main>
            <DashboardCard />
          </main>
        </>
      )}
    </>
  );
}
