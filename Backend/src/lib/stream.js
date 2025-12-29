import { StreamChat } from 'stream-chat';
import "dotenv/config";

const api_key = process.env.STEAM_API_KEY;
const api_secret = process.env.STEAM_API_SECRET;

if(!api_key || !api_secret){
    console.log('Soming missing in Stream API credential');
}

const client = StreamChat.getInstance(api_key, api_secret);

export const upsertStreamUser = async (userData)=>{
    try {
        await client.upsertUser(userData);
        return userData;
    }catch(error){
        console.log('error creating stream user', error);
    }
}

export const generateStreamToken = async (userId)=>{
    try {
        const token = await client.createToken(userId);
        return token;
    }
    catch(error){
        console.log('error creating stram token', error);
        return null;
    }
}