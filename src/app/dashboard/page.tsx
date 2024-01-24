'use client'
import { DashboardCard } from "@/components/DashboardCard";
import { userStore } from "@/stores/userStore";
import { redirect } from "next/navigation";

const { loading, userData } = userStore((state) => state)

  if (!userData) {
    redirect('/login');
  }

export default function DashboardPage() {
    return (
      <main>
        <DashboardCard />
      </main>
    );
}