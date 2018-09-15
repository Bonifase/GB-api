import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

  schema.methods.isValidPassword = function isValidPassword(password){
      return bcrypt.compareSync(password, this.passwordHash);
  };

  schema.methods.generateJWT = function generateJWT(){
      return  jwt.sign({
          email: this.email
      }, 'secretkey')
  };

  schema.methods.toAuthJSON = function toAuthJSON(){
      return {
          email: this.email,
          token: this.generateJWT()
      }
  };

export default mongoose.model('User', schema);