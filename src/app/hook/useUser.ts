import {
  createData,
  deleteData,
  fetchData,
  updateData,
} from "@/lib/api-helper";
import { Users } from "@/types/users";
import { useMutation, useQuery } from "@tanstack/react-query";

// Fetch function
const fetchUsers = async (
  offset: number,
  itemsPerPage: number,
  searchQuery: string
): Promise<PaginatedResponse<Users>> =>
  fetchData(
    `/users?offset=${offset}&itemsPerPage=${itemsPerPage}&q=${searchQuery}`
  );

// Mutations
const createUser = (newUser: Users): Promise<PaginatedResponse<Users>> =>
  createData("/users", newUser);

const updateUser = (updatedUser: Users): Promise<PaginatedResponse<Users>> => {
  const path = `/users/${updatedUser.id}`;
  return updateData(path, updatedUser);
};

const deleteFamily = (userId: string): Promise<void> => {
  const path = `/users/${userId}`;
  return deleteData(path);
};

export const useGetUsers = (
  offset: number,
  itemsPerPage: number,
  searchQuery: string
) =>
  useQuery<PaginatedResponse<Users>>({
    queryKey: ["users", offset, itemsPerPage, searchQuery],
    queryFn: () => fetchUsers(offset, itemsPerPage, searchQuery),
  });

export const useCreateUser = () => useMutation({ mutationFn: createUser });
export const useUpdateUser = () => useMutation({ mutationFn: updateUser });
export const useDeleteUser = () => useMutation({ mutationFn: deleteFamily });
