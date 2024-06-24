import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { USER_MARKERS_VISITS_PER_PAGE } from "@/services/marker-visitor";
import { Skeleton } from "@/components/ui/skeleton";

export default function VisitsLoader() {
  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <Skeleton className="h-6 w-full max-w-56" />

        <Skeleton className="h-5 w-full max-w-32 py-0.5" />
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {Array.from({ length: USER_MARKERS_VISITS_PER_PAGE }).map((_, i) => (
          <Item key={i} />
        ))}
      </CardContent>

      <CardFooter className="flex justify-center">
        <Skeleton className="h-10 w-full max-w-xs" />
      </CardFooter>
    </Card>
  );
}

function Item() {
  return (
    <div className="space-y-1">
      <Skeleton className="aspect-video w-full" />

      <Skeleton className="h-4 w-full" />
    </div>
  );
}
