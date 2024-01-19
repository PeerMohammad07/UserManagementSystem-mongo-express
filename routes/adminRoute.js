const express = require("express")
const admin_route = express()


const session = require("express-session")
const config =  require("../config/config")
admin_route.use(session({secret:config.sessionsecret,resave:false,
  saveUninitialized:false}))


const auth = require("../middileware/adminAuth")

admin_route.use(express.json())
admin_route.use(express.urlencoded({extended:true}))

admin_route.set('view engine','ejs')
admin_route.set('views','./views/admin')


const adminController = require("../controllers/adminController")
admin_route.get('/',auth.ok,auth.verify, adminController.loadLogin)


admin_route.post('/',adminController.verifyLogin)
admin_route.get('/home',auth.islogin,adminController.loadDashboard)
admin_route.get('/logout',auth.islogin,adminController.logout)


admin_route.get('/new-user',auth.islogin,adminController.newUserLoad)
admin_route.post('/new-user',adminController.addUser)

admin_route.get('/edit-user',auth.islogin,adminController.editUserLoad)
admin_route.post('/edit-user',adminController.updateUsers)


admin_route.get('/delete-user',adminController.deleteUser)


admin_route.get("*",(req,res)=>{
  res.redirect("/admin")
})
module.exports = admin_route;