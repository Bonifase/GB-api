import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

  schema.method.isValidPassword = function isValidPassword(password){
      return bcrypt.compareSync(password, this.passwordHash);
  }

export default mongoose.model('User', schema);