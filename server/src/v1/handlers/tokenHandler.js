const JWT = require("jsonwebtoken");
const User = require("../models/user");
;

//クライアントから渡されたJWTが正常化を検証する
const tokenDecode=(req)=>{
    const bearerHeader=req.headers["authorization"];
    // console.log("リクエストヘッダーのauthorization:",bearerHeader);
    if(bearerHeader){
        const bearer=bearerHeader.split(" ")[1];
        try{
            const decodedToken=JWT.verify(bearer,process.env.TOKEN_SECRET_KEY);
            return decodedToken;

        }catch{
            return false;

        }
    }else{
        return false;
    }

};



//JWT認証を検証するためのミドルウェア

exports.verifyToken=async(req,res,next)=>{
    const tokenDecoded=tokenDecode(req);
    if(tokenDecoded){
        //そのJWTと一致するユーザを探してくる
        const user=await User.findById(tokenDecoded.id);
        if(!user){
            return res.status(401).json("権限がありません(ユーザーが存在しません)");
        }
        req.user=user;
        next();
    }else{
        return res.status(401).json("権限がありません");
    }


};