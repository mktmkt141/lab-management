import { Box, Container } from '@mui/material';
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import authUtils from '../../utils/authUtils';

const AuthLayout = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    //JWTを持っているのかを確認する
    const checkAuth=async()=>{
      //認証チェック
      const isAuth=await authUtils.isAuthenticated();
      if(isAuth){
        navigate("/");
      }

    };
    checkAuth();

  },[navigate]);
  return (
    <div>
        <Container component="main" maxWidth="xs">
          <Box sx={{
            marginTop: 8,
            display:"flex",
            alignItems:"center",
            flexDirection:"column"
          }}>
            入退出管理

          </Box>
          <Outlet />

        </Container>
        
    </div>
  )
};

export default AuthLayout;