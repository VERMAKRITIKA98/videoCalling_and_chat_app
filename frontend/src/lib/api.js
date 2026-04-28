import { axiosInstance } from "./axios";

export const signupfunction = async (signUpData) =>{
    // signup api call
    const response = await axiosInstance.post('/auth/signup', signUpData);
    return response.data;    
};

export const loginfunction = async (loginData) =>{
    // signup api call
    const response = await axiosInstance.post('/auth/login', loginData);
    return response.data;    
};

export const logoutfunction = async () =>{
    // signup api call
    const response = await axiosInstance.post('/auth/logout');
    return response.data;    
};

export const getAuthUser = async () => {
    try {
        const res =  await axiosInstance.get("/auth/me");
        return res.data;
    } catch (error) {
        console.error(
            error.response?.data?.message || "Error fetching authenticated user"
          );
        return null;
    }
};

export const completeOnboardingFunction = async (userData)=>{
    const response = await axiosInstance.post('/auth/onboarding', userData);
    return response.data;
};

export async function getUserFriends() {
    const response = await axiosInstance.get('/users/friends');
    return response.data;
}

export async function getRecommendedUsers(){
    const response = await axiosInstance.get('/users');
    return response.data || [];
}

export async function getOutgoingFriendReqs(){
    const response = await axiosInstance.get('/users/outgoing-friend-requests');
    console.log('outgoing-friend-requests', response);
    return response.data;
}
export async function sendFriendRequest(userId){
    const response = await axiosInstance.post(`/users/friend-request/${userId}`);
    return response.data;
}
export async function getFriendRequest(){
    const response = await axiosInstance.post("/users/friend-requests");
    return response.data;
}
export async function acceptFriendRequest(requestId){
    const response = await axiosInstance.post(`/users/friend-request/${requestId}/accept`);
    return response.data;
}

export async function getStreamToken(){
    const response = await axiosInstance.get("/chat/token");
    return response.data;
}