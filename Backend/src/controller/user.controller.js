import FriendRequest from "../models/FriendRequest";
import User from "../models/user.model";

export async function recommendedUsers(req, res) {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedFriends = await User.find({
            $and: [
                { _id: { $ne: currentUserId}},
                { _id: { $in: currentUser.friends}},
                { isOnboarded: true}
            ]
        })
        res.status(200).json({success, recommendedFriends})
    } catch (error) {
        console.log("Error in recommendedUsers controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function getMyFriends(req, res) {
    try {
        const user = User.findOne(req.user.id).select("friends").populate("friends", "name profilePic bio learningLanguage nativeLanguage location");
        res.status(200).json({success: true, friends: user.friends});
    } catch (error) {
        console.log("Error in getMyFriends controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function sendFriendRequest(req, res){
    try {
        const myId = req.user.id;
        const {id : recipitantId} = req.params;
        if(myId === recipitantId){
            return res.status(400).json({message: "A user cann't send friend request to himself"});
        }       
        const recipitantUser = await User.findById(recipitantId);
        if(!recipitantUser){
            return res.status(404).json({message: "recipitant user not found"});
        }
        if(recipitantUser.friends.includes(myId)){
            return res.status(400).json({message: "You are already friends"});
        }
        const existingRequest = await FriendRequest.findOne({
             $or: [
                {sender: myId, recipitant: recipitantId},
                {sender: recipitantId, recipitant: myId}
             ]
        });
        if(existingRequest){
            return res.status(400).json({message: "The friend request is already pending"});
        }

        const newFriendRequest = new FriendRequest({
            sender: myId,
            recipitant: recipitantId,
        });
        res.status(201).json({success: true, friendRequest: newFriendRequest});
    } catch (error) {
        console.log("Error in sendFrriendRequest controller", error);
        res.status(500).json({message: "Internal Sever Error"});
    }
}