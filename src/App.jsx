import './App.css'
import Header from './components/Header'
import Slider from './components/Slider';
import Categories from './components/Categories';
import Login from './components/Login';
import ProductCards from './components/ProductCards';
import { useEffect, useState } from 'react';

import { supabase } from './components/supabaseClient';

const images = import.meta.glob('./assets/product_images/*.{jpg,jpeg,png,avif,webp}', { eager: true, query: '?url', import: 'default', });

function App() {
  const [products, setProducts]=useState({});
  const [initialCart, setInitialCart]=useState({items: []});
  const [currentPage, setCurrentPage]=useState('home');
  const [loggedIn,setLoggedIn]=useState(false)
  const [user,setUser]=useState(null);

  useEffect(() => {
    async function getAllData() {
      const { data, alert } = await supabase
        .from('Luno Database')
        .select('*'); // This line pauses until the Supabase query finishes
  
      if (alert) {
        console.log(alert);
      } else {
        // These lines will only run AFTER the await above is done
        const sortedData = data.sort((a, b) => a.id - b.id);
        setProducts(sortedData);
      }
    }
    async function getInitialCart(){
      const {data, alert} = await supabase
        .from('User Carts')
        .select('cart_items')
        .eq('user_id',1)
        .single()
      setInitialCart(data.cart_items);
      if(alert) console.log(alert)
    }
    getAllData();
    getInitialCart();
  }, []);

  function HomePage(){
    return (
      <>
        <Header active="home" setCurrentPage={setCurrentPage} loggedIn={loggedIn}></Header>
        <Slider></Slider>
        <Categories></Categories>
      </>
    )
  }

  function ShopPage(){
    return(
      <>
        <Header active="shop" setCurrentPage={setCurrentPage} loggedIn={loggedIn} ></Header>
        <h2>All Products</h2>
        <ProductCards products={products} initialCart={initialCart} images={images}></ProductCards>
      </>
    )
  }

  return (
    <>
      {currentPage=='home'? <HomePage setCurrentPage={setCurrentPage}/>: ( currentPage=='shop' ? <ShopPage setCurrentPage={setCurrentPage}/> : <Login setLoggedIn={setLoggedIn} setUser={setUser} setCurrentPage={setCurrentPage} />)}
    </>
  )
}



export default App
