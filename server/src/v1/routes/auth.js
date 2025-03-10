const router =require("express").Router();
const { body, validationResult }=require("express-validator");
const User = require("../models/user.js");
require("dotenv").config();
const validation=require("../handlers/validation");
const userController=require("../controllers/user");
const tokenHandler=require("../handlers/tokenHandler.js");



//ユーザー新規登録API
router.post("/register",
  
    body("username").notEmpty().withMessage("ユーザー名は必須です"),
    body("idm")
      .notEmpty().withMessage("ICカード識別番号は必須です"),
    //   isLength({min:,max:}).withMessage(""),
    body("slack_id")
      .notEmpty().withMessage("Slack IDは必須です"),
      
    body("email")
      .notEmpty().withMessage("メールアドレスは必須です")
      .isEmail().withMessage("正しいメールアドレスを入力してください"),
    body("role")
      .isIn(["admin","user"]).withMessage("roleは 'admin'または 'user'のみ指定できます"),
  
    body("idm").custom((value)=>{
        return User.findOne({idm: value}).then((user)=>{
            if(user){
                return Promise.reject("このユーザーはすでに存在します");
            }
        });
    }),
    body("email").custom((value)=>{
      return User.findOne({email: value}).then((user)=>{
          if(user){
              return Promise.reject("このメールアドレスはすでに存在します");
          }
      });
    }),
    body("slack_id").custom((value)=>{
      return User.findOne({slack_id: value}).then((user)=>{
          if(user){
              return Promise.reject("このslack_idはすでに存在します");
          }
      });
    }),

    validation.validate,
    userController.register,
    );

    //ICカードをかざした際のAPI
    router.post(
      "/scan",
      body("idm").notEmpty().withMessage("IDmが必要です"),
      validation.validate,
      userController.scan
    );

    router.post("/login",
      body("email").notEmpty().withMessage("メールアドレスは必須です"),
      body("idm").notEmpty().withMessage("識別番号は必須です"),
    validation.validate,
    userController.login
  );

    //JWT認証API
    router.post("/verify-token",tokenHandler.verifyToken,(req,res)=>{
      return res.status(200).json({user:req.user});
    });

    //ユーザー一覧を取得するためのエンドポイント
    router.get("/users",async(req,res)=>{
      try{
        const users=await User.find();//mongodbからユーザーの取得
        console.log("取得したユーザー:",users);
        res.json(users);
      }catch(error){
        console.error("ユーザー取得エラー",error);
        res.status(500).json({message:"サーバーエラー"});
      }
    });



module.exports=router;