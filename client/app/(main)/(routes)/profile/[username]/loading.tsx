import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoader() {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex w-full flex-row items-center gap-2 overflow-hidden md:gap-4">
            <Skeleton className="h-20 w-20 rounded-full md:h-24 md:w-24" />

            <Skeleton className="my-1 h-5 w-40" />
          </div>

          <div className="flex w-full items-center gap-2">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />

            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
