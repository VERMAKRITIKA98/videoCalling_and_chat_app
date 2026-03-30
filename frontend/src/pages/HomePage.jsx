import React, { useState } from 'react'
import { useThemeStore } from '../store/useThemeStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getOutgoingFriendReqs, getRecommendedUsers, getUserFriends } from '../lib/api';

const HomePage = () => {
  const queryCliend = useQueryClient();
  const { theme, setTheme } = useThemeStore();
  const [ ongoingRequestIds, setOngoingRequestIds ] = useState([]);
  //  friend suggestions
  const { data:friends=[], isloading:loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends, 
  })
  //  recommended users
  const { data: recommendedUsers = [], isloading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers, 
  })
  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs, 
  })

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: ()=> queryCliend.invalidateQueries({ queryKey: ["outgoingFriendReqs"]}),
  })
  return (
    <div>
      
    </div>
  )
}

export default HomePage
