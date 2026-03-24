import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  // Tanstack query crash course
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false, // Disable automatic retries - auth check
  });
  return { isLoading: authUser.isLoading, authUser: authUser.data?.user || null }
}

export default useAuthUser
