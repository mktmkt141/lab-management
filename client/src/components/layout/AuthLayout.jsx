import { Box, Container } from '@mui/material';
import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import authUtils from '../../utils/authUtils';

const AuthLayout = () => {
  const navigate=useNavigate();
  const location=useLocation();
  useEffect(()=>{
    //JWTを持っているのかを確認する
    const checkAuth=async()=>{
      //認証チェック
      const isAuth=await authUtils.isAuthenticated();
      if(isAuth&&location.pathname!=="/logs"){
        navigate("/");
      }

    };
    checkAuth();

  },[navigate,location.pathname]);
  return (
    <div>
        <Container component="main" maxWidth="xs">
          <Box sx={{
            marginTop: 8,
            display:"flex",
            alignItems:"center",
            flexDirection:"column"
          }}>
            研究室 出席管理

          </Box>
          <Outlet />

        </Container>
        
    </div>
  )
};

export default AuthLayout;