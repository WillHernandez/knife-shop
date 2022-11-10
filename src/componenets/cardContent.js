
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MediaCard({brand}) {
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

  return (
		<div className="cardContainer">
			{products.map((product, i) => {
				return(
    			<Card key={i} sx={{ maxWidth: 345, height:500 }}>
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
      			<CardActions>
							<a href={`/${product.brand}/${product.name}`}>
        				<Button size="small">More Details</Button>
							</a>
							<a href="/cart">
        				<Button size="small">Add To Cart</Button>
							</a>
      			</CardActions>
    			</Card>
				)
			})}
		</div>
  );
}