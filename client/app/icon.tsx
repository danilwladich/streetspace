import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
	width: 32,
	height: 32,
};
export const contentType = "image/png";

export default function Icon() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="white"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
					<path d="M3 6h18" />
					<path d="M16 10a4 4 0 0 1-8 0" />
				</svg>
			</div>
		),
		{ ...size }
	);
}
