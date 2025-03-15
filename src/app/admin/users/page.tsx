/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Users } from "@/types/users";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useGetFamilies } from "../family/page";

// ========================== fetcher ==========================

const fetchUsers = async (
  offset: number,
  itemsPerPage: number,
  searchQuery: string
): Promise<PaginatedResponse<Users>> =>
  fetchData(
    `/users?offset=${offset}&itemsPerPage=${itemsPerPage}&q=${searchQuery}`
  );

const createUser = async (newUser: Users): Promise<PaginatedResponse<Users>> =>
  createData("/users", newUser);

const updateUser = async (
  updatedUser: Users
): Promise<PaginatedResponse<Users>> => {
  const path = `/users/${updatedUser.id}`;
  return updateData(path, updatedUser);
};

const deleteUser = async (userId: string): Promise<void> => {
  const path = `/users/${userId}`;
  return deleteData(path);
};

// ========================== fetcher ==========================

const useGetUsers = (
  offset: number,
  itemsPerPage: number,
  searchQuery: string
) =>
  useQuery<PaginatedResponse<Users>>({
    queryKey: ["users", offset, itemsPerPage, searchQuery],
    queryFn: () => fetchUsers(offset, itemsPerPage, searchQuery),
  });

const CreateNewUser = () => useMutation({ mutationFn: createUser });
const UpdateUser = () => useMutation({ mutationFn: updateUser });
const DeleteUser = () => useMutation({ mutationFn: deleteUser });

export default function AdminUsersPage() {
  const [offset, setOffset] = React.useState(0);
  const [itemsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState<Users>();
  const { setGLoading } = useUserDataContext();

  const fm = useForm<Users>({
    mode: "onChange",
  });

  const fmError = fm.formState.errors;

  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = React.useState(false);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = React.useState(false);
  const [isDeleteDrawerOpen, setIsDeleteDrawerOpen] = React.useState(false);

  const { data: responseData } = useGetUsers(offset, itemsPerPage, searchQuery);
  const { data: responseDataFamily } = useGetFamilies(0, 1000, "");
  const { mutateAsync: createUser } = CreateNewUser();
  const { mutateAsync: updateUser } = UpdateUser();
  const { mutateAsync: deleteUser } = DeleteUser();

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
    if (selectedUser) {
      setIsDetailDrawerOpen(false);
      setIsDeleteDrawerOpen(false);
    }
    setIsCreateDrawerOpen(false);
    fm.reset();
  };

  const finalSubmit = async (data: Users) => {
    setGLoading(true);
    const payload = { ...data };
    try {
      if (selectedUser) {
        await updateUser({ ...payload });
      } else {
        await createUser(payload);
      }
      queryClient.invalidateQueries({
        queryKey: ["users", 0, 5, ""],
      });
      closeModal();
    } catch (e: any) {
      const errRes: ErrorResponse = { ...e };
      console.error(errRes);
    } finally {
      setGLoading(false);
    }
  };

  const handleDelete = async (user?: Users) => {
    if (!user) return;
    setGLoading(true);
    try {
      await deleteUser(user.id);
      queryClient.invalidateQueries({
        queryKey: ["users", offset, itemsPerPage, searchQuery],
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
    setSelectedUser(undefined);
  };

  // Set values for editing mode
  React.useEffect(() => {
    if (isCreateDrawerOpen && selectedUser) {
      fm.setValue("id", selectedUser.id);
      fm.setValue("familyId", selectedUser.familyId);
      fm.setValue("name", selectedUser.name);
      fm.setValue("phone", selectedUser.phone);
      fm.setValue("nik", selectedUser.nik);
      fm.setValue("email", selectedUser.email);
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
              <TableHead>Nama</TableHead>
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
                      console.log("dsaads ", item);
                      setSelectedUser(item);
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
            setSelectedUser(undefined);
          }}
        >
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>User Detail</DrawerTitle>
              <DrawerDescription asChild>
                {selectedUser ? (
                  <div className="mt-2 space-y-2 dark:text-white text-[#202124]">
                    <ItemDecription title="Name" value={selectedUser.name} />
                    <ItemDecription title="NIK" value={selectedUser.nik} />
                    <ItemDecription title="Email" value={selectedUser.email} />
                    <ItemDecription title="Phone" value={selectedUser.phone} />
                  </div>
                ) : (
                  <p suppressHydrationWarning className="text-gray-500">
                    Pilih user untuk melihat detail.
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
              <DrawerTitle>Tambah User</DrawerTitle>
            </DrawerHeader>
            <form
              onSubmit={preSubmit}
              className="flex flex-col gap-7 px-4 mb-4"
            >
              <Controller
                name="familyId"
                control={fm.control}
                rules={{ required: "KK is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih no. KK" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {responseDataFamily?.data.map((item) => (
                          <SelectItem
                            key={item.kk_number}
                            value={item.kk_number}
                          >
                            {item.kk_number} | {item.family_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Nama</Label>
                <Input
                  {...fm.register("name", {
                    required: "Name is required",
                  })}
                  type="text"
                  id="name"
                  placeholder="Masukkan Nama.."
                  // disabled={!!selectedFamily}
                />
                {fmError.name && (
                  <p className="text-red-500 text-sm">{fmError.name.message}</p>
                )}
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="nohp">No. Handphone</Label>
                <Input
                  {...fm.register("phone", {
                    required: "No. KK is required",
                    pattern: {
                      value: /^08\d{8,11}$/,
                      message:
                        "Nomor HP harus dimulai dengan 08 dan memiliki 10-13 digit angka!",
                    },
                  })}
                  type="text"
                  id="nohp"
                  placeholder="Masukkan No. Handphone.."
                  // disabled={!!selectedFamily}
                />
                {fmError.phone && (
                  <p className="text-red-500 text-sm">
                    {fmError.phone.message}
                  </p>
                )}
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="nik">NIK</Label>
                <Input
                  {...fm.register("nik", {
                    required: "NIK wajib diisi!",
                    pattern: {
                      value: /^\d{16}$/,
                      message: "NIK harus terdiri dari 16 digit angka!",
                    },
                  })}
                  type="text"
                  id="nik"
                  placeholder="Masukkan NIK.."
                  // disabled={!!selectedFamily}
                />
                {fmError.nik && (
                  <p className="text-red-500 text-sm">{fmError.nik.message}</p>
                )}
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...fm.register("email", {
                    pattern: {
                      value: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: "Masukkan email yang valid!",
                    },
                  })}
                  type="text"
                  id="email"
                  placeholder="Masukkan Email.."
                  // disabled={!!selectedFamily}
                />
                {fmError.email && (
                  <p className="text-red-500 text-sm">
                    {fmError.email.message}
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
          onClick={() => handleDelete(selectedUser)}
          setActive={setIsDeleteDrawerOpen}
        />
      </div>
    </div>
  );
}
