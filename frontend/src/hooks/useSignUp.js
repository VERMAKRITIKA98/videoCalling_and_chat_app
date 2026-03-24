import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { signupfunction } from '../lib/api';

const useSignUp = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signupfunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
  });

  return { signupMutation: mutate, isPending, error };
};

export default useSignUp
