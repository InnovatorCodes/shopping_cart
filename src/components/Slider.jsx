import phonesImg from '../assets/phones.webp'
import watchesImg from '../assets/smartwatches.png'
import audioImg from '../assets/audio.png'
import slideRight from '../assets/slideRight.svg'
import slideLeft from '../assets/slideLeft.svg'
import { useEffect, useState } from 'react'

export default function Slider({setFilter, setCurrentPage}){
  const [slideNumber,setSlideNumber]=useState(0);
  const slideContents=[
    {image: phonesImg, title: "Best Offers on Smartphones - Limited Time!", filter: "ST", desc: "Upgrade your mobile experience with incredible deals on top smartphones, featuring cutting-edge camera technology like the impressive multi-lens systems shown. Don't miss out – these offers are for a limited time only!"},
    {image: watchesImg, title: "Incredible Savings on Top Wearables", filter:"AW", desc: "Elevate your wrist game! Discover limited-time deals on our top smartwatches, packed with features to track your health, connect you to your world, and look stylish while doing it. Don't wait, these offers won't last!"},
    {image: audioImg,title: "Up to 50% Off on Headphones, Earbuds & Speakers!", filter:"AW", desc:   "Immerse yourself in premium sound. Discover deals on high-quality headphones, earbuds, and speakers for every audio need. Whether you're an audiophile, a fitness enthusiast, or a casual listener, find your perfect audio companion with crystal-clear sound and comfortable designs."}
  ]
  const totalSlides=slideContents.length;
  const slides=slideContents.map((content,index)=>{
    const filterResults=()=>{
      setFilter(content.filter);
      setCurrentPage('shop');
    }
    return (
    <div key={index} className='slide'>
      <div className="text">
        <h3>{content.title}</h3>
        <p>{content.desc}</p>
        <button onClick={filterResults}>Explore</button>
      </div>
      <div 
      className="image-container" 
      onClick={filterResults}><img src={content.image} alt="Offer Image" /></div>
    </div>
    )
  })

  useEffect(()=>{
    const timer=setInterval(()=>setSlideNumber((slideNum)=>(slideNum+1)%totalSlides), 5000);
    return ()=>clearInterval(timer);
  },[totalSlides])

  return (
    <>
      <h2>Best Deals</h2>
      <div className='slider-window'>
        <div className="slider" style={{transform: `translateX(-${slideNumber%totalSlides*100}%)`}}>{slides}</div>
        <button className="right-btn" onClick={()=>setSlideNumber((slideNum)=>(slideNum+1)%totalSlides)}><img src={slideRight} alt="" /></button>
        <button className="left-btn" onClick={()=>setSlideNumber((slideNum)=>(slideNum-1+totalSlides)%totalSlides)}><img src={slideLeft} alt="" /></button>
      </div>
    </>
  )
}