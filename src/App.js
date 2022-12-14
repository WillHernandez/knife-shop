import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Login from './components/login';
import Register from './components/register';
import {MediaCard} from './components/cardContent';
import ProminentAppBar from './components/appbar';
import BrandsShelf from './components/brandShelf';
import Cart from './components/cart';
import Details from './components/details';
import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState('');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
		axios(`http://localhost:4000/api/products`)
		.then(res => setProducts(res.data))
		.catch(e => console.log({error: e.message}))
  }, [])

  useEffect(() => {
    if(!user && window.sessionStorage.getItem("user")) {
      setUser(JSON.parse(window.sessionStorage.getItem("user")));
    }
  }, [user])

  useEffect(() => {
    const sessionCartItems = JSON.parse(window.sessionStorage.getItem("cartItems"));
    if(sessionCartItems && sessionCartItems.length !== cartItems.length) {
      setCartItems(sessionCartItems);
      window.sessionStorage.setItem('cartItems', JSON.stringify(sessionCartItems));
    }
  }, [cartItems])

  // write cart to DB
  return (
    <div>
      <ProminentAppBar user={user} setUser={setUser} cartLength={cartItems.length} setCartItems={setCartItems} />
      <BrandsShelf />
      <Router>
        <Routes>
          <Route path='/' element={<MediaCard setCartItems={setCartItems} />}></Route>
          <Route path='/login' element={<Login setUser={setUser} setCartItems={setCartItems} />}></Route>
          <Route path='/signup' element={<Register />}></Route>
          <Route path='/cart' element={<Cart userEmail={user.email} setCartItems={setCartItems}/>}></Route>
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
              element={<Details product={product} user={user} setCartItems={setCartItems}/>} >
            </Route>
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
