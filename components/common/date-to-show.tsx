import moment from "moment";

type SizeType = "normal" | "short" | "full";

function getDateToShow(date: Date, size: SizeType = "normal") {
	if (moment().diff(date, "years")) {
		if (size === "full") {
			return moment(date).format(" DD.MM.YYYY LT");
		}

		return moment(date).format("DD.MM.YYYY");
	}

	if (size === "full") {
		return moment(date).format("DD.MM LT");
	}

	if (moment().diff(date, "days") > 7) {
		return moment(date).format("DD.MM");
	}

	return moment(date).fromNow(size === "short");
}

export function DateToShow({
	date,
	className,
	size,
}: {
	date: Date;
	className?: string;
	size?: SizeType;
}) {
	return (
		<time dateTime={date.toString()} className={className}>
			{getDateToShow(date, size)}
		</time>
	);
}
