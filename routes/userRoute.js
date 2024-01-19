const express = require("express")
const user_route = express()

const nocache = require("nocache")
user_route.use(nocache())

const config = require("../config/config")

const session = require("express-session")
user_route.use(session({secret:config.sessionsecret,resave:false,
  saveUninitialized:false}))

const userController = require("../controllers/userController")

user_route.use(express.json())
user_route.use(express.urlencoded({extended:true}))

const auth = require("../middileware/auth")
const autho = require("../middileware/adminAuth")

user_route.set('view engine','ejs')
user_route.set('views','./views/users')


user_route.get('/register',auth.verify,userController.loadRegister)
user_route.post('/register',userController.insertUser)


user_route.get("/",auth.verify, userController.loginLoad)
user_route.get("/login",auth.verify,userController.loginLoad)
user_route.post('/login', auth.adminVerify , userController.verifyLogin)


user_route.get('/home', auth.islogin,userController.loadHome)

user_route.get('/logout', auth.islogin, userController.userlogout)

module.exports = user_route;
