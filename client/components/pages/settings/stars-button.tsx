"use client";

import { useClientFetching } from "@/hooks/use-client-fetching";
import { useRouter } from "next/navigation";

import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CommandItem } from "@/components/ui/command";

// TODO: Change the URL to your repository

export default function StarsButton() {
  const router = useRouter();

  const { data, isLoading } = useClientFetching<any[]>(
    "https://api.github.com/repos/danilwladich/2rnik/stargazers",
  );

  const starsCount = data?.length;

  function onClick() {
    router.push("https://github.com/danilwladich/2rnik");
  }

  return (
    <CommandItem className="flex w-full items-center gap-2" onSelect={onClick}>
      {isLoading ? (
        <Skeleton className="h-5 w-full" />
      ) : (
        <>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />

            <span>{starsCount}</span>
          </div>

          <span className="flex-1">Leave a star</span>
        </>
      )}
    </CommandItem>
  );
}
