import {
  fetchData
} from "@/lib/api-helper";
import { Transaction } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";

// Fetch function
const fetchTransaction = async (
  offset: number,
  itemsPerPage: number,
  searchQuery: string,
  userId: string
): Promise<PaginatedResponse<Transaction>> =>
  fetchData(
    `/transactions/${userId}?offset=${offset}&itemsPerPage=${itemsPerPage}&q=${searchQuery}`
  );

// // Mutations
// const createFamily = (
//   newFamily: Families
// ): Promise<PaginatedResponse<Families>> => createData("/family", newFamily);

// const updateFamily = (
//   updatedFamily: Families
// ): Promise<PaginatedResponse<Families>> => {
//   const path = `/family/${updatedFamily.kk_number}`;
//   const payload = {
//     family_name: updatedFamily.family_name,
//   };
//   return updateData(path, payload);
// };
// const deleteFamily = (familyId: string): Promise<void> => {
//   const path = `/family/${familyId}`;
//   return deleteData(path);
// };

export const useGetTransaction = (
  offset: number,
  itemsPerPage: number,
  searchQuery: string,
  userId: string
) =>
  useQuery<PaginatedResponse<Transaction>>({
    queryKey: ["transaction", offset, itemsPerPage, searchQuery],
    queryFn: () => fetchTransaction(offset, itemsPerPage, searchQuery, userId),
    // staleTime: 5 * 60 * 1000,
    // placeholderData: (previousData) => previousData,
    // enabled: !!userId, 
  });

// export const useCreateFamily = () => useMutation({ mutationFn: createFamily });
// export const useUpdateFamily = () => useMutation({ mutationFn: updateFamily });
// export const useDeleteFamily = () => useMutation({ mutationFn: deleteFamily });
