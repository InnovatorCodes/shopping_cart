import './App.css'
import Header from './components/Header'
import Slider from './components/Slider';
import Categories from './components/Categories';
import { useEffect, useState } from 'react';

import { supabase } from './components/supabaseClient';

const images = import.meta.glob('./assets/product_images/*.{jpg,jpeg,png,avif,webp}', { eager: true, query: '?url', import: 'default', });

function App() {
  const [products, setProducts]=useState({});
  const [currentPage, setCurrentPage]=useState('home');

  useEffect(() => {
    async function getAllData() {
      const { data, error } = await supabase
        .from('Luno Database')
        .select('*'); // This line pauses until the Supabase query finishes
  
      if (error) {
        console.log(error);
      } else {
        // These lines will only run AFTER the await above is done
        const sortedData = data.sort((a, b) => a.id - b.id);
        setProducts(sortedData);
      }
    }
    getAllData();
  }, []);

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

  return (
    <>
      {currentPage=='home'? <HomePage setCurrentPage={setCurrentPage}/>: <ShopPage setCurrentPage={setCurrentPage}/>}
    </>
  )
}

function ProductCards({products}){
  const [cartItems,setCartItems]=useState({items: []});
  function getQuantity(productId) {
    const found = cartItems.items.find((item) => item.id === productId);
    return found ? found.quantity : 0;
  }
  const productCards=products.map((product)=> <Card key={product.id} product={product} cartItems={cartItems} setCartItems={setCartItems} quantity={getQuantity(product.id)} />)
  return(
    <div className='products'>
      {productCards}
    </div>
  )
}

function Card({product, cartItems, setCartItems, quantity}){
  function updateCart(prodID,qty){
    let newCart= {...cartItems};
    const prodIndex = newCart.items.findIndex((p) => p.id === prodID);
    if(qty<1){
      if (prodIndex !== -1) newCart.items.splice(prodIndex, 1);
    }
    else if (prodIndex !== -1) {
      newCart.items[prodIndex].quantity = qty;
    }
    else {
      newCart.items.push({ id: prodID, quantity: qty });
    }
    setCartItems(newCart);
  }
  function getImage(imageName) {
    const entry= Object.entries(images).find(([path]) =>
      path.endsWith(`/${imageName}`)
    )
    return entry?entry[1]:undefined;
  }
  const imageSrc=getImage(product.image_file);
  const quantityCounter= (
    <div className="quantity">
      <button className="decrement" onClick={()=>updateCart(product.id,quantity-1)}>-</button>
      <div className="quantity-count">{quantity}</div>
      <button className="increment" onClick={()=>updateCart(product.id,quantity+1)}>+</button>
    </div>
  )
  return(
    <div className="product-card">
      <div className="image-container">{imageSrc && <img src={imageSrc} alt={product.name} />}</div>
      <div className="text">
        <h3>{product.name}</h3>
        <div className="product-info">
          <div className="price">&#8377;{' '}{new Intl.NumberFormat('en-IN').format(product.price)}</div>
          {quantity>0 ? quantityCounter : <button className='cart-count' onClick={()=>updateCart(product.id,1)}>Add to Cart</button>}
        </div>
      </div>
    </div>
  )
}

export default App
