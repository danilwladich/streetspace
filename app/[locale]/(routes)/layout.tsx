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
        <main className="flex flex-col items-center gap-6 px-2 pb-16 pt-2 md:container md:pb-2 md:pt-16 [&>*]:w-full">
          {children}
        </main>
      </div>

      <Footer />
    </>
  );
}
