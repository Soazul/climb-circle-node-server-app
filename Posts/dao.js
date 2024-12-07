import model from "./model.js";

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