import {
  COMMENTS_PER_PAGE,
  getMarkerComments,
  getMarkerCommentsCount,
} from "@/services/marker-comment";
import { getTranslations } from "next-intl/server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CommentInput from "./comment-input";
import Comment from "./comment";
import Pagination from "@/components/common/pagination";

export default async function Comments({
  markerId,
  address,
  searchParams,
}: {
  markerId: string;
  address: string;
  searchParams?: {
    page?: string;
  };
}) {
  const t = await getTranslations("pages.map.location.comments");

  const currentPage = Number(searchParams?.page) || 1;
  const comments = await getMarkerComments(markerId, currentPage);
  const totalCount = await getMarkerCommentsCount(markerId);

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>
          <h3>{t("title")}</h3>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <CommentInput markerId={markerId} address={address} />

        {comments.length ? (
          <div className="space-y-2">
            {comments.map((c) => (
              <Comment key={c.id} {...c} />
            ))}
          </div>
        ) : (
          <p className="pt-4 text-center text-muted-foreground">
            {t("noComments")}
          </p>
        )}

        {totalCount > COMMENTS_PER_PAGE && (
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageCount={COMMENTS_PER_PAGE}
          />
        )}
      </CardContent>
    </Card>
  );
}
