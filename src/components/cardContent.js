
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import addToCart from './addToCart';
import axios from 'axios';
import { setGlobalState } from '../state/index';

export const MediaCard = ({brand}) => {
	const [products, setProducts] = useState([]);

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

	const	handleAddToCart = async (product, quantity) => {
		const cartItemsCopy = await addToCart(product, quantity);
		setGlobalState('cartItems', cartItemsCopy);
	}

  return (
		<div className="cardContainer">
			{products.map((product, i) => {
				return(
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
      			<CardActions className=''>
							<a href={`/${product.brand}/${product.name}`}>
        				<Button size="small">More Details</Button>
							</a>
        			<Button onClick={e => {
								e.preventDefault();
								handleAddToCart(product, 1)}
								} className={`${product.brand}_btn`} id={`${product.name}`} size="small">Add To Cart
							</Button>
      			</CardActions>
    			</Card>
				)
			})}
		</div>
  );
}