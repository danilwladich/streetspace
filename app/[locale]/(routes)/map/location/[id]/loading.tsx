import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LocationLoader() {
  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <div className="relative pr-14">
          <Skeleton className="h-6 w-full max-w-xl" />

          <Skeleton className="absolute right-0 top-0 h-10 w-10" />
        </div>

        <div className="pr-14">
          <Skeleton className="h-5 w-full max-w-64 py-0.5" />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col items-start gap-2">
        <div className="mb-2 grid w-full grid-cols-2 gap-2 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-video w-full" />
          ))}
        </div>

        <Skeleton className="aspect-video w-full rounded" />

        <div className="flex w-full items-center justify-between">
          <Skeleton className="h-4 w-32" />

          <Skeleton className="h-9 w-36" />
        </div>
      </CardContent>
    </Card>
  );
}
