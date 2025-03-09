import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { LoadingButton } from "@mui/lab";
import {Link,useNavigate} from "react-router-dom";
import authApi from '../api/authApi';

const Register = () => {
  const navigate=useNavigate();


  const [usernameErrText,setUsernameErrText]=useState("");
  const [mailadressErrText,setmailadressErrText]=useState("");
  const [slackidErrText,setslackidErrText]=useState("");
  const [idmErrText,setidmErrText]=useState("");
  const [roleErrText,setroleErrText]=useState("");
  const [loading,setLoading]=useState(false);

  const handleSubmit=async (e)=>{
    
    //入力欄の文字列を取得
    e.preventDefault();
    setUsernameErrText("");
    setmailadressErrText("");
    setslackidErrText("");
    setidmErrText("");
    setroleErrText("");




    const data=new FormData(e.target);
    const username=data.get("username").trim();
    const email=data.get("email").trim();
    const slack_id=data.get("slack_id").trim();
    const idm=data.get("idm").trim();
    const role=data.get("role").trim();

   

    console.log(username);
    console.log(email);
    console.log(slack_id);
    console.log(idm);
    console.log(role);

    let error=false;

    if(username===""){
      error=true;
      setUsernameErrText("名前を入力してください");
    }
    if(email===""){
      error=true;
      setmailadressErrText("メールアドレスを入力してください");
    }
    if(slack_id===""){
      error=true;
      setslackidErrText("スラックのIDを入力してください");
    }
    if(idm===""){
      error=true;
      setidmErrText("カードキーの番号を入力してください");
    }
    if(role===""){
      error=true;
      setroleErrText("userかadminを入力してください");
    }

    if(error) return;
    setLoading(true);

    //新規登録APIを叩く
    try{
      const res=await authApi.register({
        username,
        email,
        slack_id,
        idm,
        role,
      });
      setLoading(false);
      localStorage.setItem("token",res.token);
      console.log("新規登録に成功しました");
      navigate("/");

    }catch(err){
      const errors = err.data.errors;
      console.log(errors);
      errors.forEach((err)=>{
        if(err.path==="idm"){
          setidmErrText(err.msg);
        }
        if(err.path==="email"){
          setmailadressErrText(err.msg);
        }
        if(err.path==="slack_id"){
          setslackidErrText(err.msg);
        }
      })
      setLoading(false);
    }
  };
  return (
    <>
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextField fullWidth id="username" label="お名前" margin='normal'name='username' required helperText={usernameErrText} error={usernameErrText!==""}/>
      <TextField fullWidth id="email" label="メールアドレス" margin='normal'name='email' required helperText={mailadressErrText} error={mailadressErrText!==""}/>
      <TextField fullWidth id="slack_id" label="Slack_ID" margin='normal'name='slack_id' required helperText={slackidErrText} error={slackidErrText!==""}/>
      <TextField fullWidth id="idm" label="icカードの番号" margin='normal'name='idm' required helperText={idmErrText} error={idmErrText!==""}/>
      <TextField fullWidth id="role" label="userかadmin" margin='normal'name='role' required helperText={roleErrText} error={roleErrText!==""}/>
      <LoadingButton sx={{mt: 3, mb: 2}} fullWidth type="submit" loading={loading} color='primary'variant="outlined">アカウント作成</LoadingButton>
    </Box>
    <Button component={Link} to="/login">登録してる場合はこちら</Button>
    </>
  )
};

export default Register;