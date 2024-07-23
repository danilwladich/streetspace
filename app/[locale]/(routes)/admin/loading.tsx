import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoader() {
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-full max-w-48" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </CardContent>
    </Card>
  );
}
