import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { FOLLOWS_PER_PAGE } from "@/services/follow";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function FollowsLoader() {
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <Skeleton className="h-6 w-full max-w-28" />

        <Skeleton className="h-5 w-full max-w-32 py-0.5" />
      </CardHeader>

      <CardContent className="space-y-1">
        {Array.from({ length: FOLLOWS_PER_PAGE }).map((_, i) => (
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
    <>
      <div className="flex w-full items-center gap-2 p-2">
        <Skeleton className="h-12 w-12 rounded-full md:h-16 md:w-16" />

        <div className="flex-1">
          <Skeleton className="h-5 w-full max-w-44" />
        </div>

        <Skeleton className="h-10 w-10" />
      </div>

      <Separator className="block last:hidden" />
    </>
  );
}
