import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { DateToShow } from "@/components/common/date-to-show";

export default function AddedBy({
  username,
  addedAt,
}: {
  username: string;
  addedAt: Date;
}) {
  const t = useTranslations("pages.map.location");

  return (
    <>
      <div className="text-sm text-muted-foreground">
        <span>{t("added") + " "}</span>
        <DateToShow date={addedAt} />
      </div>

      <Link href={`/profile/${username}`}>
        <Button tabIndex={-1} size="sm" className="gap-2">
          <User className="h-4 w-4" />
          <span>{username}</span>
        </Button>
      </Link>
    </>
  );
}
