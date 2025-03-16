
import { Box, Container,Avatar,Badge, Typography } from '@mui/material';
import React, { useEffect,useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import authUtils from '../../utils/authUtils';
import authApi from '../../api/authApi';
import Sidebar from '../common/Sidebar';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/userSlice';

const AppLayout = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  useEffect(()=>{
    //JWTを持っているのかを確認する
    const checkAuth=async()=>{
      //認証チェック
      const user=await authUtils.isAuthenticated();
      if(!user){
        navigate("/login");
      }else{
        //ユーザーの保存
        dispatch(setUser(user));

      }

    };
    checkAuth();

  },[navigate]);

  const [labMembers,setLabMembers]=useState([]);
  useEffect(()=>{
    authApi.users().then(response=>{
      console.log("取得したレスポンス",response);
      // console.log("取得したデータ:",response.data);
      setLabMembers(response);
    })
    .catch(error=>{
      console.error("ユーザー取得失敗",error);
    });
  },[]);
  return (

    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* サイドバー（右側） */}
      <Sidebar />
      <Box sx={{flexGrow:1,p:1,wodth:"max-content"}}>
        <Outlet/>
      </Box>
      

      
    </Box>


  


// ... existing code ...
  );
};

export default AppLayout;


