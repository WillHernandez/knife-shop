import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Carousel from 'react-material-ui-carousel'
import addToCart from './addToCart';
import { setGlobalState } from '../state';
import { useState, useEffect } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
	height: '100%',
}));

export default function Details({ product }) {
	const	handleAddToCart = async (product, quantity) => {
		const cartItemsCopy = await addToCart(product, quantity);
		setGlobalState('cartItems', cartItemsCopy);
	}

	const [retQuantity, setRetQuantity] = useState(0);

  return (
		<React.Fragment>
			<Container >
			<Box className='detailsContainer' sx={{ flexGrow: 1 }}>
      	<Grid container spacing={1}>

        	<Grid style={{height: '500px', width: '200px'}} item xs={8}>
          	<Item>
							<div className="imgContainer">
								<Carousel>
									{product.productLinks.map((imgLink, i) => {
									 	return <img key={i} src={`/${imgLink}`} alt="" />
									})}
								</Carousel>
							</div>
						</Item>
        	</Grid>

        	<Grid item xs={4}>
          	<Item className='productCart'>
							<h1>{`${product.brand} ${product.name}`}</h1>
							<h3>Our Sale Price:</h3>
							<h3>{`$${product.price}.00!`}</h3>
							<p>{product.quantity > 0 ? "In Stock!" : "Out Of Stock :-("}</p> 
							<SelectVariants setRetQuantity={setRetQuantity} product={product}/>
							<Button onClick={e =>{e.preventDefault(); return handleAddToCart(product, retQuantity)}} className='cartBtn' style={{width:'90%'}} variant="contained" color='warning' size="medium">Add To Cart</Button>
						</Item>
        	</Grid>

        	<Grid style={{height: '400px', width: '200px'}} item xs={8}>
          	<Item>
							<div className="features">
								<h3>Features:</h3>
								<ul>
									{product.features.map((feature, i) => {
										return <li key={i}>{feature}</li>
									})}
								</ul>
							</div>
							<div className="description">
								<h3>Description:</h3>
								<p>{product.description}</p>
							</div>
						</Item>
        	</Grid>

      	</Grid>
    	</Box>
			</Container>
    </React.Fragment>
  );
}

const SelectVariants = ({product, setRetQuantity}) => {
	const [menuArr, setMenuArr] = useState([]);

	useEffect(()=> {
		let arr = [];
		for(let i = 0; i < product.quantity; ++i) {
			arr[i] = i + 1;
		}
		setMenuArr(arr);
	},[product])

  const handleChange = (event) => {
		setRetQuantity(event.target.value);
  };

	
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="cartQuantityLabel">Quantity</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          onChange={handleChange}
          label="quantity"
        >
					{menuArr.map(item => {
						return <MenuItem value={item}>{item}</MenuItem>
					})}
        </Select>
      </FormControl>
    </div>
  )
}