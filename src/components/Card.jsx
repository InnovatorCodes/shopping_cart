import { supabase } from "./supabaseClient";

export default function Card({product, cart, setCart, quantity, images, userID, setCurrentPage}){
    async function updateCart(prodID,qty){
        if(userID){
            let newCart= {...cart};
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
            setCart(newCart);
            const { error } = await supabase
            .from('User Carts')
            .upsert(
                { user_id: userID, cart_items: newCart },
                { onConflict: ['user_id'] }
            );
            if(error) console.log(error)
        }
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
                {quantity>0 ?
                 quantityCounter: 
                 <button
                  className='cart-count' 
                  onClick={()=>{
                    if(!userID) setCurrentPage('login');
                    else updateCart(product.id,1)
                  }}>
                    Add to Cart
                 </button>}
            </div>
            </div>
        </div>
    )
}