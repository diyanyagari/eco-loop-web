/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useUserDataContext } from "@/components/AuthProvider";
import ItemDecription from "@/components/ItemDecription";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchData } from "@/lib/api-helper";
import { Transaction } from "@/types/transaction";
import { formatDateTime } from "@/utils/formatDateTime";
import { useQuery } from "@tanstack/react-query";
import React from "react";

// ========================== fetcher ==========================

const fetchTransaction = async (
  offset: number,
  itemsPerPage: number,
  searchQuery: string,
  userId: string
): Promise<PaginatedResponse<Transaction>> =>
  fetchData(
    `/transactions/${userId}?offset=${offset}&itemsPerPage=${itemsPerPage}&q=${searchQuery}`
  );

// ========================== fetcher ==========================

export const useGetTransaction = (
  offset: number,
  itemsPerPage: number,
  searchQuery: string,
  userId: string
) =>
  useQuery<PaginatedResponse<Transaction>>({
    queryKey: ["transaction", offset, itemsPerPage, searchQuery],
    queryFn: () => fetchTransaction(offset, itemsPerPage, searchQuery, userId),
  });

export default function MeTransaksiPage() {
  const [offset, setOffset] = React.useState(0);
  const [itemsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTrx, setSelectedTrx] = React.useState<Transaction>();
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = React.useState(false);
  const { user } = useUserDataContext();
  const { data: responseData } = useGetTransaction(
    offset,
    itemsPerPage,
    searchQuery,
    user.id
  );

  const prevPage = () => {
    if (offset > 0) {
      setOffset(offset - itemsPerPage);
    }
  };

  const nextPage = () => {
    if (offset + itemsPerPage < (responseData?.totalItems ?? 0)) {
      setOffset(Math.min(offset + itemsPerPage, responseData?.totalItems ?? 0));
    }
  };

  const maxPagination = Math.ceil(
    (responseData?.totalItems ?? 0) / (responseData?.itemsPerPage ?? 1)
  );

  const closeDetailDrawer = () => {
    setIsDetailDrawerOpen(false);
    setSelectedTrx(undefined);
  };

  return (
    <div className="relative flex flex-col">
      <div className="pt-6">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">No</TableHead>
              <TableHead>Lokasi Bank Sampah</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {responseData?.data.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{item?.location?.name}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedTrx(item);
                      setIsDetailDrawerOpen(true);
                    }}
                  >
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              {responseData && responseData?.offset > 0 && (
                <PaginationPrevious onClick={prevPage} />
              )}
            </PaginationItem>
            <PaginationItem>
              <span className="text-sm font-medium">
                Page {responseData && responseData?.offset + 1} of{" "}
                {maxPagination}
              </span>
            </PaginationItem>
            <PaginationItem>
              {responseData && responseData.offset + 1 < maxPagination && (
                <PaginationNext onClick={nextPage} />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <Drawer
          open={isDetailDrawerOpen}
          onOpenChange={setIsDetailDrawerOpen}
          onClose={() => {
            setSelectedTrx(undefined);
          }}
        >
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Detail Setor Sampah</DrawerTitle>
              <DrawerDescription asChild>
                  {selectedTrx ? (
                    <div className="mt-2 space-y-2 dark:text-white text-[#202124]">
                      <ItemDecription
                        title="Tanggal Setor"
                        value={formatDateTime(selectedTrx?.created_at)}
                      />
                      <ItemDecription
                        title="Tempat Bank Sampah"
                        value={selectedTrx?.location?.name}
                      />
                      <ItemDecription
                        title="Nama Penyetor"
                        value={selectedTrx?.user?.name}
                      />
                    </div>
                  ) : (
                    <p suppressHydrationWarning className="text-gray-500">
                      Pilih bank sampah untuk melihat detail.
                    </p>
                  )}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <div className="flex flex-col gap-5">
                <Button onClick={closeDetailDrawer} variant="ghost">
                  Tutup
                </Button>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
