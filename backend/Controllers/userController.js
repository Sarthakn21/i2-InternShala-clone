import User from "../models/userModel.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import { ApiError } from "../utils/ApiError.js";

const registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    // Create user
    const user = await User.create({
        name,
        email,
        password,
        role,
    });

    // Generate JWT token
    const accessToken = await user.getJWTToken();

    // Exclude password from the response
    const userWithoutPassword = await User.findById(user._id).select('-password');

    return res
        .status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({ success: true, message: "User registered successfully", user: userWithoutPassword });
});

const loginUser = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body;
    console.log("i am in backend ", email ,password);
    if (!email || !password) {
        return next(new ApiError(400, "Please Enter Email & Password"));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ApiError(401, "Invalid email or password"));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ApiError(401, "Invalid email or password"));
    }
    const accessToken = await user.getJWTToken();
    const userWithoutPassword = await User.findById(user._id).select('-password');
    return res
        .status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({ success: true, message: "user Loggedin successfully", user: userWithoutPassword });
});
const currUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id).select('-password');
    return res.status(200).json({ success: true, user });
})
const logoutUser = catchAsyncError(async (req, res, next) => {
    return res
        .status(200)
        .clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
        })
        .json({ success: true, message: "user Logged out successfully" });
});
export { registerUser, loginUser, currUser, logoutUser }