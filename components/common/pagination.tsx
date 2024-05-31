import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

export default function Pagination({
  currentPage,
  totalCount,
  pageCount,
}: {
  currentPage: number;
  totalCount: number;
  pageCount: number;
}) {
  const items = [];

  const totalPages = Math.ceil(totalCount / pageCount);

  if (currentPage === totalPages) {
    items.push(currentPage - 2);
  }
  for (let i = -1; i <= 1; i++) {
    if (currentPage + i > 0 && currentPage + i <= totalPages) {
      items.push(currentPage + i);
    }
  }
  if (currentPage === 1 && totalPages > 2) {
    items.push(currentPage + 2);
  }

  return (
    <PaginationComponent>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={{ query: { page: currentPage - 1 } }} />
          </PaginationItem>
        )}

        {currentPage - 2 > 0 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {items.map((i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href={{ query: { page: i } }}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage + 2 < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={{ query: { page: currentPage + 1 } }} />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationComponent>
  );
}
