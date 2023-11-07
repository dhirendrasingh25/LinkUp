import Users from "../models/userModel.js";
import { hashString, createJWT, compareString } from "../utils/index.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

export const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  // console.log(req.body);
  if (!(firstName || lastName || email || password)) {
    next("Provide Required Fields!");
    return;
  }
  try {
    const userExist = await Users.findOne({ email });

    if (userExist) {
      next("Email Address already exists");
      return;
    }
    // console.log(password);
    const hashedPassword = await hashString(password);
    // console.log(hashedPassword);

    const user = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    //send email verification to user
    // console.log("reached here");
    sendVerificationEmail(user, res);
    // console.log("mail aaya ky ?");
  } catch (error) {}
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //validation
    if (!email || !password) {
      next("Please Provide User Credentials");
      return;
    }

    // find user by email
    const user = await Users.findOne({ email }).select("+password").populate({
      path: "friends",
      select: "firstName lastName location profileUrl -password",
    });

    if (!user) {
      next("Invalid email or password");
      return;
    }

    if (!user?.verified) {
      next(
        "User email is not verified. Check your email account and verify your email"
      );
      return;
    }

    // compare password
    const isMatch = await compareString(password, user?.password);

    if (!isMatch) {
      next("Invalid email or password");
      return;
    }

    user.password = undefined; // to avoid send password to front end

    const token = createJWT(user?._id);

    res.status(201).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
