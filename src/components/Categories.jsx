import audioWear from '../assets/audiowear.webp'
import compAccessories from '../assets/compAcc2.avif'
import phoneTab from '../assets/phonetab3.png';
import gamingVR from '../assets/gamingvr2.webp';
import smartHome from '../assets/smarthome2.webp';

export default function Categories(){
  const categories=["Audio & Wearables","Computers & Accessories","Smartphones & Tablets","Smart Home Devices","Gaming & VR"]
  const bgImages=[audioWear,compAccessories,phoneTab,smartHome,gamingVR]
  const categoryComponents=categories.map((category,index)=>
    <div className="category" key={index}>
      <div className="image-container"><img src={bgImages[index]} alt="" /></div>
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