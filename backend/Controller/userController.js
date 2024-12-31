const users=require('../Model/userSchema')
const jwt=require('jsonwebtoken')

exports.register=async(req,res)=>{
    const {email,username,password}=req.body
    console.log(email,username,password)

    try{
        const existingUser=await users.findOne({email})
        if(existingUser){
         res.status(406).json('user,already exists please login')
        }else{
            const newUser=new users({
                username,
                email,
                password,
                github:"",
                linkedin:"",
                profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    }catch(err){
        console.log(err)
        res.status(401).json(err)
    }

}

exports.login=async(req,res)=>{
    console.log('inside login')
    const{email,password}=req.body

    try{
        const existingUser=await users.findOne({email,password})
        if(existingUser){
            // token generate with jwt
            const token=jwt.sign({userId:existingUser._id},process.env.jwt_secret)
            res.status(200).json({existingUser,token})
        }else{
            res.status(406).json('invalid email/password')
        }

    }catch(err){
        console.log(err)
        res.status(401).json(err)
    }
}