'use client'

import { IndicadoresPersonalList } from "@/components/IndicadoresPersonalList";
import { IndicadoresSemanais } from "@/components/IndicadoresSemanais";
import { userStore } from "@/stores/userStore";
import { redirect } from "next/navigation";


export default function IndicadoresPage() {
  const { loading, userData } = userStore((state) => state)

  if (!userData) {
    redirect('/login');
  }

    return (
      <main>
        <IndicadoresPersonalList />
        <IndicadoresSemanais />
      </main>
    );
}
