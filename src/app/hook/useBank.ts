import { useQuery, useMutation } from "@tanstack/react-query";
import {
  createData,
  deleteData,
  fetchData,
  updateData,
} from "@/lib/api-helper";
import { Bank } from "@/types/bank";

// Fetch function
const fetchBank = async (
  offset: number,
  itemsPerPage: number,
  searchQuery: string
) =>
  fetchData(
    `/bank-location?offset=${offset}&itemsPerPage=${itemsPerPage}&q=${searchQuery}`
  );

// Mutations
const createBank = (newBank: Bank) => createData("/bank-location", newBank);
const updateBank = (updatedBank: Bank) =>
  updateData(`/bank-location/${updatedBank.id}`, updatedBank);
const deleteBank = (bankId: string) => deleteData(`/bank-location/${bankId}`);

export const useGetBank = (
  offset: number,
  itemsPerPage: number,
  searchQuery: string
) =>
  useQuery<PaginatedResponse<Bank>>({
    queryKey: ["bank", offset, itemsPerPage, searchQuery],
    queryFn: () => fetchBank(offset, itemsPerPage, searchQuery),
  });

export const useCreateBank = () => useMutation({ mutationFn: createBank });
export const useUpdateBank = () => useMutation({ mutationFn: updateBank });
export const useDeleteBank = () => useMutation({ mutationFn: deleteBank });
