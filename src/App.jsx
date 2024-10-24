import React from 'react'
import MainComp from './mainComp'
import List from './list'

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