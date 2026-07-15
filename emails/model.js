import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true
  },
  hero: {
    type: Boolean,
    default: false
  },
  talk: {
    type: Boolean,
    default: false
  },
  contact: {
    type: Boolean,
    default: false
  },
  click: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

export default mongoose.model("users", userSchema)
