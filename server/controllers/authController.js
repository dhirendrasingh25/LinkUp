import Users from "../models/userModel";
import { hashString } from "../utils";

export const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

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
    const hashedPassword = await hashString(password);

    const user = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    //send email verification to user
    // sendVerificationEmail(user, res);
  } catch (error) {}
};
