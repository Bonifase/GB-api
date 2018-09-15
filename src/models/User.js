import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        lowercase: true,
        index: true,
        unique: true
      },
      passwordHash: { type: String, required: true },
      confirmed: { type: Boolean, default: false },
      confirmationToken: { type: String, default: "" }
    },
    { timestamps: true }
  );

export default mongoose.model('User', schema);