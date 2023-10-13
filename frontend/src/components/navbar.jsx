import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/joi/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { FormControl, Select } from '@mui/material';
import { Link } from 'react-router-dom';
// import { Dropdown, MenuButton } from '@mui/joy';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import { connect } from 'react-redux';
import { setHistory, setuserToken } from '../redux/user/user.action';
import {  selectuserToken } from '../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { setMessage, setVisible } from '../redux/alert/alert.action';
import { Widgets, WidthFull } from '@mui/icons-material';


const pagesUnauth = ['login', 'signup', 'history'];
const pagesauth = [ 'history'];


function NavBarMUI({setUserToken,usertoken,setHistory,setMessage,setAlertVisible,username}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout=()=>{
    setUserToken(null)
    setHistory([])
    setMessage({msg:"Successfully Logged Out",type:"success"})
    setAlertVisible(true)
  }
  return (
    <AppBar position="relative">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Weeds
          </Typography>


          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Weeds
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {(usertoken?pagesauth:pagesUnauth).map((page) => (
              <Link to={`/users/${page}`}><Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button></Link>
              
            ))}
            
            {usertoken?
             <Button
                key="logout"
                onClick={handleLogout}
                sx={{ my: 0, color: 'black', display: 'block' }}
              >
                LogOut
              </Button>:<></>
            }
            <Link to={`/`}><Button
                key={1}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block',mx:5 }}
              >
                Home
              </Button></Link>


              
          </Box>
          {/* {
              usertoken?
            <div className='text-white px-4 md:px-20 text-center w-max'>Welcome <span className='font-bold'>{username}</span></div>:<></>
            } */}


          <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{display:{xs:"block",md:"none"},color:"white"}}
      >
        <i className="fa-solid fa-bars" style={{color: "white"}}>Options</i>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{display:{xs:"block",md:"none"}}}
      >
        {(usertoken?pagesauth:pagesUnauth).map((page) => (
                <Link to={`/users/${page}`}><MenuItem><Button
                key={page}
                onClick={handleClose}
                sx={{ my: 0, color: 'black', display: 'block' }}
              >
                {page}
              </Button></MenuItem></Link>
              ))}
              {usertoken?

             <MenuItem onClick={handleLogout}><Button  sx={{width:"full"}}>Logout</Button></MenuItem>:<></>
              }
              <MenuItem><Link to={`/`}><Button
                key={1}
                onClick={handleCloseNavMenu}
                sx={{ my: 0, color: 'black', display: 'block' }}
              >
                Home
              </Button></Link></MenuItem>
              <MenuItem onClick={handleClose}><Button >Close</Button></MenuItem>
              
      </Menu>


          

      


</Toolbar>
      </Container>
    </AppBar>
  );
}

const mapStateToProps=createStructuredSelector({
  usertoken:selectuserToken,


})

const mapDispatchToProps=(dispatch)=>({
  setUserToken:(token)=>dispatch(setuserToken(token)),
  setMessage:(obj)=>dispatch(setMessage(obj)),
  setHistory:(arr)=>dispatch(setHistory(arr)),
  setAlertVisible:(bool)=>dispatch(setVisible(bool))


})

export default connect(mapStateToProps,mapDispatchToProps)( NavBarMUI);