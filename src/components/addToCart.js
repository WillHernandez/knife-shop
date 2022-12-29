import axios from "axios";

async function addToCart(product, quantity) {
	const hostUrl = 'https://curious-bracelet-ant.cyclic.app';
	const cartItem = {
		"item": product.name,
		"price": product.price,
		"quantity": quantity
	}

	let cartItemsCopy = [];
	if(sessionStorage.cartItems) {
		cartItemsCopy = JSON.parse(sessionStorage.getItem('cartItems'))
	}

	let wasDuplicate = false;
	for(let i = 0; i < cartItemsCopy.length; ++i) {
		if(cartItemsCopy[i].item === product.name) {
			cartItemsCopy[i].quantity += cartItem.quantity;
			product.quantity -= cartItem.quantity;
			wasDuplicate = true;
			break;
		}
	}
	if(!wasDuplicate) {
		cartItemsCopy.push(cartItem);
		product.quantity -= cartItem.quantity;
	}
	sessionStorage.setItem('cartItems', JSON.stringify(cartItemsCopy));

	let user;
	if(sessionStorage.getItem('user')) {
		user = JSON.parse(sessionStorage.getItem('userOrder'));
		user.cartItems = cartItemsCopy;
		await axios.patch(`${hostUrl}/api/orders/${user.email}`, user)
		.catch(e => console.error({error: e.message}))

		// remove quantity from item on products/db
		axios.patch(`${hostUrl}/api/products`, {...product})
		.catch(e => console.error({error: e.message}))
	}

	// possily return an array with new product to update details dropdown count
	// also we can use this to determine if addToCart btn on cardcontent page is active
	return cartItemsCopy;
}

export default addToCart;