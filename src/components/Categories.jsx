import audioWear from '../assets/audiowear.webp'
import compAccessories from '../assets/compAcc.avif'
import phoneTab from '../assets/phonetab.png';
import gamingVR from '../assets/gamingvr.webp';
import smartHome from '../assets/smarthome.webp';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Categories({setFilter}){
  const navigate=useNavigate();
  const categories=["Audio & Wearables","Computers & Accessories","Smartphones & Tablets","Smart Home Devices","Gaming & VR"]
  const bgImages=[audioWear,compAccessories,phoneTab,smartHome,gamingVR]
  const filters=['AW','CA','ST','SHD','GVR']
  const categoryComponents=categories.map((category,index)=>
    <div 
    className="category" 
    key={index} 
    onClick={()=>{
      setFilter(filters[index]);
      navigate('/shop');
    }}>
      <div className="image-container"><img src={bgImages[index]} alt="Category" /></div>
      <div className="title"><p>{category}</p></div>
    </div>
  )
  
  return (
    <>
      <h2>Browse Categories</h2>
      <div className="categories">
        {categoryComponents}
      </div>
    </>
  )
}

Categories.propTypes={
  setFilter: PropTypes.func.isRequired,
}