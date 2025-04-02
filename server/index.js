const express = require("express");
const mongoose = require("mongoose");
const app = express();
const JWT=require("jsonwebtoken");


const PORT = 5000;
require("dotenv").config();
const cors=require("cors");
app.use(cors({
    origin:"http://localhost:3000",
})
);
app.use(express.json());
app.use("/api/v1",require("./src/v1/routes"));

// mongoose.connect(process.env.MONGODB_URL,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
// })
// .then(()=>console.log("DBと接続中"))
// .catch(error=>console.error("mongodb接続エラー",error));


//DB接続
try{
    
    mongoose.connect(process.env.MONGO_URI);
    console.log(process.env.MONGO_URI);

    console.log("DBと接続中");
}catch(error){
    console.log(error);
}

app.listen(PORT, ()=>{
    console.log("ローカルサーバー起動中");
});