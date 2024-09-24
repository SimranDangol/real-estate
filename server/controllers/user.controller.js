import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const updateUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        username,
        email,
        password: hashedPassword,
      },
    },
    { new: true }
  ).select("-password");
  res
    .status(200)
    .json(new ApiResponse(200, user, "User Profile Updated Successfully"));
});
