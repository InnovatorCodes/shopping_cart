import PropTypes from "prop-types";
import Header from "./components/Header";
import ProductCards from "./components/ProductCards";

export default function ShopPage({products,cart,setCart, images,user,setUser,setCurrentPage,filter,setFilter}){
    const productCategories=(
      <div className="shop-categories">
        <button className={filter=='ALL'? 'selected' : ''} onClick={()=>setFilter('ALL')}>All Products</button>
        <button className={filter=='AW'? 'selected' : ''} onClick={()=>setFilter('AW')}>Audio & Wearables</button>
        <button className={filter=='CA'? 'selected' : ''} onClick={()=>setFilter('CA')}>Computers & Accessories</button>
        <button className={filter=='ST'? 'selected' : ''} onClick={()=>setFilter('ST')}>Smartphones & Tablets</button>
        <button className={filter=='SHD'? 'selected' : ''} onClick={()=>setFilter('SHD')}>Smart Home Devices</button>
        <button className={filter=='GVR'? 'selected' : ''} onClick={()=>setFilter('GVR')}>Gaming & VR</button>
      </div>
    )
    let title;
    switch (filter) {
      case 'AW':
        title='Audio & Wearables';
        break;
      case 'CA':
        title='Computers & Accessories';
        break;
      case 'ST':
        title='Smartphones & Tablets';
        break;
      case 'SHD':
        title='Smart Home Devices';
        break;
      case 'GVR':
        title='Gaming & VR';
        break;
      default:
        title='All Products'
        break;
    }
    return(
      <>
        <Header active="shop" setCurrentPage={setCurrentPage} user={user} setUser={setUser} ></Header>
        {productCategories}
        <h2>{title}</h2>
        <ProductCards products={products} cart={cart} setCart={setCart} images={images} userID={user ? user.user_id: null} setCurrentPage={setCurrentPage} filter={filter}></ProductCards>
      </>
    )
}

ShopPage.propTypes={
  products: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  images: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  filter: PropTypes.string.isRequired,
  setCart: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired
}