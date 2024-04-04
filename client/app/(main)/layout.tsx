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

      <div className="pl-[calc(100vw-100%)]">
        <main className="px-2 pb-16 pt-2 md:container md:pb-2 md:pt-16">
          {children}
        </main>
      </div>

      <Footer />
    </>
  );
}
