import express from 'express';
import { followUser, unfollowUser } from '../controllers/followController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/follow/:userId', requireSignIn, followUser);
router.post('/unfollow/:userId', requireSignIn, unfollowUser);

export default router;
