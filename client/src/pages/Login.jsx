import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { LoadingButton } from "@mui/lab";
import {Link,useNavigate} from "react-router-dom";
import authApi from '../api/authApi';

const Login = () => {
  const navigate=useNavigate();
  const [mailadressErrText,setmailadressErrText]=useState("");
  const [idmErrText,setidmErrText]=useState("");
  const [loading,setLoading]=useState(false);
  const handleSubmit=async (e)=>{
    
    //入力欄の文字列を取得
    e.preventDefault();
    setmailadressErrText("");
    setidmErrText("");

    const data=new FormData(e.target);
    const email=data.get("email").trim();
    const idm=data.get("idm").trim();
    console.log(email);
    console.log(idm);
    let error=false;
    if(email===""){
      error=true;
      setmailadressErrText("メールアドレスを入力してください");
    }
    if(idm===""){
      error=true;
      setidmErrText("カードキーの番号を入力してください");
    }
    if(error) return;
    setLoading(true);

    //ログインAPIを叩く
    try{
      const res=await authApi.login({   
        email,
        idm,
      });
      setLoading(false);
      localStorage.setItem("token",res.token);
      console.log("ログインに成功しました");
      navigate("/");
    }catch(err){
      const errors = err.data.errors;
      console.log(errors);
      errors.forEach((err)=>{
        if(err.param==="idm"){
          setidmErrText(err.msg);
        }
        if(err.param==="email"){
          setmailadressErrText(err.msg);
        }
        
      });
      setLoading(false);
    }
  };
  return (
    <>
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextField fullWidth id="email" label="メールアドレス" margin='normal'name='email' required helperText={mailadressErrText} error={mailadressErrText!==""}/>
      <TextField fullWidth id="idm" label="icカードの番号" margin='normal'name='idm' required helperText={idmErrText} error={idmErrText!==""}/>
      <LoadingButton sx={{mt: 3, mb: 2}} fullWidth type="submit" loading={loading} color='primary'variant="outlined">ログイン</LoadingButton>
    </Box>
    <Button component={Link} to="/register">登録していないならこちら</Button>
    </>
  );
};

export default Login;