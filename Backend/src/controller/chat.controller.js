import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res){
    try {
        const token = generateStreamToken(req.user)
        res.status(200).json({token});
    } catch (error) {
        console.log("Error in getstreamToken conetroller", error);
        res.status(500).json({message: "Something went wrong"});
    }
}