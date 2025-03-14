import { Box, Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material';
import React from 'react';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
    const navigate=useNavigate();
    const logout=()=>{
        localStorage.removeItem("token");
        navigate("/login");
    };
  return (
    <Drawer
        anchor="right"
        container={window.document.body}
        variant="permanent"
        open={true}
        sx={{width:250,height:"100vh"}}
    >
        <List sx={{width:250,height:"100vh"}}>
            {/* <ListItemButton> */}
                <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
                    <Typography variant="body2" fontWeight="700">
                      緑・・いる人
                    </Typography>
                    <Typography variant="body2" fontWeight="700" mt={1}>
                        赤・・いない人
                    </Typography>

                    
                    <IconButton sx={{ width: "100%", textAlign: "center", mt: 10 }} onClick={logout} >
                        ログアウト
                        <LogoutOutlinedIcon/>
                    </IconButton>
                    {/* </Typography> */}
                </Box>
            {/* </ListItemButton> */}
        </List>

    </Drawer>
  )
};

export default Sidebar;