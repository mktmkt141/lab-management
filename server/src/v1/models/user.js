const mongoose =require("mongoose");

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true
    },//ユーザー名
    idm:{
        type: String,
        required: true,
        unique: true
    },//icカードの識別番号
    slack_id:{
        type: String,
        required: true,
        unique: true
    },//slackのユーザーid
    status:{
        type: String,
        enum:["inside","outside"],
        default:"outside"
    },//入室、退出を記録
    // timestamp:{
    //     type:Date,
    //     default:Date.now
    // },//最終時刻の更新
    email:{
        type: String,
        required: true,
        unique: true
    },//管理者のメールアドレス
    role:{
        type: String,
        enum: ["admin","user"],
        default:"user"
    },//管理者か一般ユーザーか

});

const User = mongoose.model("User",userSchema);
module.exports=User;