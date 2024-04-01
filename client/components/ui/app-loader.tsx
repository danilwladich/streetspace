export function AppLoader() {
	const oddColor = "fill-neutral-800";
	const evenColor = "fill-neutral-100";

	return (
		<svg
			className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-showing-delay"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width="140px"
			height="140px"
			viewBox="0 0 100 100"
			preserveAspectRatio="xMidYMid"
		>
			<defs>
				<filter
					id="ldio-crflv8hai3u-filter"
					x="-100%"
					y="-100%"
					width="300%"
					height="300%"
					colorInterpolationFilters="sRGB"
				>
					<feGaussianBlur
						in="SourceGraphic"
						stdDeviation="2.4000000000000004"
					></feGaussianBlur>
					<feComponentTransfer result="cutoff">
						<feFuncA type="table" tableValues="0 0 0 0 0 0 1 1 1 1 1"></feFuncA>
					</feComponentTransfer>
				</filter>
			</defs>
			<g filter="url(#ldio-crflv8hai3u-filter)">
				<g transform="translate(50 50)">
					<g>
						<circle className={oddColor} cx="17" cy="0" r="5">
							<animate
								attributeName="r"
								keyTimes="0;0.5;1"
								values="3.5999999999999996;8.399999999999999;3.5999999999999996"
								dur="4s"
								repeatCount="indefinite"
								begin="-0.25s"
							></animate>
						</circle>
						<animateTransform
							attributeName="transform"
							type="rotate"
							keyTimes="0;1"
							values="0;360"
							dur="4s"
							repeatCount="indefinite"
							begin="0s"
						></animateTransform>
					</g>
				</g>
				<g transform="translate(50 50)">
					<g>
						<circle className={evenColor} cx="17" cy="0" r="5">
							<animate
								attributeName="r"
								keyTimes="0;0.5;1"
								values="3.5999999999999996;8.399999999999999;3.5999999999999996"
								dur="2s"
								repeatCount="indefinite"
								begin="-0.2s"
							></animate>
						</circle>
						<animateTransform
							attributeName="transform"
							type="rotate"
							keyTimes="0;1"
							values="0;360"
							dur="2s"
							repeatCount="indefinite"
							begin="-0.05s"
						></animateTransform>
					</g>
				</g>
				<g transform="translate(50 50)">
					<g>
						<circle className={oddColor} cx="17" cy="0" r="5">
							<animate
								attributeName="r"
								keyTimes="0;0.5;1"
								values="3.5999999999999996;8.399999999999999;3.5999999999999996"
								dur="1.3333333333333333s"
								repeatCount="indefinite"
								begin="-0.15s"
							></animate>
						</circle>
						<animateTransform
							attributeName="transform"
							type="rotate"
							keyTimes="0;1"
							values="0;360"
							dur="1.3333333333333333s"
							repeatCount="indefinite"
							begin="-0.1s"
						></animateTransform>
					</g>
				</g>
				<g transform="translate(50 50)">
					<g>
						<circle className={evenColor} cx="17" cy="0" r="5">
							<animate
								attributeName="r"
								keyTimes="0;0.5;1"
								values="3.5999999999999996;8.399999999999999;3.5999999999999996"
								dur="1s"
								repeatCount="indefinite"
								begin="-0.1s"
							></animate>
						</circle>
						<animateTransform
							attributeName="transform"
							type="rotate"
							keyTimes="0;1"
							values="0;360"
							dur="1s"
							repeatCount="indefinite"
							begin="-0.15s"
						></animateTransform>
					</g>
				</g>
				<g transform="translate(50 50)">
					<g>
						<circle className={oddColor} cx="17" cy="0" r="5">
							<animate
								attributeName="r"
								keyTimes="0;0.5;1"
								values="3.5999999999999996;8.399999999999999;3.5999999999999996"
								dur="0.8s"
								repeatCount="indefinite"
								begin="-0.05s"
							></animate>
						</circle>
						<animateTransform
							attributeName="transform"
							type="rotate"
							keyTimes="0;1"
							values="0;360"
							dur="0.8s"
							repeatCount="indefinite"
							begin="-0.2s"
						></animateTransform>
					</g>
				</g>
			</g>
		</svg>
	);
}
