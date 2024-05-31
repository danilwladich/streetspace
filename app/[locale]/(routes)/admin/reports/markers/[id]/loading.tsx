import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function MarkerReportsLoader() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-9 w-full max-w-56" />
      </CardHeader>

      <CardContent>
        <Skeleton className="h-40 w-full" />
      </CardContent>
    </Card>
  );
}
