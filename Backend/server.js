const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/dbConnect");
const userRoutes = require("./route/users/usersRoute");
const postRoute = require("./route/posts/postRoute");
const commentRoutes = require("./route/comments/commentRoute");
const emailMsgRoute = require("./route/emailMsg/emailMsgRoute");
const categoryRoute = require("./route/category/categoryRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");

const app = express();
//DB
dbConnect();

//Middleware
app.use(express.json());

//Users route
app.use("/api/users", userRoutes);
//Post route
app.use("/api/posts", postRoute);
//Comment route
app.use("/api/comments", commentRoutes);
//message route
app.use("/api/email", emailMsgRoute);
//category route
app.use("/api/category", categoryRoute);
//err handler
app.use(notFound);
app.use(errorHandler);

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running ${PORT}`));

//
