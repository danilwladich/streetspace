import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function MarkerReportsLoader() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-full max-w-52" />
        <Skeleton className="h-5 w-full max-w-96 py-0.5" />
      </CardHeader>

      <CardContent>
        <Skeleton className="h-40 w-full" />
      </CardContent>

      <CardFooter className="flex justify-center">
        <Skeleton className="h-10 w-full max-w-xs" />
      </CardFooter>
    </Card>
  );
}
