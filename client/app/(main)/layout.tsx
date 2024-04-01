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
				<main className="pt-2 md:pt-16 pb-16 md:pb-2 px-2 md:container">
					{children}
				</main>
			</div>

			<Footer />
		</>
	);
}
