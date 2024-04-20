import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";



// creat user
// method:  POST
// path:    http://localhost:5000/api/users
const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new Error("Please Fill all the required info!");
    };

    const userExist = await User.findOne({ email });

    if (userExist) res.status(400).send("user already exsits");


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        createToken(res, newUser._id);

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        });

    } catch (error) {
        res.status(400);
        throw new Error("invalid registeration data");
    }

});





// login user
// method:  POST
// path:    http://localhost:5000/api/users/auth
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password);

        if (isPasswordValid) {
            createToken(res, existingUser._id);

            res.status(201).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
            });
            return;
        }

    }
});





// logout user
// method:  POST
// path:    http://localhost:5000/api/users/signout
const logoutCurrentUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "You Logged Out" });
});





// get all users
// method GET
// path: http://localhost:5000/api/users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});

    res.json(users);
})





// get user profile
// method GET
// path: http://localhost:5000/api/users
const getCurrentUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
        })
    } else {
        res.status(404);
        throw new Error("user you search not found.");
    }

});





// update user profile
// method PUT
// path: http://localhost:5000/api/users/profile
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        if (req.body.password) {

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            user.password = hashedPassword;
        };

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })

    } else {
        res.status(404);
        throw new Error("user you update not found.");
    }

});






// delete user (admin)
// method DELETE
// path: http://localhost:5000/api/users/:id
const deleteUserById = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id);

    if (user) {

        if (user.isAdmin) {
            res.status(400);
            throw new Error("Cannot delete admin account");
        }

        await User.deleteOne({ _id: user._id });
        res.json({ message: "user removed successfully" });


    } else {
        res.status(404);
        throw new Error("user you delete not found (admin)");
    }

});





// get user by id (admin)
// method GET
// path: http://localhost:5000/api/users/:id
const getUserById = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)
        .select("-password");

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("user you search not found (admin)")
    }

});





// update user by id (admin)
// method PUT
// path: http://localhost:5000/api/users/:id
const updateUserById = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404);
        throw new Error("user not found for update (admin)");
    }

});



export {
    createUser,
    loginUser,
    logoutCurrentUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
};