const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const TodoModel = require('./Models/Todo')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://chandu:chandu@cluster0.fenxwxa.mongodb.net/?retryWrites=true&w=majority')

app.listen(5555, () =>{
    console.log("server is running")
})

app.post('/post', (req, res)=>{
    const task = req.body.task
    TodoModel.create({
        task:task
    }).then(result=> res.json(result))
    .catch(err=>res.json(err))
})

app.get('/get', (req, res)=>{
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.put('/update/:id', (req, res)=>{
    const {id} = req.params
    TodoModel.findByIdAndUpdate({_id:id}, {done:true})
      .then(result=> res.json(result))
      .catch(err=>console.log(err))
})

app.delete('/delete/:id', (req, res)=>{
    const {id} = req.params
    TodoModel.findByIdAndDelete({_id:id})
      .then(result=> res.json(result))
      .catch(err=>console.log(err))
})