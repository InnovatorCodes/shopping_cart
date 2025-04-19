import { useState } from "react";
import { supabase } from './components/supabaseClient';
import { useNavigate, useOutletContext, Link } from "react-router-dom";

export default function Login(){
  const {setUser} = useOutletContext();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [showPassword, setShowPassword]=useState(false);
  const [alert,setAlert]=useState('');
  const [touched,setTouched] =useState(false);
  const navigate=useNavigate();

  async function login(event) {
    event.preventDefault();
    if(alert==''){
      const {data,error}=await supabase
      .from('User Profiles')
      .select('*')
      .eq('email',email)
      .single()
      if(error) console.log(error);
      if(data==null) setAlert('No account found with that email')
      else if(data.password!=password) setAlert('Incorrect Password Entered');
      else if(data.password==password){
        console.log('hi')
        setUser({user_id: data.user_id, full_name: data.full_name})
        navigate('/');
      }
    }
  }
  const showPasswordBtn=(
    <svg width="800px" height="800px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.0003 5.251C7.96932 5.183 3.80032 8 1.17932 10.885C0.904199 11.1904 0.751953 11.5869 0.751953 11.998C0.751953 12.4091 0.904199 12.8056 1.17932 13.111C3.74332 15.935 7.90032 18.817 12.0003 18.748C16.1003 18.817 20.2583 15.935 22.8243 13.111C23.0994 12.8056 23.2517 12.4091 23.2517 11.998C23.2517 11.5869 23.0994 11.1904 22.8243 10.885C20.2003 8 16.0313 5.183 12.0003 5.251Z" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.75 12C15.7498 12.7416 15.5297 13.4666 15.1175 14.0831C14.7054 14.6997 14.1196 15.1802 13.4344 15.4638C12.7491 15.7475 11.9952 15.8216 11.2678 15.6768C10.5404 15.532 9.87234 15.1748 9.348 14.6503C8.82365 14.1258 8.4666 13.4576 8.32198 12.7302C8.17737 12.0028 8.25169 11.2489 8.53555 10.5637C8.81941 9.87854 9.30005 9.29293 9.91672 8.88092C10.5334 8.46891 11.2584 8.249 12 8.249C12.4926 8.24887 12.9804 8.34581 13.4355 8.53428C13.8905 8.72275 14.304 8.99906 14.6523 9.34741C15.0006 9.69576 15.2768 10.1093 15.4651 10.5645C15.6535 11.0196 15.7503 11.5074 15.75 12Z" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
  const hidePasswordBtn=(
    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.78309 20.9991L21.5323 2.99988" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.7491 8.87964C20.8636 9.69316 21.8934 10.6168 22.8229 11.6365C23.098 11.9419 23.2503 12.3384 23.2503 12.7495C23.2503 13.1605 23.098 13.557 22.8229 13.8624C20.257 16.6863 16.0992 19.5682 11.9994 19.4992C10.9829 19.5068 9.97136 19.3591 8.99963 19.0614" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.77916 16.2603C2.84594 15.5357 1.97616 14.7328 1.17927 13.8604C0.904163 13.555 0.751923 13.1585 0.751923 12.7475C0.751923 12.3364 0.904163 11.9399 1.17927 11.6345C3.80016 8.75164 7.96899 5.93275 11.9998 5.99975C12.7749 5.99106 13.548 6.07677 14.3021 6.2549" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.9994 8.99963C11.5069 8.9995 11.0192 9.09641 10.5642 9.28481C10.1092 9.47321 9.69575 9.74941 9.34752 10.0976C8.99929 10.4459 8.72308 10.8593 8.53468 11.3143C8.35077 11.7585 8.25405 12.2338 8.24966 12.7143" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.9995 16.4993C12.492 16.4993 12.9797 16.4023 13.4347 16.2138C13.8898 16.0253 14.3032 15.749 14.6514 15.4007C14.9996 15.0524 15.2758 14.6389 15.4642 14.1838C15.6495 13.7362 15.7463 13.2571 15.7493 12.7729" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
  return (
    <>
      <form action="" className='login' onSubmit={login}>
        <Link to="/"><h1>LUNO</h1></Link>
        <h2>Login Here</h2>
        <div className="email">
          <input type="email"
            name='email'
            id='email' 
            className={touched?'touched':''} 
            onChange={(event)=>{
              setEmail(event.target.value)
              setAlert('')
            }} 
            placeholder=' ' 
            required />
          <label htmlFor="email">Email</label>
        </div>
        <div className="password">
          <input type={showPassword?"text":"password"} 
            name="password" 
            id="password" 
            className={touched?'touched':''} 
            onChange={(event)=>{
              setPassword(event.target.value);
              setAlert('');
            }} 
            placeholder=' ' 
            required />
          <label htmlFor="password">Password</label>
          <div className="show-password" onClick={()=>setShowPassword(!showPassword)}>{showPassword? hidePasswordBtn : showPasswordBtn}</div>
        </div>
        <div className="alert">{alert}</div>
        <button type="submit" onClick={()=>setTouched(true)}>Log In</button>
        <p>New to Luno? <Link to="/signup"><span>Sign Up</span></Link></p>
      </form>
    </>
  )
}