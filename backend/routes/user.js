const express= require("express");

const router= express.Router();

module.exports=router;

const signupBody = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})

router.post("/signup", async (req, res)=> {
    const body = req.body;
    const {success} = signupBody.safeParse(body);

    if(!success){
        return res.status(411).json({message: "Email already taken / Incorrect inputs"});
    }
    const existingUser = await User.findOne({username: body.username});
    if(existingUser){
       return  res.status(411).json({message: "Email already taken / Incorrect inputs"});
    }


    const user = await User.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    });

    /// ----- Create new account ------

    const token = jwt.sign({userId: user._id}, JWT_SECRET);
    
    res.status(200).json({message: "User created successfully", token: token});
});