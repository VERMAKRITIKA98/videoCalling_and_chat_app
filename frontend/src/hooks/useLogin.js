import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { loginfunction } from '../lib/api';

const useLogin = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, error } = useMutation({
        mutationFn: loginfunction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
          },
    });

    return { loginMutation:mutate, isPending, error};
}

export default useLogin
