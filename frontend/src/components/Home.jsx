import React, { useContext } from 'react'
import Navbar from './Navbar'
import { AppContext } from '../context/AppContext'

const Home = () => {
    const {token} = useContext(AppContext)
    console.log('token from home',token)
  return  token && (
    <div>
      <Navbar/>
    </div>
  )
}

export default Home
