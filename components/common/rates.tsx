import { Star } from "lucide-react";

export default function Rates({ avg, count }: { avg: number; count: number }) {
  const roundedAvgRate = Math.floor(avg);

  const lastStarWidth = `${(avg - roundedAvgRate) * 0.75}rem`;

  return (
    <div className="flex items-center gap-0.5 text-muted-foreground">
      <span className="text-sm">{avg}</span>

      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="relative">
          <Star
            className="h-3 w-3"
            fill={roundedAvgRate > i ? "currentColor" : "none"}
          />

          {avg > i && avg !== i && (
            <div
              className="absolute left-0 top-0 overflow-hidden"
              style={{ width: lastStarWidth }}
            >
              <Star className="h-3 w-3" fill="currentColor" />
            </div>
          )}
        </div>
      ))}

      <span className="text-sm">({count})</span>
    </div>
  );
}
