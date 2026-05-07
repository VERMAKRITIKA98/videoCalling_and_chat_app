import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useAuthUser from '../hooks/useAuthUser';
import { useQuery } from '@tanstack/react-query';
import { getStreamToken } from '../lib/api';
import { channel } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
const ChatPage = () => {
  const { id:targetUserId } = useParams();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setchannel] = useState(null)
  const [loading, setLoading] =  useState(true);

  const { authUser } = useAuthUser();
  const { data } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser
  })

  useEffect(()=>{
    const initChat = async () => {
      if(!tokenData?.token || !authUser) return;
      try {
        console.log("initialize chat client");
        const client = new StreamChat(import.meta.env.VITE_STREAM_KEY);
        await client.connectUser({
          id: authUser._id,
          name: authUser.name,
          image: authUser.profilePic,
        }, tokenData.token);
        // create a unique channel id based on the user ids of the two users
        const channelId = [authUser._id, targetUserId].sort().join("-"); // sorting because id can be in any order
        const currChannel = client.channel("messaging", channelId)
      } catch (error) { 
      }

    }
  })
  return (
    <div>
      
    </div>
  )
}

export default ChatPage
