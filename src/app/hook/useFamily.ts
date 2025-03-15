import {
  createData,
  deleteData,
  fetchData,
  updateData,
} from "@/lib/api-helper";
import { Families } from "@/types/families";
import { useMutation, useQuery } from "@tanstack/react-query";

// Fetch function
const fetchFamily = async (
  offset: number,
  itemsPerPage: number,
  searchQuery: string
): Promise<PaginatedResponse<Families>> =>
  fetchData(
    `/family?offset=${offset}&itemsPerPage=${itemsPerPage}&q=${searchQuery}`
  );

// Mutations
const createFamily = (
  newFamily: Families
): Promise<PaginatedResponse<Families>> => createData("/family", newFamily);

const updateFamily = (
  updatedFamily: Families
): Promise<PaginatedResponse<Families>> => {
  const path = `/family/${updatedFamily.kk_number}`;
  const payload = {
    family_name: updatedFamily.family_name,
  };
  return updateData(path, payload);
};
const deleteFamily = (familyId: string): Promise<void> => {
  const path = `/family/${familyId}`;
  return deleteData(path);
};

export const useGetFamilies = (
  offset: number,
  itemsPerPage: number,
  searchQuery: string
) =>
  useQuery<PaginatedResponse<Families>>({
    queryKey: ["families", offset, itemsPerPage, searchQuery],
    queryFn: () => fetchFamily(offset, itemsPerPage, searchQuery),
  });

export const useCreateFamily = () => useMutation({ mutationFn: createFamily });
export const useUpdateFamily = () => useMutation({ mutationFn: updateFamily });
export const useDeleteFamily = () => useMutation({ mutationFn: deleteFamily });
