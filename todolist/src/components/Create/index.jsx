import { useState } from 'react'
import axios from 'axios'

import './index.css'

const Create = () =>{
  const [task, setTask] = useState()

  const handleAdd = () =>{
    axios.post("http://localhost:5555/post", {task:task})
      .then(() => location.reload())
      .catch(err => console.log(err))
  }

  return(
    <div>
      <input className="input-field" type="text" onChange={(e)=>setTask(e.target.value)} placeholder="Enter a task"/>
      <button type="button" onClick={handleAdd} className="add-button">Add</button>
    </div>
  )
  }

export default Create