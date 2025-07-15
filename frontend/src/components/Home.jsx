import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import { AppContext } from '../context/AppContext'

const Home = () => {
    const {token,setToken} = useContext(AppContext)
    console.log('token from home',token)
    useEffect(() => {
        const localToken = localStorage.getItem("token");
        if (localToken && !token) {
          setToken(localToken);
        }
      }, [token]);
  return  token && (
    <div>
      {/* <Navbar/> */}
      <h1 className=''>hissabs</h1>
    </div>
  )
}

export default Home
