import React from 'react'
import Navbar from './components/Navbar'
import CreateHisaab from './components/CreateHisaab'
import Register from './components/Register'

const App = () => {
  return (
    <div>
      
      <Navbar  loggedin={true} showError={false}/>
      <Register/>
      {/* <CreateHisaab/> */}
    </div>
  )
}

export default App
