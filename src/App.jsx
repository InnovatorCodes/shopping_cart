import './App.css'
import Header from './components/Header'
import Slider from './components/Slider';
import Categories from './components/Categories';
import { useEffect, useState } from 'react';

import { supabase } from './components/supabaseClient';

function App() {
  const [products, setProducts]=useState({});
  const [currentPage, setCurrentPage]=useState('home');

  useEffect(()=>{
    async function getAllData(){
      let { data, error } = await supabase
      .from('Luno Database')
      .select('*')  
      data=data.sort((a,b)=>a.id-b.id);   
      setProducts(data)
      if(error) console.log(error);   
    }
    getAllData();
  },[])

  function HomePage(){
    return (
      <>
        <Header active="home" setCurrentPage={setCurrentPage}></Header>
        <Slider></Slider>
        <Categories></Categories>
      </>
    )
  }

  function ShopPage(){
    return(
      <>
        <Header active="shop" setCurrentPage={setCurrentPage}></Header>
        <h2>All Products</h2>
        <ProductCards products={products}></ProductCards>
      </>
    )
  }
  
  function ProductCards({products}){
    const productCards=products.map((product)=> <Card key={product.id} product={product}/>)
    function Card({product}){
      return(
        <div className="product-card">
          <h3>{product.name}</h3>
          <div className="price">{product.price}</div>
        </div>
      )
    }
    return(
      <div className='products'>
        {productCards}
      </div>
    )
  }

  return (
    <>
      {currentPage=='home'? <HomePage setCurrentPage={setCurrentPage}/>: <ShopPage setCurrentPage={setCurrentPage}/>}
    </>
  )
}

export default App
