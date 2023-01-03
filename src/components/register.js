import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import { setGlobalState } from '../state/index';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function Register() {
	const [loginFailMessage, setLoginFailMessage] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const hostUrl = 'https://curious-bracelet-ant.cyclic.app';
	const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
	const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
		const validEmail = email.match(emailRegex);
		const validPw = password.match(pwRegex);

		if(!validEmail) {
			setLoginFailMessage('You must provide a valid email address');
			return;
		}
		if(!validPw) {
			setLoginFailMessage('Password must be a minimum of 8 chars, both Upper and lowercase chars, and a number');
			return;
		}

 // retrieve user from database.. successful login = redirect to homepage
 		try {
				const res = await axios.post(`${hostUrl}/api/user/signup`, { email, password });
				if(res.status === 200) {
					setGlobalState('user', res.data);
					sessionStorage.setItem('user', JSON.stringify(res.data));
					navigate('/');
					return;
				}
				if(res.status === 204) {
					setLoginFailMessage("Email already exists. Log-in if you are its owner");
					return;
				}
				setLoginFailMessage("An error occured during registration.");
 			} catch (e) {
				setLoginFailMessage(e.response.data)
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
							<TextField
								margin="normal"
								required
								fullWidth
								id="name"
								label="Full Name"
								name="name"
								autoComplete="name"
								autoFocus
							/>
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
								Sign Up
							</Button>
							<Grid container>
								<h3 style={{textAlign:'center'}}>{loginFailMessage}</h3>
							</Grid>
						</Box>
					</Box>
				</Container>
			</ThemeProvider>
		</div>
  );
}