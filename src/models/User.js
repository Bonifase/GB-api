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

schema.methods.setConfirmationToken = function setConfirmationToken(){
    this.confirmationToken = this.generateJWT();
};

schema.methods.generateConfirmationUrl = function generateConfirmationUrl(){
    return `https://web-game-board-api.herokuapp.com/confirmation/${this.confirmationToken}`;
};

schema.methods.generateResetPasswordLink = function generateResetPasswordLink(){
    return `https://web-game-board-api.herokuapp.com/reset-password/${this.generateRPT()}`;
};

schema.methods.generateJWT = function generateJWT(){
      return  jwt.sign({
          email: this.email,
          username: this.username,
          confirmed: this.confirmed
      }, process.env.JWT_SECRET)
  };

schema.methods.generateRPT= function generateRPT(){
    return  jwt.sign({
        _id: this._id
    }, process.env.JWT_SECRET,
     { expiresIn: "1s"});
};

schema.methods.toAuthJSON = function toAuthJSON(){
      return {
          email: this.email,
          confirmed: this.confirmed,
          token: this.generateJWT()
      }
  };
schema.plugin(uniqueValidator, { message: "This email is already taken, try a different email"})

export default mongoose.model('User', schema);