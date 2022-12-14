import axios from "axios";

const addToCart = async (user, product, setCartItems, quantity) => {
	const order = {
		"email": user.email,
		"cartItem": {
				"item": product.name,
				"price": product.price,
				"quantity": quantity
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

export default addToCart;