import express from 'express';
import User from '../models/User';
import parseErrors from '../utils/parseErrors';
import { sendConfirmationEmail } from '../mailer';
import authenticate from "../middlewares/authenticate";

const router = express.Router();

router.post('/', (req, res) => {
    const { username, email, password } = req.body.user;
    const user = new User({username, email});
    user.setPassword(password);
    user.setConfirmationToken();
    user.save()
      .then(userRecord => {
        sendConfirmationEmail(userRecord);  
        res.json({ user: userRecord.toAuthJSON() })})
      .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));   
});

router.get('/current_user', authenticate,  (req, res) => {
  res.json({
    user: {
      username: req.currentUser.username,
      email: req.currentUser.email,
      confirmed: req.currentUser.confirmed
    }});
});

export default router;   