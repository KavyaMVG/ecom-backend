import mongoose from "mongoose";
import { ADMIN, USER } from "../constants.js";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: [ADMIN, USER],
      default: USER,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        delete ret.__v;
      },
    },
  },
);

export default mongoose.model("users", userSchema);
