const User=require('../models/users.model')
const me= async (req,res)=>{
    try {
        const userId=req.user.id;
        const user= await User.findById(userId).select(["name","avatarUrl"])
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({user});
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
}
const getAllUser= async (req,res)=>{
    try {
        const currentUserId=req.user.id;
        const users= await User.find({_id:{$ne:currentUserId}}).select(["email","name","avatarUrl","_id"]).sort({createdAt:-1});
        if(!users){
            return res.status(404).json({message:"No users found"});
        }
        const totalUsers=users.length;
        return res.status(200).json({totalUsers,users});
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
}
module.exports={me,getAllUser}