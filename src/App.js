import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Login from './componenets/login';
import MediaCard from './componenets/cardContent';
import ProminentAppBar from './componenets/appbar';
import BrandsShelf from './componenets/brandShelf';
import Cart from './componenets/cart';
import Details from './componenets/details';
import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
		axios(`http://localhost:4000/api/products`)
		.then(res => setProducts(res.data))
		.catch(e => console.log({error: e.message}))
  }, [])
  
  return (
    <div>
      <ProminentAppBar />
      <BrandsShelf />
      <Router>
        <Routes>
          <Route path='/' element={<MediaCard />}></Route>
          <Route path='/login' element={<Login />}></Route>
          {['Benchmade','Microtech', 'Protech', 'Spyderco'].map((brand, i) => {
            return <Route 
              key={i} 
              path={`/${brand}`} 
              element={<MediaCard brand={brand}/>} >
            </Route>
          })}
          {products.map((product, i) => {
            return <Route 
              key={i} 
              path={`/${product.brand}/${product.name}`} 
              element={<Details product={product}/>} >
            </Route>
          })}
          <Route path='/cart' element={<Cart />}></Route>
          {/* <Route path='*' element={<MediaCard />}></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
