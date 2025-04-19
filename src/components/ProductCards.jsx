import Card from "./Card";

export default function ProductCards({products, cart, setCart, images, userID, setCurrentPage,filter}){
    function getQuantity(productId) {
      const found = cart.items.find((item) => item.id === productId);
      return found ? found.quantity : 0;
    }
    const loader=<span class="loader"></span>;
    const productCards=products.map((product)=>{
      let valid=false
      switch (filter) {
        case 'ALL':
          valid=true;           
          break;
        case 'AW':
          if(product.category=='audio' || product.category=='wearables') valid=true;
          break;
        case 'CA':
          if(product.category=='computers' || product.category=='accessories') valid=true;
          break;
        case 'ST':
          if(product.category=='smartphones' || product.category=='tablets') valid=true;
          break;
        case 'SHD':
          if(product.category=='smart home') valid=true;
          break;
        case 'GVR':
          if(product.category=='gaming' || product.category=='VR') valid=true;
          break;
        default:
          break;
      }
      if(valid) return <Card key={product.id} product={product} cart={cart} setCart={setCart} quantity={getQuantity(product.id)} images={images} userID={userID} setCurrentPage={setCurrentPage}/>
      return null;
    })
    return(
      <div className='products'>
        {products=={} ? loader :productCards}
      </div>
    )
}
  