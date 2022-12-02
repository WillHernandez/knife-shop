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
import ProminentAppBar from './appbar';

const theme = createTheme();

export default function Register() {
	const [loginMessage, setLoginMessage] = useState('');
	const [user, setUser] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

 // retrieve user from database.. successful login = redirect to homepage
 		try {
				const res = await axios.post('http://localhost:4000/api/user/signup', {
					email: data.get('email'),
					password: data.get('password')	
				})
				if(res.statusText === 'OK') {
					setLoginMessage("Success");
					setUser(data.get('email'));
				} 
 			} catch (e) {
				console.log(e.response);
 			}
	};

  return (
		<div>
		{loginMessage !== "Success" ? <ThemeProvider theme={theme}>
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
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
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
					</Grid>
				</Box>
				{loginMessage.length > 0 && <h3 className='loginMessageStatus'>{loginMessage}</h3>}
			</Box>
		</Container>
	</ThemeProvider> : <ProminentAppBar user={user} />}
		</div>
  );
}