import './App.css'
import HomePage from './HomePage';
import ShopPage from './ShopPage';
import CartPage from './CartPage';
import OrderPlacedPage from './OrderPlacedPage';
import SignupPage from './SignupPage';
import Login from './LoginPage';
import loginBG from './assets/loginBG.jpg'
import { useEffect, useState } from 'react';
import { supabase } from './components/supabaseClient';


const images = import.meta.glob('./assets/product_images/*.{jpg,jpeg,png,avif,webp}', { eager: true, query: '?url', import: 'default', });

function App() {
  const [products, setProducts]=useState({});
  const [cart, setCart]=useState({items: []});
  const [currentPage, setCurrentPage]=useState('home');
  const [user,setUser]=useState(null);
  const [filter,setFilter]=useState('ALL');

  document.body.style.backgroundImage= (currentPage=='login'|| currentPage=='signup')? `url(${loginBG})` :"";
  useEffect(() => {
    async function getProducts() {
      const { data, error } = await supabase
        .from('Luno Database')
        .select('*'); 

      if (error) {
        console.log(error);
      } else {
        const sortedData = data.sort((a, b) => a.id - b.id);
        setProducts(sortedData);
      }
    }
    async function getInitialCart(userID){
      const {data, error} = await supabase
        .from('User Carts')
        .select('cart_items')
        .eq('user_id',userID)
        .single()
      setCart(data.cart_items);
      if(error) console.log(error)
    }
    getProducts();
    if(user) getInitialCart(user.user_id);
  }, [user]);
  
  return (
    <>
      { currentPage=='home'? <HomePage setCurrentPage={setCurrentPage} setFilter={setFilter} user={user} setUser={setUser} />: 
      ( currentPage=='shop' ? <ShopPage products={products} cart={cart} setCart={setCart} images={images} user={user} setUser={setUser} setCurrentPage={setCurrentPage} filter={filter} setFilter={setFilter}/> :   
      ( currentPage=='cart'? <CartPage cart={cart} setCart={setCart} products={products} user={user} setUser={setUser} setCurrentPage={setCurrentPage} images={images} />: 
      ( currentPage=='order placed'? <OrderPlacedPage setCurrentPage={setCurrentPage} />: 
      ( currentPage=='signup'? <SignupPage setUser={setUser} setCurrentPage={setCurrentPage}/>: <Login setUser={setUser} setCurrentPage={setCurrentPage} />) )))}
    </>
  )
}



export default App
