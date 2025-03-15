/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorResponse } from "@/types/errorResponse";
import { getSession, signOut } from "next-auth/react";
import { toast } from "sonner";

// Helper function to handle API requests
const apiRequest = async (
  method: string,
  path: string,
  data?: any
): Promise<any> => {
  const session = await getSession();
  const token = session?.token; // Retrieve the token once

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}${path}`,
    options
  );

  if (res.status === 401) {
    await signOut();
  }

  if (!res.ok) {
    const errorBody = await res.json().catch(() => "");
    const error: ErrorResponse = {
      name: "ApiError",
      message: `Failed to ${method.toLowerCase()} data`,
      details: {
        status: res.status,
        message:
          res.status === 400 ? errorBody.message : "Unknown error occurred",
      },
    };
    toast.warning(`Error: ${error.message}`)
    throw error;
  }

  return res.json();
};

// Exported functions
export const fetchData = (path: string) => apiRequest("GET", path);
export const createData = (path: string, data: any) =>
  apiRequest("POST", path, data);
export const updateData = (path: string, data: any) =>
  apiRequest("PUT", path, data);
export const deleteData = (path: string) => apiRequest("DELETE", path);
