import axios from "axios";
import { useGlobalState, setGlobalState } from '../state/index';

export default function AddToCart (product) {
	const cartItems = useGlobalState('cartItems');
	const user = useGlobalState('user');
	const userOrder = useGlobalState('userOrder');

	const order = {
		// "email": user[0].email,
		"cartItem": {
				"item": product.name,
				"price": product.price,
				"quantity": 1
			}
		}

		const cartItemsCopy = cartItems[0].slice();
		for(let i = 0; i < cartItemsCopy.length; ++i) {
			if(cartItemsCopy[i].item === product.name) {
				cartItemsCopy[i].quantity += 1;
				break;
			}	
		}

		try {
			if(user[0].length) {

			}
		} catch(e) {
			console.error({"error": e.message});
		}
		// try {
		// 	if(Object.keys(user).length) {
		// 		const userHasOrder = await axios(`http://localhost:4000/api/orders/${user.email}`);
		// 		if(userHasOrder.status === 200) {
		// 			let wasDuplicate = false;
		// 			const dbCartItems = userHasOrder.data.cartItems;
		// 			if(dbCartItems.length) {
		// 				for(let currentItem of dbCartItems) {
		// 					if(currentItem.item === order.cartItem.item) {
		// 						currentItem.quantity = currentItem.quantity + 1;
		// 						wasDuplicate = true;
		// 						break;
		// 					}
		// 				}
		// 			}
		// 			if(!wasDuplicate) {
		// 				dbCartItems.push(order.cartItem);
		// 			}
		// 			await axios.patch(`http://localhost:4000/api/orders/${user.email}`, userHasOrder.data)
		// 		}

		// 		if(userHasOrder.status === 204) {
		// 			await axios.post(`http://localhost:4000/api/orders`, order)
		// 		}

		// 	} else {
		// 		window.sessionStorage.setItem(JSON.stringify('order', order));
		// 	}
		// } catch(e) {
		// 	console.log({error: e});
		// }
}