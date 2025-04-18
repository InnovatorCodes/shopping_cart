import './App.css'
import Header from './components/Header'
import Slider from './components/Slider';
import Categories from './components/Categories';
import Login from './components/Login';
import ProductCards from './components/ProductCards';
import loginBG from './assets/loginBG.jpg'
import { useEffect, useState } from 'react';
import { supabase } from './components/supabaseClient';

const images = import.meta.glob('./assets/product_images/*.{jpg,jpeg,png,avif,webp}', { eager: true, query: '?url', import: 'default', });

function App() {
  const [products, setProducts]=useState({});
  const [cart, setCart]=useState({items: []});
  const [currentPage, setCurrentPage]=useState('home');
  const [loggedIn,setLoggedIn]=useState(false)
  const [user,setUser]=useState(null);
  const [loading, setLoading]=useState(false);

  document.body.style.backgroundImage= (currentPage=='login')? `url(${loginBG})` :"";
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
      setLoading(false);
    }
    async function getInitialCart(){
      const {data, alert} = await supabase
        .from('User Carts')
        .select('cart_items')
        .eq('user_id',1)
        .single()
      setCart(data.cart_items);
      if(alert) console.log(alert)
    }
    setLoading(true);
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
    console.log(loggedIn)
    return(
      <>
        <Header active="shop" setCurrentPage={setCurrentPage} loggedIn={loggedIn} ></Header>
        <h2>All Products</h2>
        <ProductCards products={products} cart={cart} images={images} userID={loggedIn? user.user_id: null} loading={loading} setCurrentPage={setCurrentPage}></ProductCards>
      </>
    )
  }
  
  function Cart({images}){
    return(
      <div className='cart-page'>
        <Header active="cart" setCurrentPage={setCurrentPage} loggedIn={loggedIn}></Header>
        <h2>My Cart</h2>
        <CartSummary cart={cart} products={products} images={images} />
      </div>
    )
    function CartSummary({cart,products, images}){
      let subTotal=0;
      const itemCards=cart.items.map((cartItem)=>{
        let product=products[cartItem.id-1]
        const quantityCounter= (
          <div className="quantity">
              <button className="decrement" >-</button>
              <div className="quantity-count">{cartItem.quantity}</div>
              <button className="increment" >+</button>
          </div>
        )
        const total=cartItem.quantity*product.price;
        subTotal+=total;
        return(
          <div className="cart-item" key={cartItem.id}>
            <img src={getImage(product.image_file)} alt="" />
            <h3>{product.name}</h3>
            {quantityCounter}
            <div className="price">&#8377;{' '}{new Intl.NumberFormat('en-IN').format(product.price)}</div>
            <div className="total">&#8377;{' '}{new Intl.NumberFormat('en-IN').format(total)}</div>
          </div>
        )
        function getImage(imageName) {
          const entry= Object.entries(images).find(([path]) =>
              path.endsWith(`/${imageName}`)
          )
          return entry?entry[1]:undefined;
        }
      })
      return(
        <div className='cart-summary'>
          <div className="cart-items">
            <div className="heading">
              <h3 className="product">Product</h3>
              <h3 className="quantity">Quantity</h3>
              <h3 className="price">Price</h3>
              <h3 className="total">Total</h3>
            </div>
            {itemCards}
            </div>
          <div className="order-summary">
            <div className="subtotal"><p>Subtotal</p><p>&#8377;{' '}{new Intl.NumberFormat('en-IN').format(subTotal)}</p></div>
            <div className="shipping-charge"><p>Shipping Charges</p><p>&#8377;{' '}{new Intl.NumberFormat('en-IN').format(100)}</p></div>
            <hr />
            <div className="total"><p>Total</p><p>&#8377;{' '}{new Intl.NumberFormat('en-IN').format(subTotal+100)}</p></div>
          </div>
        </div>
      )
    }
  }

  return (
    <>
      {currentPage=='home'? <HomePage setCurrentPage={setCurrentPage}/>: 
      ( currentPage=='shop' ? <ShopPage setCurrentPage={setCurrentPage}/> : ( currentPage=='cart'? <Cart images={images} />: <Login setLoggedIn={setLoggedIn} setUser={setUser} setCurrentPage={setCurrentPage} />))}
    </>
  )
}



export default App
