import model from "./model.js";
import UserModel from "../Users/model.js";

export const createPost = (post) => {
    return model.create(post);
};
export const findAllPosts = () => model.find();
export const findPostById = (postId) => model.findById(postId);
export const updatePost = (postId, post) => model.updateOne({ _id: postId }, { $set: post });
export const deletePost = (postId) => model.deleteOne({ _id: postId });
export const findPostsByPartialTitle = (partialTitle) => {
    const regex = new RegExp(partialTitle, "i");
    return model.find({
        $or: [{ title: { $regex: regex } }],
    });
};
export const findPostsByUserId = async (userId) => {
    return await model.find({ user: userId });
};

export const likePost = async (postId, userId) => {
    await model.findByIdAndUpdate(
        postId, 
        { $addToSet: { likes: userId } },
        { new: true }
    )
}

export const unlikePost = async (postId, userId) => {
    await model.findByIdAndUpdate(
        postId, 
        { $pull: { likes: userId } },
        { new: true }
    )
}

export const findLikedPostsByUserId = async (userId) => {
    return await model.find({ likes: userId });
};

export const findPostsByUserIds = async (userIds) => {
    return await model.find({ user: { $in: userIds } }); 
};

export const findFollowingPosts = async (userId) => {
    const user = await UserModel.findById(userId).populate('following');
    const followingIds = user.following.map(followingUser => followingUser._id);
    const posts = await findPostsByUserIds(followingIds);
    return posts;
};

export const findExplorePosts = async (userId) => {
    const user = await UserModel.findById(userId).populate('following');
    const followingIds = user.following.map(followingUser => followingUser._id);
    const allPosts = await model.find();
    const explorePosts = allPosts.filter(post => 
        post.user.toString() !== userId
    );
    const filteredAgainPosts = explorePosts.filter(post => 
        !followingIds.map(id => id.toString()).includes(post.user.toString())
    );
    return filteredAgainPosts;
};
