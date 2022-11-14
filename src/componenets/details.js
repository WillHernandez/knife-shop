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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
	height: '100%',
  // textAlign: 'center',
}));

export default function Details({product}) {
  return (
		<React.Fragment>
			<Container >
			<Box className='detailsContainer' sx={{ flexGrow: 1 }}>
      	<Grid container spacing={1}>

        	<Grid style={{height: '500px', width: '200px'}} item xs={8}>
          	<Item>
							<div className="imgContainer">
								{/* <img src={`/${product.productLinks[0]}`} alt="" /> */}
								<Carousel>
									{product.productLinks.map((imgLink, i) => {
									 	return <img src={`/${imgLink}`} alt="" />
									})}
								</Carousel>
							</div>
						</Item>
        	</Grid>

        	<Grid item xs={4}>
          	<Item className='productCart'>
							<h3>Our Sale Price:</h3>
							<h3>{`$${product.price}.00!`}</h3>
							<p>{product.quantity > 0 ? "In Stock!" : "Out Of Stock :-("}</p> 
							<SelectVariants product={product}/>
							<Button className='cartBtn' style={{width:'90%'}} variant="contained" color='warning' size="medium">Add To Cart</Button>
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

const SelectVariants = ({product}) => {
  const [quantity, setQuantity] = React.useState('');

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

	const menuItems = count => {
		for(let i = 0; i < count; ++i) {
			return <MenuItem value={i + 1}>{i + 1}</MenuItem>
		}
	}

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="cartQuantityLabel">Quantity</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={quantity}
          onChange={handleChange}
          label="quantity"
        >
					{menuItems(product.quantity)}
        </Select>
      </FormControl>
    </div>
  );
}