import React from 'react'
import MainComp from './mainComp'
import List from './list'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
    <h2 className='mainHeader'>To-Do App</h2>
    <div className="container">
    <MainComp/>
    </div>
    <List/>
    </>
  )
}

export default App