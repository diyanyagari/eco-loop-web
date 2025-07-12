/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetFamilies } from "@/app/hook/useFamily";
import {
  useCreateUser,
  useDeleteUser,
  useGetUsers,
  useUpdateUser,
} from "@/app/hook/useUser";
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

export default function AdminUsersPage() {
  // const [offset, setOffset] = React.useState(0);
  // const [itemsPerPage] = React.useState(5);
  // const [searchQuery, setSearchQuery] = React.useState("");
  // const [selectedUser, setSelectedUser] = React.useState<Users>();
  // const { setGLoading } = useUserDataContext();

  // const fm = useForm<Users>({
  //   mode: "onChange",
  // });

  // const fmError = fm.formState.errors;

  // const [isDetailDrawerOpen, setIsDetailDrawerOpen] = React.useState(false);
  // const [isCreateDrawerOpen, setIsCreateDrawerOpen] = React.useState(false);
  // const [isDeleteDrawerOpen, setIsDeleteDrawerOpen] = React.useState(false);

  // const { data: responseData } = useGetUsers(offset, itemsPerPage, searchQuery);
  // const { data: responseDataFamily } = useGetFamilies(0, 1000, "");
  // const { mutateAsync: createUser } = useCreateUser();
  // const { mutateAsync: updateUser } = useUpdateUser();
  // const { mutateAsync: deleteUser } = useDeleteUser();

  // const prevPage = () => {
  //   if (offset > 0) {
  //     setOffset(offset - itemsPerPage);
  //   }
  // };

  // const nextPage = () => {
  //   if (offset + itemsPerPage < (responseData?.totalItems ?? 0)) {
  //     setOffset(Math.min(offset + itemsPerPage, responseData?.totalItems ?? 0));
  //   }
  // };

  // const maxPagination = Math.ceil(
  //   (responseData?.totalItems ?? 0) / (responseData?.itemsPerPage ?? 1)
  // );

  // const closeModal = () => {
  //   if (selectedUser) {
  //     setIsDetailDrawerOpen(false);
  //     setIsDeleteDrawerOpen(false);
  //   }
  //   setIsCreateDrawerOpen(false);
  //   fm.reset();
  // };

  // const finalSubmit = async (data: Users) => {
  //   setGLoading(true);
  //   const payload = { ...data };
  //   try {
  //     if (selectedUser) {
  //       await updateUser({ ...payload });
  //     } else {
  //       await createUser(payload);
  //     }
  //     queryClient.invalidateQueries({
  //       queryKey: ["users", 0, 5, ""],
  //     });
  //     closeModal();
  //   } catch (e: any) {
  //     const errRes: ErrorResponse = { ...e };
  //     console.error(errRes);
  //   } finally {
  //     setGLoading(false);
  //   }
  // };

  // const handleDelete = async (user?: Users) => {
  //   if (!user) return;
  //   setGLoading(true);
  //   try {
  //     await deleteUser(user.id);
  //     queryClient.invalidateQueries({
  //       queryKey: ["users", offset, itemsPerPage, searchQuery],
  //     });
  //     closeModal();
  //   } catch (e: any) {
  //     const errRes: ErrorResponse = { ...e };
  //     console.error(errRes);
  //   } finally {
  //     setGLoading(false);
  //   }
  // };

  // const preSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   fm.handleSubmit(finalSubmit)(e);
  // };

  // const closeDetailDrawer = () => {
  //   setIsDetailDrawerOpen(false);
  //   setSelectedUser(undefined);
  // };

  // // Set values for editing mode
  // React.useEffect(() => {
  //   if (isCreateDrawerOpen && selectedUser) {
  //     fm.setValue("id", selectedUser.id);
  //     fm.setValue("familyId", selectedUser.familyId);
  //     fm.setValue("name", selectedUser.name);
  //     fm.setValue("phone", selectedUser.phone);
  //     fm.setValue("nik", selectedUser.nik);
  //     fm.setValue("email", selectedUser.email);
  //   }
  // }, [isCreateDrawerOpen]);

  return (
    <div className="relative flex flex-col">
      
    </div>
  );
}
