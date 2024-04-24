"use client";
import { CursosNav } from "@/components/CursosNav";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";
import { checkUserCursosRole} from "@/utils/operations";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";

export default function GestaoCursosPage() {
  const { loading, userData } = userStore((state) => state);

  if (checkUserCursosRole(userData?.user) === false) {
    redirect("/dashboard");
  }

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