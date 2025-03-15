/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useCreateFamily,
  useDeleteFamily,
  useGetFamilies,
  useUpdateFamily,
} from "@/app/hook/useFamily";
import { useUserDataContext } from "@/components/AuthProvider";
import ConfirmModal from "@/components/ConfirmModal";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  createData,
  deleteData,
  fetchData,
  updateData,
} from "@/lib/api-helper";
import { queryClient } from "@/lib/utils";
import { ErrorResponse } from "@/types/errorResponse";
import { Families } from "@/types/families";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

export default function AdminFamilyPage() {
  const [offset, setOffset] = React.useState(0);
  const [itemsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedFamily, setSelectedFamily] = React.useState<Families>();
  const { setGLoading } = useUserDataContext();

  const fm = useForm<Families>({
    mode: "onChange",
  });

  const fmError = fm.formState.errors;

  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = React.useState(false);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = React.useState(false);
  const [isDeleteDrawerOpen, setIsDeleteDrawerOpen] = React.useState(false);

  const { data: responseData } = useGetFamilies(
    offset,
    itemsPerPage,
    searchQuery
  );
  const { mutateAsync: createFamily } = useCreateFamily();
  const { mutateAsync: updateFamily } = useUpdateFamily();
  const { mutateAsync: deleteFamily } = useDeleteFamily();

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

  const closeModal = () => {
    if (selectedFamily) {
      setIsDetailDrawerOpen(false);
      setIsDeleteDrawerOpen(false);
    }
    setIsCreateDrawerOpen(false);
    fm.reset();
  };

  const finalSubmit = async (data: Families) => {
    setGLoading(true);
    const payload = { ...data };

    try {
      if (selectedFamily) {
        await updateFamily({ ...payload });
      } else {
        await createFamily(payload);
      }
      queryClient.invalidateQueries({
        queryKey: ["families", 0, 5, ""],
      });
      closeModal();
    } catch (e: any) {
      const errRes: ErrorResponse = { ...e };
      console.error(errRes);
    } finally {
      setGLoading(false);
    }
  };

  const handleDelete = async (family?: Families) => {
    if (!family) return;
    setGLoading(true);
    try {
      await deleteFamily(family.kk_number);
      queryClient.invalidateQueries({
        queryKey: ["families", offset, itemsPerPage, searchQuery],
      });
      closeModal();
    } catch (e: any) {
      const errRes: ErrorResponse = { ...e };
      console.error(errRes);
    } finally {
      setGLoading(false);
    }
  };

  const preSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    fm.handleSubmit(finalSubmit)(e);
  };

  const closeDetailDrawer = () => {
    setIsDetailDrawerOpen(false);
    setSelectedFamily(undefined);
  };

  // Set values for editing mode
  React.useEffect(() => {
    if (isCreateDrawerOpen && selectedFamily) {
      fm.setValue("kk_number", selectedFamily.kk_number);
      fm.setValue("family_name", selectedFamily.family_name);
    }
  }, [isCreateDrawerOpen]);

  return (
    <div className="relative flex flex-col">
      <Button
        onClick={() => setIsCreateDrawerOpen(true)}
        className="fixed bottom-[100px] rounded-full right-4"
      >
        <CirclePlus />
      </Button>
      <div className="pt-6">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">No</TableHead>
              <TableHead>No. KK</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {responseData?.data.map((item, idx) => (
              <TableRow key={item.kk_number}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{item.family_name}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedFamily(item);
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

        {/* Bottom Drawer */}
        <Drawer
          open={isDetailDrawerOpen}
          onOpenChange={setIsDetailDrawerOpen}
          onClose={() => {
            setSelectedFamily(undefined);
          }}
        >
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Family Detail</DrawerTitle>
              <DrawerDescription asChild>
                {selectedFamily ? (
                  <div className="mt-2 space-y-2 dark:text-white text-[#202124]">
                    <ItemDecription
                      title="No. KK"
                      value={selectedFamily.kk_number}
                    />
                    <ItemDecription
                      title="Nama Keluarga"
                      value={selectedFamily.family_name}
                    />
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Pilih keluarga untuk melihat detail.
                  </p>
                )}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-10">
                  <Button
                    onClick={() => setIsCreateDrawerOpen(true)}
                    variant="outline"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => setIsDeleteDrawerOpen(true)}
                    variant="destructive"
                  >
                    Hapus
                  </Button>
                </div>
                <Button onClick={closeDetailDrawer} variant="ghost">
                  Tutup
                </Button>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        {/* Create User Drawer */}
        <Drawer
          open={isCreateDrawerOpen}
          onOpenChange={setIsCreateDrawerOpen}
          onClose={() => console.log("is closeeed")}
          dismissible
        >
          <DrawerContent
            onInteractOutside={(event) => {
              event.preventDefault();
            }}
          >
            <DrawerHeader>
              <DrawerTitle>Tambah Keluarga</DrawerTitle>
            </DrawerHeader>
            <form
              onSubmit={preSubmit}
              className="flex flex-col gap-7 px-4 mb-4"
            >
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="nokk">No. KK</Label>
                <Input
                  {...fm.register("kk_number", {
                    required: "No. KK is required",
                    pattern: {
                      value: /^\d{16}$/,
                      message: "Nomor KK harus 16 digit angka!",
                    },
                  })}
                  type="number"
                  id="nokk"
                  placeholder="Masukkan No. KK.."
                  disabled={!!selectedFamily}
                />
                {fmError.kk_number && (
                  <p className="text-red-500 text-sm">
                    {fmError.kk_number.message}
                  </p>
                )}
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="nameFam">Nama Keluarga</Label>
                <Input
                  {...fm.register("family_name", {
                    required: "Nama Keluarga is required",
                  })}
                  type="text"
                  id="nameFam"
                  placeholder="Masukkan Nama Keluarga.."
                />
                {fmError.family_name && (
                  <p className="text-red-500 text-sm">
                    {fmError.family_name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <Button type="submit">Simpan</Button>
                <Button type="button" variant="ghost" onClick={closeModal}>
                  Tutup
                </Button>
              </div>
            </form>
          </DrawerContent>
        </Drawer>

        <ConfirmModal
          isActive={isDeleteDrawerOpen}
          description="Apakah Anda Yakin Menghapus Data ini?"
          onClick={() => handleDelete(selectedFamily)}
          setActive={setIsDeleteDrawerOpen}
        />
      </div>
    </div>
  );
}
