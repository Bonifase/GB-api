import express from 'express';
import User from '../models/User';
import parseErrors from '../utils/parseErrors';

const router = express.Router();

router.post('/', (req, res) => {
    const { username, email, password } = req.body.user;
    const user = new User({username, email});
    user.setPassword(password);
    user.save()
      .then(userRecord => res.json({ user: userRecord.toAuthJSON() }))
      .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));   
});

export default router;   