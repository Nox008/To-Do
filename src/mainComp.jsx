import React from 'react'
import './mainComp.css'
import { useState } from 'react';
import axios from 'axios';

const MainComp = () => {
    const [hobbie, setHobbie] = useState('');
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/api/hobbies', {
            hobbie,
            desc,
            date,
          });
          alert('Data Sent Sucessfully')
          console.log('Data sent:', response.data);
        } catch (error) {
          console.error('Error sending data:', error);
        }
      };
  return (
    <>
    <input type="text" className='hobbie' placeholder='Enter a Hobbie' value={hobbie} onChange={(e) => setHobbie(e.target.value)} />
    <input type="text" className='desc' placeholder='Enter the description for the hobbie' value={desc} onChange={(e) => setDesc(e.target.value)} />
    <label>Date:</label>
    <input type="date" className='date' value={date} onChange={(e) => setDate(e.target.value)} />
    <button type='submit' className='submitButton' onClick={handleSubmit}>Submit</button>
    </>
  )
}

export default MainComp