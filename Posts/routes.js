import * as dao from "./dao.js"

export default function PostsRoutes(app) {
    const createPost = async (req, res) => {
        const {cid} = req.params;
        const post = {
            ...req.body,
            course: cid,
          };
        const newPost = await dao.createPost(post);
        res.json(newPost);
    };
    app.post("/api/posts", createPost);

    const updatePost = async (req, res) => {
        const postId = req.params.postId;
        const postUpdates = req.body;
        await dao.updateUser(postId, postUpdates);
        const currentPost =  req.session["currentPost"];
        if (currentPost && currentPost._id === postId) {
          req.session["currentPost"] = { ...currentPost, ...postUpdates };
        }
        res.json(currentPost);
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
    app.get("/api/users/:userId/posts", findPostsByUserId);
};