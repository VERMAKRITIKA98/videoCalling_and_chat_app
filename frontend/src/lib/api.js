import { axiosInstance } from "./axios";

export const signupfunction = async (signUpData) =>{
    // signup api call
    const response = await axiosInstance.post('/auth/signup', signUpData);
    return response.data;    
}

export const loginfunction = async (loginData) =>{
    // signup api call
    const response = await axiosInstance.post('/auth/login', loginData);
    return response.data;    
}

export const logoutfunction = async () =>{
    // signup api call
    const response = await axiosInstance.post('/auth/logout');
    return response.data;    
}

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
}

export const completeOnboardingFunction = async (userData)=>{
    const response = await axiosInstance.post('/auth/onboarding', userData);
    return response.data;
}