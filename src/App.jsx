import './App.css'
import Header from './components/Header'
import Slider from './components/Slider';
import Categories from './components/Categories';

import { createClient } from '@supabase/supabase-js';
import { useEffect } from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  useEffect(()=>{
    async function getAllData(){
      let { data, error } = await supabase
      .from('Luno Database')
      .select('*')     
      console.log(data,error)   
    }
    getAllData();
  },[])
  return (
    <>
      <ShopPage />
    </>
  )
}

function HomePage(){
  return (
    <>
      <Header active="home"></Header>
      <Slider></Slider>
      <Categories></Categories>
    </>
  )
}

function ShopPage(){
  return(
    <>
      <Header active="shop"></Header>
      <h2>All Products</h2>
    </>
  )
}

export default App
