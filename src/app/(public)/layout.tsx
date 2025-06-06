import type { Metadata } from "next";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import PageHeader from "@/components/page-header/page-header";

export const metadata: Metadata = {
  title: "Antariksh | Transforming Ideas Into Solutions",
  description:
    "Antariksh delivers cutting-edge software development, scalable web solutions, and custom digital products tailored to your business needs. Empowering innovation with modern technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PageHeader />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
