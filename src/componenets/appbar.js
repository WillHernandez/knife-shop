import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  '@media all': {
    minHeight: 128,
  },
}));

export default function ProminentAppBar() {
  return (
    <div>
      <div className="above">
        <a href="http://localhost:3000/login"><button className='loginBtn'>Login/Register</button></a> | <button className="helpBtn">Help</button> | <button className="contactBtn">Contact Us</button>
      </div>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <StyledToolbar className='appBar'>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ flexGrow: 1, alignSelf: 'center' }}
            >
            KNIFE-SHOP
            </Typography>
            <Stack spacing={2} sx={{ width: 300 }}>
            <TextField label="Search items, brands, etc..." />
            </Stack>
					  <IconButton size="large" aria-label="Cart" color="inherit">
              <div className="cart">
                <ShoppingCartTwoToneIcon className='cartIcon' /> Cart
              </div>
            </IconButton>
          </StyledToolbar>


        </AppBar>
      </Box>
    </div>
  );
}
