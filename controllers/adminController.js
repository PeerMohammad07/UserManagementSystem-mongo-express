const User = require("../models/userModel")
const bcrypt = require("bcrypt")


//secure password
const securePass=async(passoword)=>{
   try{
           const secuerep =bcrypt.hash(passoword,10);
           return secuerep;
   }catch(error){
       console.log(error.message)
   }
}


//load login
const loadLogin = async (req,res,next)=>{
   try{
         res.render("login")
   }catch(error){
      console.log(error.message)
   }
}

//verify login
const verifyLogin = async (req,res)=>{
   try{
     const email =req.body.email;
     const password = req.body.password;

    const userData = await User.findOne({email:email})
       if(userData){
          const passwordMatch =  await bcrypt.compare(password,userData.password)
          if(passwordMatch){
            if(userData.is_admin === 0){
              res.render('login',{message:"Email and password is incorrect"});
            }else{
                req.session.user_id = userData._id;
               res.redirect('/admin/home')
            }

          }else{
            res.render('login',{message:"password is incorrect"});
          }
       }else{
        res.render('login',{message:"Email and password is incorrect"});
       }
   }catch(error){
    console.log(error.message);
   }
}


//dash board
const loadDashboard = async (req,res)=>{
   try{ 
      const userData= await  User.find({  is_admin:0 })
     res.render('home',{users:userData})
 }
 catch(error){
     console.log(error.message)
 }
}


//logout
const logout = async (req,res)=>{
   try{
    req.session.destroy()
    res.redirect('/admin')

   }catch(error){
       console.log(error.message);
   }

}



//new user load
const newUserLoad = async (req,res)=>{
   try{
      res.render("new-user")
        
   }catch(error){
        console.log(error.message);
   }

}


// add New  user
const addUser= async(req,res)=>{
   try{
       const spassword=await securePass(req.body.password);
       const user=new User({
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
        password:spassword,
        is_admin:0
        
   
        })
        
         const userData =await user.save();
         if (userData) {
           
            res.render("new-user", { message: "success" });
          } else {
            res.render("new-user", { message: "Something went wrong. Try again" });
          }
        }
   catch(error){
    console.log(error.message)
   }
   }


//edit User
   const editUserLoad = async (req,res)=>{
      try{
         const id=req.query.id;
         const userData=await User.findById({_id:id});
         if(userData){
             res.render('edit-user',{user:userData})
         }
         else{
          res.redirect('/admin/home')
         }
       }catch(error){
          console.log(error.message);
       }
   }

   //update user
   const updateUsers = async (req,res)=>{
      try{
         const userData=    await User.findByIdAndUpdate({_id:req.body.id},{$set:{name:req.body.name,email:req.body.email,mobile:req.body.mobile}})
         res.redirect('/admin/home');
      }catch(error){
         console.log(error.message);
      }
   }

//delete user
const deleteUser = async (req,res)=>{
    try{
      const id=req.query.id;
      await User.deleteOne({_id:id});
      res.redirect('/admin/home')

    }catch(error){
         console.log(error.message);
    }
}


//export
module.exports = {
  loadLogin,
  verifyLogin,
  loadDashboard,
  logout,
  newUserLoad,
  addUser,
  editUserLoad,
  updateUsers,
  deleteUser
}