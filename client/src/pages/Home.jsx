import { Box, Container,Avatar,Badge, Typography } from '@mui/material';
import React from 'react'
import  { useEffect,useState } from 'react'
import authApi from '../api/authApi';
import {DataGrid} from '@mui/x-data-grid';

const BlinkingDot=({color})=>{
  return (
    <span style={{
      display:"inline-block",
      width:"10px",
      height:"10px",
      borderRadius:"50%",
      backgroundColor:color,
      animation:"blink 1s infinite alternate",
    }}/>
  );
};


const Home = () => {
  const cols=[
    {
      field:"name",
      headerName:"名前",
      flex:1
    },
    {
      field:"presence",
      headerName:"出席状況",
      flex:1,
      renderCell:(params)=>{
        return (
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <BlinkingDot color={params.value==="出席"?"green":"red"}/>
            <span style={{marginLeft:"30px"}}>{params.value}</span>
          </div>
        );
      },
    },
    {
      field:"previous",
      headerName:"前回の出席",
      flex:1,
    }
  
  ]
  const [labMembers,setLabMembers]=useState([]);
  const rows=labMembers.map((member)=>({
    id:member._id,
    name:member.username,
    presence:member.status==="inside"?"出席":"欠席",
    // previous:member.idm,
  }));//学生の情報を格納するための配列//学生の名前、出席状況、最終出席日時を格納
  // console.log("生成された rows:",rows);
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
    <Box>
      <Typography variant="h4">出席状況</Typography>
      <Typography variant='caption' sx={{fontSize:"25px"}}>
        <span style={{color:"red"}}>赤：欠席</span>
        <span>/</span>
        <span style={{color:"green"}}>緑：出席</span>
      </Typography>
      
      <div style={{width:"100%",height:400}}>
        <DataGrid columns={cols} rows={rows}/>
      </div>
      <style>
        {`@keyframes blink{
          0%{opacity:1}
          100%{opacity:0.2}
        }`}
      </style>

    </Box>
  );
};

export default Home;