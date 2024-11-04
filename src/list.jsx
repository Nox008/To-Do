import React from 'react'
import './list.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

function List() {
    const [todolist,setTodolist] = useState([])
    useEffect(()=>{
        const url = "http://localhost:5000/api/gettodolist"
        axios.get(url)
       .then((res)=>{
          setTodolist(res.data)
       })
       .catch(err=>console.log(err))
    })
    const deleteList = (id) =>{
    const ans = window.confirm('Are you sure you want to delete?')
    
    const url = `http://localhost:5000/api/delTodolist/${id}`
    if(ans){
    axios.delete(url)
    .then((res)=>{
      alert(res.data)
    })
    
  }else {alert('Action Cancelled')}

    }
  return (
    <>
<div className="container1">
  <div className="row">
    <div className="col">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Task Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todolist.length > 0 ? (
            todolist.map((list) => (
              <tr key={list._id}>
                <td>{list.hobbie}</td>
                <td>{list.desc}</td>
                <td>{list.date}</td>
                <td>
                  <button className='deleteButton' style={{padding:'10px'}} onClick={()=>{
                    deleteList(list._id)
                  }}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No Data Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>
    </>
  )
}

export default List