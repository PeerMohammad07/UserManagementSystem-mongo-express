// is login
const islogin = async (req,res,next)=>{
  try{
    if(req.session.user_id){
     next()
    }
    else{
     res.redirect('/')
 
    }
  }catch(error){
      console.log(error.message);
  }
}

//  verify
const verify = (req, res, next) => {
  try {
    if(!req.session.user_id) {
      next();
    } else {
      res.redirect('/home');
    }
  } catch (error) {
    console.log(error.message);
  }
}


// admin verify
const adminVerify = async (req,res,next)=>{
   try{
     if(!req.session.user_id){
      next()
     }else{
      res.redirect("/admin/home")
     }
   }catch(error){
     
   }
}


module.exports = {
  islogin,
  // islogout,
  verify,
  adminVerify
  

}