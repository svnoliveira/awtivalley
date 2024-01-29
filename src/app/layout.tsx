// import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { SideMenu } from "@/components/SideMenu";
import StyledComponentsRegistry from "@/lib/registry";
import { Message } from "@/fragments/Message";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AWTI VALEY",
  description: "Página de gerenciamento de funcionários AWTI Valley",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Message />
          <SideMenu />
          {children}
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
