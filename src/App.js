import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
// import Shop from './components/Shop/Shop';
import Profile from './components/profile/Profile';
import ProtectedRoutes from './ProtectedRoutes';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase'
import Cart from './components/Cart/Cart';
import CreateProduct from './components/createProduct/CreateProduct';
import Orders from './components/orders/Orders';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Products from './components/Products.jsx/Products';

function App() {

  const [user, setUser] = useState({})
  const [cart, setCart] = useState([]);


  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        setUser(user)

        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, [user])



  const handleAddToCart = (selectedProduct) => {
    console.log(selectedProduct);
    let newCart = [];
    const exists = cart.find(product => product.id === selectedProduct.id);
    if (!exists) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    }
    else {
      const rest = cart.filter(product => product.id !== selectedProduct.id);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }

    setCart(newCart);
    // addToDb(selectedProduct.id);
  }


  return (
    <div>

      <ToastContainer />

      <Header user={user} cart={cart} />
      <Routes>
        <Route path="/" element={<Home handleAddToCart={handleAddToCart} user={user} />} />
        <Route element={<ProtectedRoutes user={user} />}>
          <Route path="/cart" element={<Cart cart={cart} user={user} />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders user={user} />} />
          {/* <Route path="/search/:vahicle" element={<Search />} />c */}
          <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />

          <Route path="create-product" element={<CreateProduct user={user} />} />

        </Route>


        <Route path="/login" element={<Login />} />
        {/* <Route path="/signin" element={<SignIn />} /> */}
      </Routes>
    </div>
  );
}

export default App;
