import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

const schema = new mongoose.Schema(
    {
    username: {
            type: String,
            required: true,
            lowercase: true,
            index: true
          },
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
schema.methods.setPassword = function setPassword(password){
    this.passwordHash = bcrypt.hashSync(password, 10);
};

schema.methods.generateJWT = function generateJWT(){
      return  jwt.sign({
          email: this.email
      }, process.env.JWT_SECRET)
  };

schema.methods.toAuthJSON = function toAuthJSON(){
      return {
          email: this.email,
          token: this.generateJWT()
      }
  };
schema.plugin(uniqueValidator, { message: "This email is already take, try a different email"})

export default mongoose.model('User', schema);