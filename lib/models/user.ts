import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    // Automatically adds createdAt and updatedAt fields to the schema.
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
