import dotenv from "dotenv"; // Import dotenv
dotenv.config();
import express from "express";
const app = express();
import connectToDatabase from "./config/database.js";
import userRouter from "./Routes/userRoutes.js";
import opportunityRouter from "./Routes/opportunityRoutes.js";
import applicationRouter from "./Routes/applicationRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "./middlewares/error.js";

const corsOptions = {
    origin: 'https://i2-internshala-clone-frontend.onrender.com',
    // origin: true,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
connectToDatabase();

app.use("/users", userRouter);
app.use("/opportunity", opportunityRouter);
app.use("/application", applicationRouter);

app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
