const User = require("../models/userModel")
const bcrypt = require("bcrypt")


//secure password
const securePassword = async (password)=>{
   try{
   const passwordHash = await bcrypt.hash(password,10)
   return passwordHash;

   }catch(error){
      console.log(error.message);
   }
}


//load register
const loadRegister = async (req,res)=>{
  try{
      res.render('registration')
  }catch(error){
       console.log(error.message);
  }
}


//insert user
const insertUser =  async (req,res)=>{
   try{
    const spassword = await securePassword(req.body.password)
     const user = new User({
       name :req.body.name,
       email :req.body.email,
       password :spassword,
       mobile : req.body.mobile,
       is_admin:0
     })

   const userData = await user.save();
   console.log(userData);
   if(userData){
    res.render('registration',{message:"Registration has been successfully"})
   }else{
    res.render('registration',{message:"your registration has been failed"})
   }
  } catch(error){
    console.log(error.message);
   }
}


// login user method started

const loginLoad = async (req,res)=>{
   try{
     res.render("login")

   }catch(error){
      console.log(error.message);
   }

}

// verify login
const verifyLogin = async (req,res)=>{
    try{
      const email = req.body.email
      const password =req.body.password
     const userData =  await  User.findOne({email:email})
      if(userData){
      const passwordMatch =  await bcrypt.compare(password, userData.password)
        if(passwordMatch){
            req.session.user_id = userData._id;
            return res.redirect('/home')
        }else{
          return res.render('login',{message:"password incorrect"})
        }
      }else{
       return res.render('login',{message:"email and password incorrect"})
      }

    }catch(error){
       console.log(error);

    }
}


//load home
const loadHome = async (req,res)=>{
  try{
    res.render('home')
  }
  catch(error){
      console.log(error.message);
  }
}


//user logout
const userlogout = async (req,res)=>{
  try{

     req.session.destroy();
     res.redirect('/')
     
  }catch(error){
   console.log(error.message);
  }
}

//export
module.exports = {
  loadRegister,
  insertUser,
  loginLoad,
  verifyLogin,
  loadHome,
  userlogout,
}

