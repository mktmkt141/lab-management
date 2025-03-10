// import { Box, Container } from '@mui/material';
// import React, { useEffect } from 'react'
// import { Outlet, useNavigate } from 'react-router-dom';
// import authUtils from '../../utils/authUtils';
// import Sidebar from '../common/Sidebar';

// const AppLayout = () => {
//   const navigate=useNavigate();
//   useEffect(()=>{
//     //JWTを持っているのかを確認する
//     const checkAuth=async()=>{
//       //認証チェック
//       const user=await authUtils.isAuthenticated();
//       if(!user){
//         navigate("/login");
//       }

//     };
//     checkAuth();

//   },[navigate]);
//   return (
//     <div>
     
        
        
//     </div>
//   )
// };

// export default AppLayout;

// import { Box, Container, AppBar, Toolbar, Typography, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, CssBaseline, IconButton, Drawer } from '@mui/material';
// import React, { useEffect, useState } from 'react'
// import { Outlet, useNavigate } from 'react-router-dom';
// import authUtils from '../../utils/authUtils';
// import { Menu as MenuIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';

// const AppLayout = () => {
//   const navigate = useNavigate();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [labUsers, setLabUsers] = useState([]);
//   const drawerWidth = 240;

//   useEffect(() => {
//     // JWT認証チェック
//     const checkAuth = async () => {
//       // 認証チェック
//       const user = await authUtils.isAuthenticated();
//       if (!user) {
//         navigate("/login");
//       }
//     };
//     checkAuth();

//     // 研究室にいるユーザーを取得する
//     const fetchLabUsers = async () => {
//       try {
//         // APIからデータを取得する例
//         // 実際のエンドポイントに合わせて調整してください
//         const response = await fetch('/api/lab-users');
//         const data = await response.json();
//         setLabUsers(data.users);
//       } catch (error) {
//         console.error('Failed to fetch lab users:', error);
//       }
//     };

//     fetchLabUsers();
    
//     // WebSocketで研究室の入退室情報をリアルタイムに取得
//     const ws = new WebSocket('ws://your-websocket-server-url');
    
//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.type === 'LAB_USERS_UPDATE') {
//         setLabUsers(data.users);
//       }
//     };

//     return () => {
//       ws.close();
//     };
//   }, [navigate]);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleLogout = async () => {
//     // ログアウト処理
//     await authUtils.logout();
//     navigate("/login");
//   };

//   const drawer = (
//     <Box>
//       <Toolbar>
//         <Typography variant="h6" noWrap component="div">
//           ダッシュボード
//         </Typography>
//       </Toolbar>
//       <Divider />
//       <Box sx={{ p: 2 }}>
//         <Typography variant="h6" gutterBottom>
//           研究室にいるメンバー
//         </Typography>
//         {labUsers.length === 0 ? (
//           <Typography variant="body2" color="text.secondary">
//             現在研究室にはメンバーがいません
//           </Typography>
//         ) : (
//           <List>
//             {labUsers.map((user) => (
//               <ListItem key={user.id}>
//                 <ListItemAvatar>
//                   <Avatar alt={user.name} src={user.avatar || '/static/images/avatar/1.jpg'} />
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary={user.name} 
//                   secondary={`入室時間: ${new Date(user.enteredAt).toLocaleTimeString()}`} 
//                 />
//               </ListItem>
//             ))}
//           </List>
//         )}
//       </Box>
//     </Box>
//   );

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           ml: { sm: `${drawerWidth}px` },
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
//             入退室管理システム
//           </Typography>
//           <IconButton color="inherit" onClick={handleLogout}>
//             <LogoutIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//       >
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile
//           }}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: 'none', sm: 'block' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//       <Box
//         component="main"
//         sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
//       >
//         <Toolbar />
//         <Container maxWidth="lg">
//           <Paper sx={{ p: 2 }}>
//             <Outlet />
//           </Paper>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default AppLayout;
// "use client"

// import {
//   Box,
//   Container,
//   Card,
//   CardContent,
//   CardHeader,
//   Typography,
//   Chip,
//   List,
//   ListItem,
//   Divider,
//   styled,
// } from "@mui/material"
// import React, { useEffect, useState } from "react"
// import { Outlet, useNavigate } from "react-router-dom"
// import authUtils from "../../utils/authUtils"
// import Sidebar from "../common/Sidebar"

// // 点滅効果用のスタイル付きChip
// const BlinkingChip = styled(Chip)(({ theme, blinking }) => ({
//   backgroundColor: theme.palette.success.main,
//   color: theme.palette.success.contrastText,
//   opacity: blinking ? 1 : 0.4,
//   transition: "opacity 0.3s ease-in-out",
// }))

// // 研究室メンバー在室状況コンポーネント（Material UI版）
// const LabMembersPresence = () => {
//   // サンプルデータ - 実際のメンバーリストに置き換えてください
//   const labMembers = [
//     { id: 1, name: "田中 教授", isPresent: true },
//     { id: 2, name: "佐藤 准教授", isPresent: false },
//     { id: 3, name: "鈴木 助教", isPresent: true },
//     { id: 4, name: "山田 博士課程", isPresent: false },
//     { id: 5, name: "伊藤 修士課程", isPresent: true },
//     { id: 6, name: "渡辺 学部生", isPresent: false },
//   ]

//   const [members, setMembers] = useState(labMembers)
//   const [blinkState, setBlinkState] = useState(true)

//   // 点滅エフェクト用のステート切り替え
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setBlinkState((prev) => !prev)
//     }, 800) // 0.8秒ごとに点滅

//     return () => clearInterval(interval)
//   }, [])

//   // 実際の実装では、ここでICカードリーダーのAPIからデータを取得するロジックを追加
//   useEffect(() => {
//     // 例: 5秒ごとにデータを更新する模擬実装
//     const fetchData = () => {
//       // ここでAPIからデータを取得する処理を実装
//       console.log("ICカードデータ更新（デモ用ログ）")
//     }

//     const dataInterval = setInterval(fetchData, 5000)
//     return () => clearInterval(dataInterval)
//   }, [])

//   return (
//     <Card sx={{ maxWidth: 500, mx: "auto" }}>
//       <CardHeader title={<Typography variant="h6">研究室メンバー在室状況</Typography>} />
//       <CardContent>
//         <List sx={{ width: "100%" }}>
//           {members.map((member, index) => (
//             <React.Fragment key={member.id}>
//               <ListItem
//                 sx={{
//                   py: 1.5,
//                   display: "flex",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <Typography variant="body1" sx={{ fontWeight: 500 }}>
//                     {member.name}
//                   </Typography>
//                   {member.isPresent && <BlinkingChip label="在室中" size="small" blinking={blinkState ? 1 : 0} />}
//                 </Box>
//               </ListItem>
//               {index < members.length - 1 && <Divider />}
//             </React.Fragment>
//           ))}
//         </List>

//         <Box sx={{ mt: 3, display: "flex", alignItems: "center", gap: 1 }}>
//           <Chip label="在室中" size="small" color="success" />
//           <Typography variant="body2" color="text.secondary">
//             : 現在研究室にいるメンバー
//           </Typography>
//         </Box>
//       </CardContent>
//     </Card>
//   )
// }

// const AppLayout = () => {
//   const navigate = useNavigate()

//   useEffect(() => {
//     // JWTを持っているのかを確認する
//     const checkAuth = async () => {
//       // 認証チェック
//       const user = await authUtils.isAuthenticated()
//       if (!user) {
//         navigate("/login")
//       }
//     }
//     checkAuth()
//   }, [navigate])

//   return (
//     <div>
//       <Box sx={{ display: "flex" }}>
//         <Sidebar />
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Container>
//             {/* 研究室メンバー在室状況コンポーネント */}
//            <LabMembersPresence/>

//             {/* React Routerのアウトレット - 子ルートのコンポーネントがここにレンダリングされる */}
//             <Box sx={{ mt: 4 }}>
//               {/* <Outlet /> */}
//             </Box>
//           </Container>
//         </Box>
//       </Box>
//     </div>
//   )
// }

// export default AppLayout




// import { 
//   Box, 
//   Container, 
//   AppBar, 
//   Toolbar, 
//   Typography, 
//   Paper, 
//   List, 
//   ListItem, 
//   ListItemText, 
//   ListItemAvatar, 
//   Avatar, 
//   Divider, 
//   CssBaseline, 
//   IconButton, 
//   Drawer,
//   CircularProgress,
//   Alert,
//   Badge
// } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import authUtils from '../../utils/authUtils';
// import { Menu as MenuIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';

// const AppLayout = () => {
//   const navigate = useNavigate();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [labUsers, setLabUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const drawerWidth = 240;

//   useEffect(() => {
//     const checkAuthAndFetchData = async () => {
//       try {
//         // JWT認証チェック
//         const user = await authUtils.isAuthenticated();
//         if (!user) {
//           navigate("/login");
//           return;
//         }

//         // 初期データの取得
//         await fetchLabUsers();
//         setupWebSocket();
//       } catch (err) {
//         console.error('初期化エラー:', err);
//         setError('システムの初期化に失敗しました');
//       }
//     };

//     checkAuthAndFetchData();
//   }, [navigate]);

//   const fetchLabUsers = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/lab-members`, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error('メンバーリストの取得に失敗しました');
//       }
      
//       const data = await response.json();
//       setLabUsers(data.users);
//       setError(null);
//     } catch (err) {
//       console.error('メンバーリストの取得エラー:', err);
//       setError('メンバーリストを読み込めませんでした');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const setupWebSocket = () => {
//     const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    
//     ws.onopen = () => {
//       console.log('WebSocket接続が確立されました');
//     };

//     ws.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         if (data.type === 'LAB_USERS_UPDATE') {
//           setLabUsers(data.users);
//         }
//       } catch (err) {
//         console.error('WebSocketメッセージの処理エラー:', err);
//       }
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocketエラー:', error);
//       setError('リアルタイム更新に問題が発生しました');
//     };

//     return () => {
//       if (ws.readyState === WebSocket.OPEN) {
//         ws.close();
//       }
//     };
//   };

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleLogout = async () => {
//     await authUtils.logout();
//     navigate("/login");
//   };

//   // 在室者数のカウント
//   const insideCount = labUsers.filter(user => user.status === 'inside').length;

//   const drawer = (
//     <Box>
//       <Toolbar>
//         <Typography variant="h6" noWrap component="div">
//           研究室ダッシュボード
//         </Typography>
//       </Toolbar>
//       <Divider />
//       <Box sx={{ p: 2 }}>
//         <Typography variant="h6" gutterBottom>
//           現在研究室にいるメンバー
//           <Badge 
//             badgeContent={insideCount} 
//             color="primary" 
//             sx={{ ml: 2 }}
//           />
//         </Typography>
//         {isLoading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
//             <CircularProgress />
//           </Box>
//         ) : error ? (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {error}
//           </Alert>
//         ) : labUsers.filter(user => user.status === 'inside').length === 0 ? (
//           <Typography variant="body2" color="text.secondary">
//             現在研究室にはメンバーがいません
//           </Typography>
//         ) : (
//           <List>
//             {labUsers
//               .filter(user => user.status === 'inside')
//               .map((user) => (
//                 <ListItem key={user._id}>
//                   <ListItemAvatar>
//                     <Avatar sx={{ bgcolor: 'primary.main' }}>
//                       {user.username[0]}
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText 
//                     primary={user.username}
//                     secondary={
//                       <>
//                         <Typography component="span" variant="body2">
//                           {user.role}
//                         </Typography>
//                         {user.slack_mention && (
//                           <Typography 
//                             component="span" 
//                             variant="body2" 
//                             sx={{ ml: 1, color: 'text.secondary' }}
//                           >
//                             (Slack: {user.slack_mention})
//                           </Typography>
//                         )}
//                       </>
//                     }
//                   />
//                 </ListItem>
//               ))}
//           </List>
//         )}
//       </Box>
//       <Divider />
//       <Box sx={{ p: 2 }}>
//         <Typography variant="h6" gutterBottom>
//           不在メンバー
//         </Typography>
//         <List>
//           {labUsers
//             .filter(user => user.status === 'outside')
//             .map((user) => (
//               <ListItem key={user._id}>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'grey.400' }}>
//                     {user.username[0]}
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary={user.username}
//                   secondary={user.role}
//                 />
//               </ListItem>
//             ))}
//         </List>
//       </Box>
//     </Box>
//   );

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           ml: { sm: `${drawerWidth}px` },
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
//             研究室入退室管理システム
//           </Typography>
//           <IconButton color="inherit" onClick={handleLogout}>
//             <LogoutIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//       >
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true,
//           }}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: 'none', sm: 'block' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>

//       <Box
//         component="main"
//         sx={{ 
//           flexGrow: 1, 
//           p: 3, 
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           minHeight: '100vh'
//         }}
//       >
//         <Toolbar />
//         <Container maxWidth="lg">
//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error}
//             </Alert>
//           )}
//           <Paper sx={{ p: 2 }}>
//             <Outlet />
//           </Paper>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default AppLayout;



import { Box, Container,Avatar,Badge } from '@mui/material';
import React, { useEffect,useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import authUtils from '../../utils/authUtils';
import authApi from '../../api/authApi';
import Sidebar from '../common/Sidebar';

const AppLayout = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    //JWTを持っているのかを確認する
    const checkAuth=async()=>{
      //認証チェック
      const user=await authUtils.isAuthenticated();
      if(!user){
        navigate("/login");
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
    <Container>
      <h1 style={{textAlign:"center"}}>
        研究室にいるメンバーのリスト
      </h1>
      <Box sx={{display:'flex',justifyContent:'space-between'}}>
        <Box sx={{flex:1}}>
          <Box component="ul" sx={{listStyle:'none',padding:0}}>
            {labMembers.map((user)=>(
              <Box component="li" key={user._id} sx={{display:'flex',alignItems:'center',mb:2}}>
                <Badge 
                color={user.status==="inside"?"success":"error"} 
                variant="dot" 
                overlap="circular" 
                anchorOrigin={{vertical:'bottom',horizontal:'right'}}
                >
                  <Avatar>{user.username.charAt(0)}</Avatar>
                </Badge>
                <Box sx={{ml:2}}>{user.username}</Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Sidebar/>

      </Box>

    </Container>
  );
};

export default AppLayout;


