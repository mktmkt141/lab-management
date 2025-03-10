const User = require("../models/user.js");
const {sendSlack}=require("../handlers/slack.js");
const JWT= require("jsonwebtoken");

exports.register=async (req,res)=>{
    
    try {
        //ユーザーの新規作成
        const user=await User.create(req.body);
        const token=JWT.sign(
            {id:user._id,role:user.role},
            process.env.TOKEN_SECRET_KEY,
            {expiresIn:"24h"}
        );
        return res.status(200).json({
            message:"新規登録に成功しました",
            token,
            user});

    }catch(err){
        console.error(err);
        return res.status(500).json({
            error:"サーバーエラーが起きました",
            details:err.message
        });
            

    }
};

//スキャン用API
exports.scan= async (req,res)=>{
    const {idm} =req.body;
    if(!idm){
        return res.status(400).json({
            error:"idmが無効です"
        });
    }
    try{
        const user= await User.findOne({idm});
        if(!user){
            return res.status(404).json({
                error:"このICカードは登録されていません"
            });
        }
        const newStatus=user.status==="inside"?"outside":"inside";
        user.status=newStatus;

        await user.save();
        //JWTトークンの発行
        const token=JWT.sign(
            {id:user._id,role:user._role},
            process.env.TOKEN_SECRET_KEY,
            {expiresIn:"24h"}
        );
        // const mention=user.slack_id?`<@${user.slack_id}>`:user.username;
        // const message=`*${mention}*さんが*${newStatus==="inside"?"入室":"退出"}*しました！`;
        // sendSlack(message);

        res.status(200).json({
            message:`ユーザー${user.username}のステータスを更新しました`,
            token,
            user:{
                idm:user.idm,
                status:user.status,
            },
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            error:"サーバエラーが発生しました"
        });
        
    }
};

exports.login=async(req,res)=>{
    const {email,idm}=req.body;

    try{
        const user=await User.findOne({email,idm});
        if(!user){
            return res.status(401).json({
                errors:[
                    {
                        param:"email",
                        msg:"メールアドレスが無効です",
                    },
                    {
                        param:"idm",
                        msg:"キー情報が無効です",
                    },
                ],    
                });
        }
        const token=JWT.sign(
            {id:user._id},
            process.env.TOKEN_SECRET_KEY,
            {expiresIn:"24h"}
        );
        res.status(200).json({message:"ログイン成功",token,user});
    }catch(err){
        res.status(500).json({error:"サーバーエラーが発生しました"});
    }
};