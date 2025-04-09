import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <main className="flex flex-col items-center gap-6 px-2 pb-16 pt-2 md:container md:pb-4 md:pt-16 [&>*]:w-full">
        {children}
      </main>

      <Footer />
    </>
  );
}
