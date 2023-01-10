import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setGlobalState } from '../state/index';

const theme = createTheme();

export default function Login() {
	const [loginMessage, setLoginMessage] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const hostUrl = 'https://curious-bracelet-ant.cyclic.app';

  const handleSubmit = async (e) => {
    e.preventDefault();
 // retrieve user from database.. successful login = redirect to homepage. add to global state vars
 		try {
				const res = await axios.post(`${hostUrl}/api/user/login`, { email, password });
				if(res.status === 200) {
					const orderRes = await axios(`${hostUrl}/api/orders/${email}`);
					setGlobalState("user", res.data);
					setGlobalState("cartItems", orderRes.data.cartItems);
					setGlobalState("userOrder", orderRes.data);
					sessionStorage.clear();
					sessionStorage.setItem('user', JSON.stringify(res.data));
					sessionStorage.setItem('cartItems', JSON.stringify(orderRes.data.cartItems));
					sessionStorage.setItem('userOrder', JSON.stringify(orderRes.data));
					navigate('/');
				} 
 			} catch (e) {
					e.status === 401 ? setLoginMessage("Could not login with the provided credentials.") : setLoginMessage("No account found. Please register.")
 			}
	};

  return (
		<div>
	 <ThemeProvider theme={theme}>
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField onChange={e => setEmail(e.target.value)}
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField onChange={e => setPassword(e.target.value)}
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="/signup" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
				{loginMessage.length > 0 && <h3 className='loginMessageStatus'>{loginMessage}</h3>}
			</Box>
		</Container>
	</ThemeProvider>
		</div>
  );
}