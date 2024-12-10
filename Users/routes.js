import * as dao from "./dao.js";

export default function UserRoutes(app) {
    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };
    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };
    const findAllUsers = async (req, res) => {
        const { role, name } = req.query;
        if (role) {
            const users = await dao.findUsersByRole(role);
            res.json(users);
            return;
        }
        const users = await dao.findAllUsers();
        res.json(users);
    };
    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };
    const updateUser = async (req, res) => {
        const userId = req.params.userId;
        const userUpdates = req.body;
        await dao.updateUser(userId, userUpdates);
        const currentUser = req.session["currentUser"];
        if (currentUser && currentUser._id === userId) {
            req.session["currentUser"] = { ...currentUser, ...userUpdates };
        }
        res.json(currentUser);
    };
    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json(
                { message: "Username already in use" });
            return;
        }
        const currentUser = await dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };
    const signin = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        if (currentUser) {
            req.session["currentUser"] = currentUser;
            req.session.save()
            res.json(currentUser);
        } else {
            res.status(401).json({ message: "Unable to login. Try again later." });
        }
    };
    const signout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };
    const profile = (req, res) => {
        const currentUser = req.session["currentUser"];
        req.session.save()
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        res.json(currentUser);
    };
    const findUsersByPartialUsername = async (req, res) => {
        const { username } = req.query;
        const users = await dao.findUsersByPartialUsername(username);
        res.json(users);
        return;

        // const users = await dao.findAllUsers();
        // res.json(users);
    }
    const addFollowerToUser = async (req, res) => {
        const userId = req.params.userId;
        const followerId = req.session["currentUser"]?._id;

        if (!followerId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        try {
            await dao.addFollowerToUser(userId, followerId);
            res.sendStatus(200);
        } catch (error) {
            res.status(500).json({ message: "Error adding follower", error });
        }
    };

    const removeFollowerFromUser = async (req, res) => {
        const userId = req.params.userId;
        const followerId = req.session["currentUser"]?._id;

        if (!followerId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        try {
            await dao.removeFollowerFromUser(userId, followerId);
            res.sendStatus(200);
        } catch (error) {
            res.status(500).json({ message: "Error removing follower", error });
        }
    };

    const checkIfFollowing = async (req, res) => { 
        const userId = req.params.userId;
        const currentUserId = req.session["currentUser"]?._id;
    
        try {
            const isFollowing = await dao.isFollowingUser(userId, currentUserId);
            res.json({ isFollowing });
        } catch (error) {
            console.error("Error in checkIfFollowing:", error);
            res.status(500).json({ message: "Error checking follow status", error });
        }
    };

    const likePost = async (req, res) => {
        const postId = req.params.postId;
        const userId = req.params.userId;

        try {
            await dao.likePost(postId, userId);
            res.sendStatus(200);
        } catch (error) {
            res.status(500).json({ message: "Error liking post", error });
        }
    };

    const unlikePost = async (req, res) => {
        const postId = req.params.postId;
        const userId = req.params.userId;

        try {
            await dao.unlikePost(postId, userId);
            res.sendStatus(200);
        } catch (error) {
            res.status(500).json({ message: "Error liking post", error });
        }
    };

    const fetchCurrentUser = async (req, res) => {
        const currentUser = req.session["currentUser"];
        res.json(currentUser)
    };

    app.get('/api/users/current', fetchCurrentUser);
    app.post('/api/users', createUser);
    app.get('/api/users', findAllUsers);
    app.get('/api/users/search', findUsersByPartialUsername);
    app.get('/api/users/:userId', findUserById);
    app.put('/api/users/:userId', updateUser);
    app.delete('/api/users/:userId', deleteUser);
    app.post('/api/users/signup', signup);
    app.post('/api/users/signin', signin);
    app.post('/api/users/signout', signout);
    app.post('/api/users/profile', profile);
    app.post('/api/users/:userId/follow', addFollowerToUser);
    app.post('/api/users/:userId/unfollow', removeFollowerFromUser);
    app.get('/api/users/:userId/isFollowing', checkIfFollowing);
    app.post('/api/users/:userId/:postId/like', likePost);
    app.post('/api/users/:userId/:postId/unlike', unlikePost);

}