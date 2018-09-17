import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post('/', (req, res) => {
    const { username, email, password } = req.body.user;
    const user = new User({username, email});
    user.setPassword(password);
    user.save()   
});

export default router;   