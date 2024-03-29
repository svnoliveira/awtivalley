import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { SideMenu } from "@/components/SideMenu";
import StyledComponentsRegistry from "@/lib/registry";
import { Message } from "@/fragments/Message";
// import { Raleway } from "next/font/google"

// const raleway = Raleway({subsets: ['latin']});

export const metadata: Metadata = {
  title: "CMA - CDA",
  description: "Página de gerenciamento de funcionários Centro Médico AWTI - Capital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
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
