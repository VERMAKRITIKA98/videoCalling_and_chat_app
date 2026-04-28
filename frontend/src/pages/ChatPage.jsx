import React, { useState } from 'react'
import { useParams } from 'react-router'

const ChatPage = () => {
  const { id:targetUserId } = useParams();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setchannel] = useState(null)
  const [loading, setLoading] =  useState(true);
  return (
    <div>
      
    </div>
  )
}

export default ChatPage
