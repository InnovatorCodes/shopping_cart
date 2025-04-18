import { useState } from "react";
import Card from "./Card";

export default function ProductCards({products, cart, images, userID, loading, setCurrentPage}){
    const [cartItems,setCartItems]=useState(cart);
    function getQuantity(productId) {
      const found = cartItems.items.find((item) => item.id === productId);
      return found ? found.quantity : 0;
    }
    const loader=<span class="loader"></span>;
    const productCards=products.map((product)=> <Card key={product.id} product={product} cartItems={cartItems} setCartItems={setCartItems} quantity={getQuantity(product.id)} images={images} userID={userID} setCurrentPage={setCurrentPage}/>)
    return(
      <div className='products'>
        {loading? loader :productCards}
      </div>
    )
}
  