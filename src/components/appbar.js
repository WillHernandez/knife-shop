import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useGlobalState, setGlobalState } from '../state/index';
import { useEffect, useState } from 'react';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'center',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  '@media all': {
    minHeight: 128,
  },
}));

export default function ProminentAppBar() {
  const cartItems = useGlobalState('cartItems')[0];
  const user = useGlobalState('user')[0];
  const [cartLength, setCartLength] = useState(0);
  const [userEmail, setUserEmail] = useState('');

 useEffect(() => {
  if(cartItems.length) {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    setCartLength(cartItems.length);
  }else if(sessionStorage.getItem('cartItems')) {
    const localCartItems = JSON.parse(sessionStorage.getItem('cartItems')) 
    setCartLength(localCartItems.length);
  }
 },[cartItems])

 useEffect(()=> {
  if(Object.keys(user).length) {
    sessionStorage.setItem('user', JSON.stringify(user));
    setUserEmail(user.email);
  } else if (sessionStorage.getItem('user')) {
    const localUser = JSON.parse(sessionStorage.getItem('user'));
    setUserEmail(localUser.email);
  }
 },[user])


  const logoutHandler = e => {
    e.preventDefault();
    setGlobalState('user', {});
    setGlobalState('cartItems', []);
    setCartLength(0);
    setUserEmail('');
    sessionStorage.clear();
  }

  return (
    <div>
      <div className="above">
        {userEmail ? <button onClick={logoutHandler} className='logoutBtn'>Logout</button> : <a href="http://localhost:3000/login"><button className='loginBtn'>Login/Register</button></a>} | <button className="helpBtn">Help</button> | <button className="contactBtn">Contact Us</button>
      </div>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <StyledToolbar className='appBar'>
            <div className='brandSearch'>
              <IconButton href='/'>
                <HomeIcon fontSize='large' className='homeIcon'/>
              </IconButton>
             <a href="/">
              <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{ flexGrow: 1, alignSelf: 'center' }}
              >
              KNIFE-SHOP
              </Typography>
            </a> 
              <Stack spacing={2} sx={{ width: 300 }}>
                <TextField label="Search items, brands, etc..." />
              </Stack>
              <div className='cartContainer'>
                {userEmail ?  <p>{`Welcome back ${userEmail}`}</p> : null}
                <a href="/cart">
					        <IconButton size="large" aria-label="Cart" color="inherit">
                    <div className="cart">
                      <ShoppingCartTwoToneIcon className='cartIcon' /> Cart
                      <aside>{cartLength}</aside>
                    </div>
                  </IconButton>
                </a>
              </div>
            </div>
          </StyledToolbar>
        </AppBar>
      </Box>
    </div>
  );
}
