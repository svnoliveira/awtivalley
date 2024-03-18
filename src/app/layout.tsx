import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { Footer } from "@/components/Footer";
import { SideMenu } from "@/components/SideMenu";
import StyledComponentsRegistry from "@/lib/registry";
import { Message } from "@/fragments/Message";


const raleway = Raleway({ subsets: ["latin"] });

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
    <html lang="pt-br">
      <body className={raleway.className}>
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
