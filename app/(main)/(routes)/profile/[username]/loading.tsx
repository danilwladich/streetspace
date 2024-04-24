import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoader() {
  return (
    <>
      <Card className="max-w-4xl">
        <CardContent className="relative flex flex-col justify-between gap-4 md:flex-row">
          <div className="flex w-full flex-1 flex-col items-center gap-2 md:flex-row md:gap-4">
            <div className="flex-1">
              <Skeleton className="h-24 w-24 rounded-full md:h-36 md:w-36" />
            </div>

            <div className="flex w-full flex-col items-center gap-1 md:items-start">
              <Skeleton className="h-7 w-full max-w-52" />

              <Skeleton className="h-5 w-full max-w-48" />
            </div>
          </div>

          <div className="absolute right-2 top-0 md:static">
            <Skeleton className="h-10 w-10" />
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-4xl">
        <CardContent>
          <Skeleton className="h-5 w-full" />
        </CardContent>
      </Card>

      <Card className="max-w-4xl">
        <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div className="flex flex-col items-center">
            <Skeleton className="h-6 w-full max-w-32" />
            <Skeleton className="mt-1 h-5 w-full max-w-40" />
            <Skeleton className="my-1 h-5 w-full max-w-40" />
          </div>
          <div className="flex flex-col items-center">
            <Skeleton className="h-6 w-full max-w-32" />
            <Skeleton className="mt-1 h-5 w-full max-w-40" />
            <Skeleton className="my-1 h-5 w-full max-w-40" />
          </div>
          <div className="flex flex-col items-center">
            <Skeleton className="h-6 w-full max-w-32" />
            <Skeleton className="mt-1 h-5 w-full max-w-40" />
            <Skeleton className="my-1 h-5 w-full max-w-40" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
