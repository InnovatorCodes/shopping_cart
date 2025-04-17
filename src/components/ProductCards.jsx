import { useState } from "react";
import Card from "./Card";

export default function ProductCards({products, initialCart, images}){
    const [cartItems,setCartItems]=useState(initialCart);
    function getQuantity(productId) {
      const found = cartItems.items.find((item) => item.id === productId);
      return found ? found.quantity : 0;
    }
    const productCards=products.map((product)=> <Card key={product.id} product={product} cartItems={cartItems} setCartItems={setCartItems} quantity={getQuantity(product.id)} images={images} />)
    return(
      <div className='products'>
        {productCards}
      </div>
    )
}
  