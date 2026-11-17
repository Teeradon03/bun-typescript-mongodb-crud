import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { User } from "../models/user.model";
import { AppError } from "../utils/AppError";
export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const userALreadyExists = await User.findOne({ email: data.email });
  if (userALreadyExists) {
    throw new AppError(409, "Email already exists");
  }
  const user = await User.create(data);
  return user;
};

export const login = async (data: { email: string; password: string }) => {
  //   console.log("data", data);
  //   console.log("data", data.email);

  const user = await User.findOne({
    email: data.email,
  }).select("+password");

  //   console.log("user", user);

  // query ปกติจะไม่ดึง field password มา ต้องบอกให้ดึงด้วย select("+password")
  //   console.log("password", data.password);
  if (!user || !(await user.comparePassword(data.password))) {
    throw new AppError(401, "Invalid email or password");
  }

  const token = jwt.sign(
    { sub: user._id.toString(), role: user.role },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] },
  );
  return token;
};

export const getMe = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "User not found");
  }
  return user;
};
