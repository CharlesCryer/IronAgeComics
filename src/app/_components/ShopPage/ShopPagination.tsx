import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/lib/shadcn/components/ui/pagination";
export default function ShopPagination({
  currentPage,
}: {
  currentPage: number;
}) {
  return (
    <>
      {" "}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`?page=${currentPage - 1}`} />
          </PaginationItem>
          <PaginationItem>{currentPage}</PaginationItem>
          <PaginationItem>
            <PaginationNext href={`?page=${currentPage + 1}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
