/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useCreateBank,
  useDeleteBank,
  useGetBank,
  useUpdateBank,
} from "@/app/hook/useBank";
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
import { queryClient } from "@/lib/utils";
import { Bank } from "@/types/bank";
import { ErrorResponse } from "@/types/errorResponse";
import { CirclePlus } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import React from "react";
import { useForm } from "react-hook-form";

export default function AdminBankPage() {
  const [offset, setOffset] = React.useState(0);
  const [itemsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedBank, setSelectedBank] = React.useState<Bank>();
  const qrRef = React.useRef<HTMLCanvasElement>(null);
  const [qrData, setQRData] = React.useState({ id: "", qr_code: "" });
  const { setGLoading } = useUserDataContext();

  const fm = useForm<Bank>({
    mode: "onChange",
  });

  const fmError = fm.formState.errors;

  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = React.useState(false);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = React.useState(false);
  const [isDeleteDrawerOpen, setIsDeleteDrawerOpen] = React.useState(false);

  const { data: responseData } = useGetBank(offset, itemsPerPage, searchQuery);
  const { mutateAsync: createBank } = useCreateBank();
  const { mutateAsync: updateBank } = useUpdateBank();
  const { mutateAsync: deleteBank } = useDeleteBank();

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
    if (selectedBank) {
      setIsDetailDrawerOpen(false);
      setIsDeleteDrawerOpen(false);
    }
    setIsCreateDrawerOpen(false);
    fm.reset();
  };

  const finalSubmit = async (data: Bank) => {
    setGLoading(true);
    const payload = { ...data };
    try {
      if (selectedBank) {
        await updateBank({ ...payload });
      } else {
        await createBank(payload);
      }
      queryClient.invalidateQueries({
        queryKey: ["bank", 0, 5, ""],
      });
      closeModal();
    } catch (e: any) {
      const errRes: ErrorResponse = { ...e };
      console.error(errRes);
    } finally {
      setGLoading(false);
    }
  };

  const handleDelete = async (bank?: Bank) => {
    if (!bank) return;
    setGLoading(true);
    try {
      await deleteBank(bank.id);
      queryClient.invalidateQueries({
        queryKey: ["bank", offset, itemsPerPage, searchQuery],
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
    setSelectedBank(undefined);
  };

  const downloadQRCode = () => {
    if (!qrRef.current) return;

    // Convert canvas to image
    const canvas = qrRef.current as HTMLCanvasElement;
    const url = canvas.toDataURL("image/png");

    // Create a download link
    const link = document.createElement("a");
    link.href = url;
    link.download = `QR_${selectedBank?.name}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Set values for editing mode
  React.useEffect(() => {
    if (isCreateDrawerOpen && selectedBank) {
      fm.setValue("id", selectedBank.id);
      fm.setValue("name", selectedBank.name);
      fm.setValue("address", selectedBank.address);
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
              <TableHead>Nama Bank Sampah</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {responseData?.data.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedBank(item);
                      setIsDetailDrawerOpen(true);
                      setQRData({
                        id: item.id,
                        qr_code: item.qr_code,
                      });
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
            setSelectedBank(undefined);
          }}
        >
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Bank Sampah Detail</DrawerTitle>
              <DrawerDescription>
                <>
                  {selectedBank ? (
                    <div className="mt-2 space-y-2 dark:text-white text-[#202124]">
                      <ItemDecription title="Nama" value={selectedBank.name} />
                      <ItemDecription
                        title="Alamat"
                        value={selectedBank.address}
                      />
                    </div>
                  ) : (
                    <p suppressHydrationWarning className="text-gray-500">
                      Pilih bank sampah untuk melihat detail.
                    </p>
                  )}
                </>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <div className="flex flex-col gap-5">
                <QRCodeCanvas
                  ref={qrRef}
                  value={JSON.stringify(qrData)}
                  size={200}
                  marginSize={5}
                  className="hidden"
                />
                <Button onClick={downloadQRCode}>Download QR</Button>
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
                <Label htmlFor="nama">Nama</Label>
                <Input
                  {...fm.register("name", {
                    required: "Nama is required",
                  })}
                  type="text"
                  id="nama"
                  placeholder="Masukkan Nama.."
                  disabled={!!selectedBank}
                />
                {fmError.name && (
                  <p className="text-red-500 text-sm">{fmError.name.message}</p>
                )}
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="alamat">Alamat</Label>
                <Input
                  {...fm.register("address", {
                    required: "Alamat is required",
                  })}
                  type="text"
                  id="alamat"
                  placeholder="Masukkan Alamat.."
                />
                {fmError.address && (
                  <p className="text-red-500 text-sm">
                    {fmError.address.message}
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
          onClick={() => handleDelete(selectedBank)}
          setActive={setIsDeleteDrawerOpen}
        />
      </div>
    </div>
  );
}
