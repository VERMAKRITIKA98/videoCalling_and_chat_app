import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutfunction } from '../lib/api';

const useLogOut = () => {
  const queryClient = useQueryClient();
 const { mutate: logoutUser, isPending, error } = useMutation({
  mutationFn: logoutfunction,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["authUser"] });
  },
});
return { logoutUser, isPending, error };
}
  
  export default useLogOut;
