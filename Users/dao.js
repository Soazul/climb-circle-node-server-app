import model from "./model.js";

export const createUser = (user) => {
    return model.create(user);
};
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) => model.findOne({ username: username });
export const findUserByCredentials = (username, password) => model.findOne({ username, password });
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId, user) => model.deleteOne({ _id: userId });
export const findUsersByRole = (role) => model.find({ role: role });
export const findUsersByPartialUsername = (partialUsername) => {
    const regex = new RegExp(partialUsername, "i"); // 'i' makes it case-insensitive
    return model.find({ username: { $regex: regex } });
};
export const addFollowerToUser = async (userId, followerId) => {
    await model.findByIdAndUpdate(
        userId,
        { $addToSet: { followers: followerId } },
        { new: true }
    )
    await model.findByIdAndUpdate(
        followerId,
        { $addToSet: { following: userId } },
        { new: true }
    )
}
export const removeFollowerFromUser = async (userId, followerId) => {
    await model.findByIdAndUpdate(
        userId,
        { $pull: { followers: followerId } }, // Remove the follower
        { new: true }
    )
    await model.findByIdAndUpdate(
        userId,
        { $pull: { following: userId } }, // Remove the follower
        { new: true }
    )
}
export const isFollowingUser = async (userId, currentUserId) => {
    const user = await model.findById(userId);
    if (!user) return false;
    return user.followers.includes(currentUserId);
};

export const likePost = async (postId, userId) => {
    const user = await model.findById(userId);
    if (!user) return false;
    await model.findByIdAndUpdate(
        userId, 
        { $addToSet: { likedPosts: postId } },
        { new: true }
    )
}

export const unlikePost = async (postId, userId) => {
    const user = await model.findById(userId);
    if (!user) return false;
    await model.findByIdAndUpdate(
        userId, 
        { $pull: { likedPosts: postId } },
        { new: true }
    )
}

export const findGymByPlaceId = async (placeId) => await model.findOne({ placeId: placeId });

export const favoriteGym = async (gymUserId, userId) => {
    const user = await model.findById(gymUserId);
    if (!user) return false;
    await model.findByIdAndUpdate(
        userId,
        { $addToSet: { favoriteGyms: gymUserId } },
        { new: true }
    )
}

export const unfavoriteGym = async (gymUserId, userId) => {
    const user = await model.findById(gymUserId);
    if (!user) return false;
    await model.findByIdAndUpdate(
        userId,
        { $pull: { favoriteGyms: gymUserId } },
        { new: true }
    )
}

export const registerLocation = async (placeId, gymUserId) => {
    const user = await model.findById(gymUserId);
    if (!user) return false;
    await model.findByIdAndUpdate(
        gymUserId,
        { placeId: placeId },
        { new: true }
    )
}

export const unregisterLocation = async (placeId, gymUserId) => {
    const user = await model.findById(gymUserId);
    if (!user) return false;
    await model.findByIdAndUpdate(
        gymUserId,
        { placeId: null },
        { new: true }
    )
}
