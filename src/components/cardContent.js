
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const MediaCard = ({brand, setCartItems}) => {
	const [products, setProducts] = useState([]);
	const [user, setUser] = useState({});

	useEffect(() => {
		if(brand) {
			axios(`http://localhost:4000/api/products/${brand}`)
			.then(res => setProducts(res.data))
			.catch(e => console.log({error: e.message}))
		} else {
			axios('http://localhost:4000/api/products')
			.then(res => setProducts(res.data))
			.catch(e => console.log({error: e.message}))
		}
	}, [brand])

	useEffect(() => {
		if(window.sessionStorage.getItem('user')) {
			setUser(JSON.parse(window.sessionStorage.getItem('user')));
		}
	},[]);

  return (
		<div className="cardContainer">
			{products.map((product, i) => {
				return(
    			// <Card key={i} sx={{ maxWidth: 345, height:500 }}>
    			<Card className='card' key={i} sx={{ width: 345, height:500 }}>
						<a href={`/${product.brand}/${product.name}`}>
      				<CardMedia
        				component="img"
        				height="200"
								src={`/${product.productLinks[0]}`}
      				/>
						</a>
      			<CardContent className='cardContent'>
							<a href={`/${product.brand}/${product.name}`}>
								<Typography className='productTitle' gutterBottom variant="p" component="div">
									{product.title}
        				</Typography>
							</a>
      			</CardContent>
      			<CardActions className='cardActions'>
							<a href={`/${product.brand}/${product.name}`}>
        				<Button size="small">More Details</Button>
							</a>
        			<Button onClick={e => {e.preventDefault(); addToCart(user, product, setCartItems)}} className={`${product.brand}_btn`} id={`${product.name}`} size="small">Add To Cart</Button>
      			</CardActions>
    			</Card>
				)
			})}
		</div>
  );
}

export const addToCart = async (user, product, setCartItems) => {
	const order = {
		"email": user.email,
		"cartItem": {
				"item": product.name,
				"price": product.price,
				"quantity": 1
			}
	}

		try {
			if(Object.keys(user).length) {
				const userHasOrder = await axios(`http://localhost:4000/api/orders/${user.email}`);
				if(userHasOrder.status === 200) {
					let wasDuplicate = false;
					const dbCartItems = userHasOrder.data.cartItems;
					if(dbCartItems.length) {
						for(let currentItem of dbCartItems) {
							if(currentItem.item === order.cartItem.item) {
								currentItem.quantity = currentItem.quantity + 1;
								wasDuplicate = true;
								break;
							}
						}
					}
					if(!wasDuplicate) {
						dbCartItems.push(order.cartItem);
						setCartItems(userHasOrder.data.cartItems);
					}
					await axios.patch(`http://localhost:4000/api/orders/${user.email}`, userHasOrder.data)
				}

				if(userHasOrder.status === 204) {
					await axios.post(`http://localhost:4000/api/orders`, order)
				}

			} else {
				window.sessionStorage.setItem(JSON.stringify('order', order));
			}
		} catch(e) {
			console.log({error: e});
		}
}