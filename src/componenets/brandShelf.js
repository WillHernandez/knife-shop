const BrandsShelf = () => {
	const shelfBrands = ['Benchmade', 'Microtech', 'Protech', 'Spyderco'];
	return(
		<div className="brandImages">
			{shelfBrands.map((brand, i) => (
				<li key={i}>
					<a 
						className='shelfBrands'
						href={`/${brand}`}>
						<img src={require(`../images/brandShelf/${brand}.png`)}
						alt="" />
					</a>
				</li>
			))}
		</div>
	)
}

export default BrandsShelf;