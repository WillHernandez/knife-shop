import axios from "axios";

async function addToCart(product, quantity) {
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
			cartItemsCopy[i].quantity += 1;
			wasDuplicate = true;
			break;
		}
	}
	if(!wasDuplicate) {
		cartItemsCopy.push(cartItem);
	}
	sessionStorage.setItem('cartItems', JSON.stringify(cartItemsCopy));

	let user;
	if(sessionStorage.getItem('user')) {
		user = JSON.parse(sessionStorage.getItem('userOrder'));
		user.cartItems = cartItemsCopy;
		await axios.patch(`http://localhost:4000/api/orders/${user.email}`, user)
		.catch(e => console.error({error: e.message}))
	}

	return cartItemsCopy;
}

export default addToCart;