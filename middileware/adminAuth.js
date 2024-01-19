// login
const islogin = async (req,res,next)=>{
  try{
    if(req.session.user_id){
     next()
    }
    else{
     res.redirect('/admin')
 
    }
  }catch(error){
      console.log(error.message);
  }
}


//verify or logout
const verify = async (req, res, next) => {
  try {
    if(!req.session.user_id) {
      next();
    } else {
       res.redirect('/admin'); 
    }
  } catch (error) {
    console.log(error.message);
  }
}
const ok = async (req,res,next)=>{
  try {
    if(req.session.user_id) {
      res.redirect('/admin/home'); 
     
    } else{
      next()
    }
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  islogin,
  verify,
  ok
  
}