"use client";
import { DashboardCard } from "@/components/DashboardCard";
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
    <main>
      <GlobalStyle />
      {loading ? <Loading /> : <DashboardCard />}
    </main>
  );
}
