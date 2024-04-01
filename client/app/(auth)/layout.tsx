import { getAppTitle } from "@/lib/get-app-title";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: getAppTitle("auth"),
	description:
		"Login to your existing account or create free account now and join our community",
};

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <main className="px-2">{children}</main>;
}
