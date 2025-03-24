import { Box, Drawer, Icon, IconButton, List, ListItemButton, Typography } from '@mui/material';
import React from 'react';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HistoryIcon from "@mui/icons-material/History";
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Sidebar = () => {
    const navigate=useNavigate();
    const user=useSelector((state)=>state.user.value);
    const logout=()=>{
        localStorage.removeItem("token");
        navigate("/login");
    };
    const prevlog=()=>{
        navigate("/logs");
    };
    const home=()=>{
        navigate("/");
    };
  return (
    <Drawer
      container={window.document.body}
      variant='permanent' 
      opne={true} 
      sx={{width:250,height:"100vh"}}>
        <List sx={{width:250,height:"100vh"}}>
            <ListItemButton>
                <Box sx={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <Typography variant="body2" frontWeight="700">
                        {user.username}
                    </Typography>
                    <IconButton onClick={logout}>
                      <LogoutOutlinedIcon/>
                    </IconButton>
                        
                </Box>
            </ListItemButton>
            <Box sx={{paddingTop:"10px"}}></Box>
            <ListItemButton>
                <Box sx={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <Typography variant="body2" frontWeight="700">
                        過去のログ
                    </Typography>
                    <IconButton onClick={prevlog}>
                        <HistoryIcon/>
                        
                    </IconButton>
                </Box>
            </ListItemButton>
            <Box sx={{paddingTop:"10px"}}></Box>
            <ListItemButton>
                <Box sx={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <Typography variant="body2" frontWeight="700">
                        出席状況
                    </Typography>
                    <IconButton onClick={home}>
                        <GroupsIcon/>
                        
                    </IconButton>
                </Box>
            </ListItemButton>
            <Box sx={{paddingTop:"10px"}}></Box>

        </List>
        

    </Drawer>
  )
};

export default Sidebar;