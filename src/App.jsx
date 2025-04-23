import './App.css'
import loginBG from './assets/loginBG.jpg'
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './components/supabaseClient';

const images = import.meta.glob('./assets/product_images/*.{jpg,jpeg,png,avif,webp}', { eager: true, query: '?url', import: 'default', });

function App() {
  const [products, setProducts]=useState({});
  const [cart, setCart]=useState({items: []});
  const [user,setUser]=useState(null);
  const [filter,setFilter]=useState('ALL');

  if(!user){
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if(storedUser) setUser(storedUser); 
  }

  const location = useLocation();
  useEffect(()=>{
    document.body.style.backgroundImage= (location.pathname=='/login'|| location.pathname=='/signup')? `url(${loginBG})` :"";
  },[location.pathname]);

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

  useEffect(()=>{
    if(user) localStorage.setItem("user", JSON.stringify(user));
  },[user])
  
  return (
    <Outlet context={{
      user,
      setUser,
      products,
      setProducts,
      cart,
      setCart,
      filter,
      setFilter,
      images
    }}/>
  )
}



export default App
