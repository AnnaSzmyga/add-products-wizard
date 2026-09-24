"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="pagination"
        className="rounded-md"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        <ChevronLeft />
        Wstecz
      </Button>

      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        const isActive = pageNumber === currentPage;

        return (
          <Button
            key={pageNumber}
            variant={isActive ? "default" : "ghost"}
            size="pagination"
            className={cn(
              "rounded-md",
              !isActive && "bg-transparent text-foreground hover:bg-muted"
            )}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        );
      })}

      <Button
        variant="ghost"
        size="pagination"
        className="rounded-md"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Dalej
        <ChevronRight />
      </Button>
    </>
  );
}
