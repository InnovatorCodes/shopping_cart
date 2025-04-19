import cartSVG from '../assets/cart.svg';
import userSVG from '../assets/userProfile.svg'
import PropTypes from 'prop-types';

export default function Header({active,setCurrentPage,user,setUser}){
  const loginBtn=(
    <button className="login-btn" onClick={()=>setCurrentPage('login')}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
        <path d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12H14.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12.65 8.6499L16 11.9999L12.65 15.3499" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"strokeLinejoin="round" />
      </svg>
      Login
    </button>
  )
  const logoutBtn=(
    <button 
    className="logout-btn" 
    onClick={()=>{
      setUser(null)
    }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M15 12H3.62" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M5.85 8.6499L2.5 11.9999L5.85 15.3499" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </g>
      </svg>
      Logout
    </button>
  )
  return (
    <div className='header'>
      <h1>LUNO</h1>
      <div className="links">
        <div className={`link home ${active=='home'?'active':''}`} onClick={()=>{active!='home'? setCurrentPage('home'): null}}>Home</div>
        <div className={`link shop ${active=='shop'?'active':''}`} onClick={()=>{active!='shop'? setCurrentPage('shop'): null}}>Shop</div>
      </div>
      <div className="buttons">
        <button 
        className="cart" 
        onClick={
          user ? ()=>setCurrentPage('cart') : ()=>setCurrentPage('login')
        }>
          <img src={cartSVG} alt="cart" />
        </button>
        {user? 
        <div className='user'>
          <img src={userSVG} alt="User Profile" />
          <div className="profile-dropdown">
            <h2>Welcome, </h2>
            <h3>{user.full_name}</h3>
            {logoutBtn}
          </div>
        </div> :loginBtn}
      </div>
    </div>
  )
}

Header.propTypes={
  active: PropTypes.oneOf(['home','shop']).isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired
}