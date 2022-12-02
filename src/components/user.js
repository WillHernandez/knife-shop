import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleClick = async (e) => {
		e.preventDefault();
		const body = {
			'email': email,
			'password': password
		}

		await axios.post(`http://localhost:4000/api/user/${e.target.textContent}`, {...body})
		.then(res => console.log(res.data))
		.catch(e => e.message)
	}

	return(
		<div>
			<form action="">
				<input onChange={e => setEmail(e.target.value)} type="text" name="email" className="emailBtn" placeholder="email address"/>
				<input onChange={e => setPassword(e.target.value)} type="password" name="password" className="passwordBtn" placeholder="password"/>
				<button onClick={handleClick} type="submit">signup</button>
				<button onClick={handleClick} type="submit">login</button>
			</form>
		</div>
	)
}

export default UserForm;