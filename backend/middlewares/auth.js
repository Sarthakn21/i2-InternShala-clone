import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { ApiError } from '../utils/ApiError.js';
import catchAsyncError from './catchAsyncError.js';
export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    console.log("in auth middleware")
    const { accessToken } = req.cookies;

    if (!accessToken) {
        return next(new ApiError(401, "Please LogIn to access the requested resource"));
    }

    const decodedData = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
    req.user = await User.findById(decodedData._id);
    next();
});

export const authorizeRecruiter = (req, res, next) => {
    console.log("in authorizeRecruiter ");
    if (req.user.role !== 'recruiter') {
        return res.status(403).json({ success: false, message: "You are not authorized to perform this action" });
    }
    console.log(req.user.role);
    next();
};