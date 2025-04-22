import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

export const hashString = async (useValue) => {
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(useValue, salt);
  return hashedpassword;
};

export const compareString = async (plainPassword, hashedPassword) => {
  const test = async () => {
    const plain = "12345678";
    const hash = "$2a$10$W6Gf0m4BJHpjCv4pO0Y4ReRtLKQMC258FeeBo6F9sbI7fXGrNc3Ae";

    const match = await bcrypt.compare(plain, hash);
    console.log("Match:", match); // should be true
  };

  test();
  console.log(plainPassword + "   " + hashedPassword);
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};

export function createJWT(id) {
  return JWT.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
}
