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
        const user = req
    } catch (error) {
        console.log("Error in getMyFriends controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}