import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
});

const User = model("User", userSchema);
export default User;