import express from "express";
import path from "path";
import userAuth from "../middlewares/authMiddleware.js";

import {
  acceptRequest,
  changePassword,
  friendRequest,
  getFriendRequest,
  getUser,
  profileViews,
  requestPasswordReset,
  resetPassword,
  suggestedFriends,
  updateUser,
  verifyEmail,
} from "../controllers/userController.js";

const userRouter = express.Router();
const __dirname = path.resolve(path.dirname(""));

userRouter.get("/verify/:userId/:token", verifyEmail);

// PASSWORD RESET
userRouter.post("/request-passwordreset", requestPasswordReset);
userRouter.get("/reset-password-user/:userId/:token", resetPassword);
userRouter.post("/reset-password", changePassword);

// user routes
userRouter.post("/get-user/:id?", userAuth, getUser);
userRouter.put("/update-user", userAuth, updateUser);

// friend request
userRouter.post("/friend-request", userAuth, friendRequest);
userRouter.post("/get-friend-request", userAuth, getFriendRequest);

// accept / deny friend request
userRouter.post("/accept-request", userAuth, acceptRequest);

// view profile
userRouter.post("/profile-view", userAuth, profileViews);

//suggested friends
userRouter.post("/suggested-friends", userAuth, suggestedFriends);

userRouter.get("/verified", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/verifiedpage.html"));
});

userRouter.get("/resetpassword", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/verifiedpage.html"));
});

export default userRouter;
