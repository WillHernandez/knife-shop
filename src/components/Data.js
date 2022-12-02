import axios from 'axios';

const retrieveProds = async () => {
	await axios(`http://localhost:4000/api/products`)
	.then(res => res.data)
	.catch(err => console.log(err))
}

const retrieveProdsByBrand = async (brand) => {
	await axios(`http://localhost:4000/api/products/${brand}`)
	.then(res => res.data)
	.catch(err => console.log(err))
}

retrieveProds();
retrieveProdsByBrand();

module.exports = {
	retrieveProds,
	retrieveProdsByBrand
}

