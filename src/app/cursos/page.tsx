"use client";
import { CursosNav } from "@/components/CursosNav";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";
import { checkUserCursosRole} from "@/utils/operations";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { useEffect } from "react";

export default function GestaoCursosPage() {
  const { loading, userData, loadUser } = userStore((state) => state);

  useEffect(() => {
    const loadData = async () => {
      await loadUser();
      if (checkUserCursosRole(userData?.user) === false) {
        redirect("/dashboard");
      }
    };
    loadData();
  }, [loadUser, checkUserCursosRole]);

return (
  <>
    <GlobalStyle />
    <Header />
    {loading ? (
      <Loading />
    ) : (
      <main>
         <CursosNav />
      </main>
    )}
  </>
);
}