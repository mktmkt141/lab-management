// const axios=require("axios");
// require("dotenv").config;

// const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL; // .env に保存

// const sendSlack=async (message)=>{
//     try{
//         await axios.post(SLACK_WEBHOOK_URL,{text:message});
//         console.log("Slack通知を送信しました");
//     }catch(error){
//         console.error("SLack通知の送信に失敗しました",error);
//     }
// };
// module.exports={sendSlack};