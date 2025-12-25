const express=require('express');
const router=express.Router();
const authMiddleware=require('../middleware/auth.middleware');
const {me , getAllUser}=require('../controllers/user.controller');
router.get('/me', authMiddleware, me);
router.get('/users',authMiddleware, getAllUser);
module.exports=router;