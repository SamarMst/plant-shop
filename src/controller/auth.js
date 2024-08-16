const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt')
const register = async(req,res) =>{
    const {email ,password,...rest}= req.body
    
    try {
       if(!email|| !password) {
        res.status(400).json({message:"please fill the empty fields"})
       }

       const accountExist = await prisma.user.findFirst({
        where:{
            email
        }
       })
       if(accountExist){
        res.status(409).json({message:"account exist"})
       }
       
       const cryptedPassword = await bcrypt.hash(password,10)
       const acountCreated = await prisma.user.create({
            data:{
                email,
                password:cryptedPassword,
                ...rest
                
            }
        })
        
        res.status(201).json({message:"account created successfully" , acountCreated})
    } catch (error) {
        res.status(500).json({message:error})
    }
}

module.exports = {register}