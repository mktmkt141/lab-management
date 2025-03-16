import { Box, Container,Avatar,Badge, Typography } from '@mui/material';
import React from 'react'
import  { useEffect,useState } from 'react'
import authApi from '../api/authApi';




const Home = () => {
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
    <div>
      
             <Box sx={{ p:1,width:"max-content",m:2 }}>
              <h3>緑：出席 赤:欠席</h3>
              
              <Container maxWidth="sm">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: 2,
                    width: "100%",
                  }}
                >
                  {labMembers.map((member) => (
                    <Box
                      key={member._id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        p: 1,
                        width: "100%",
                      }}
                    >
                      <Typography sx={{ fontSize: "1.2rem", textAlign: "left" }}>
                        {member.username}
                      </Typography>
                      <Badge
                        sx={{
                          "& .MuiBadge-badge": {
                            backgroundColor:
                              member.status === "inside" ? "#4CAF50" : "#f44336",
                            animation: "blink 1.5s infinite",
                            "@keyframes blink": {
                              "0%": { opacity: 1 },
                              "50%": { opacity: 0.3 },
                              "100%": { opacity: 1 },
                            },
                          },
                        }}
                        variant="dot"
                      />
                    </Box>
                  ))}
                </Box>
              </Container>
            </Box>
    </div>
  )
};

export default Home;