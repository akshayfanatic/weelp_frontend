import useSWR from "swr";
import { fetcher } from "@/lib/fetchers";

export function useAllVendorsAdmin(query = "") {
  const { data, error, isValidating, isLoading, mutate } = useSWR(`/api/admin/vendors/getallvendors${query}`, fetcher);

  return {
    vendors: data?.data || [], // assuming API returns { data: [...] }
    isLoading,
    isValidating,
    error,
    mutate,
  };
}
