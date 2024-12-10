import * as dao from "./dao.js";
import * as userDao from "../Users/dao.js";

export default function PostsRoutes(app) {
    const createPost = async (req, res) => {
        const post = await dao.createPost(req.body);
        res.json(post);
    };
    app.post("/api/posts", createPost);

    const updatePost = async (req, res) => {
        const { postId } = req.params;
        const postUpdates = req.body;
        const status = await dao.updatePost(postId, postUpdates);
        res.json(status);
    };
    app.put("/api/posts/:postId", updatePost);

    const deletePost = async (req, res) => {
        const status = await dao.deletePost(req.params.postId);
        res.json(status);
    };
    app.delete("/api/posts/:postId", deletePost);

    const findAllPosts = async (req, res) => {
        const {title} = req.query;
        if (title) {
            const posts = await dao.findPostsByPartialTitle(title);
            res.json(posts);
            return;
        }
        const posts = await dao.findAllPosts();
        res.json(posts);
    };
    app.get("/api/posts", findAllPosts);

    const findPostById = async (req, res) => {
        const post = await dao.findPostById(req.params.postId);
        res.json(post);
    };
    app.get("/api/posts/:postId", findPostById);
    

    const findPostsByUserId = async (req, res) => {
        const posts = await dao.findPostsByUserId(req.params.userId);
        res.json(posts);
    };
    app.get("/api/posts/:userId/posts", findPostsByUserId);

    const likePost = async (req, res) => {
        const postId = req.params.postId;
        const userId = req.params.userId;

        try {
            await dao.likePost(postId, userId);
            res.sendStatus(200);
        } catch (error) {
            res.status(500).json({ message: "Error adding like to post", error });
        }
    }
    app.post("/api/posts/:postId/:userId/like", likePost);

    const unlikePost = async (req, res) => {
        const postId = req.params.postId;
        const userId = req.params.userId;

        try {
            await dao.unlikePost(postId, userId);
            res.sendStatus(200);
        } catch (error) {
            res.status(500).json({ message: "Error removing like from post", error });
        }
    }
    app.post("/api/posts/:postId/:userId/unlike", unlikePost);

    const findLikedPostsByUserId = async (req, res) => {
        const userId = req.params.userId;
        const posts = await dao.findLikedPostsByUserId(userId);
        res.json(posts);
    }
    app.get("/api/posts/:userId/posts/liked", findLikedPostsByUserId);

    const findFollowingPosts = async (req, res) => {
        const userId = req.params.userId;
        const posts = await dao.findFollowingPosts(userId);
        res.json(posts);
    }
    app.get("/api/posts/:userId/following/posts", findFollowingPosts);

    const findExplorePosts = async (req, res) => {
        const userId = req.params.userId;
        const posts = await dao.findExplorePosts(userId);
        res.json(posts);
    }
    app.get("/api/posts/:userId/explore/posts", findExplorePosts);
};