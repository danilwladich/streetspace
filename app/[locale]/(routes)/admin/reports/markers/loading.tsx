import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { REPORTED_MARKERS_PER_PAGE } from "@/services/marker-report";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReportsMarkersLoader() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-full max-w-48" />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {Array.from({ length: REPORTED_MARKERS_PER_PAGE }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-full" />
        ))}
      </CardContent>

      <CardFooter className="flex justify-center">
        <Skeleton className="h-10 w-full max-w-xs" />
      </CardFooter>
    </Card>
  );
}
