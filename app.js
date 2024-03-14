const express=require('express');
const morgan=require('morgan');



const app=new express;
app.use(morgan('dev'))
app.use(express.json())


let tasks=[];
app.get('/',(req,res)=>{
    res.json(tasks)
})
//route to create a new task
app.post('/tasks',(req,res)=>{
    tasks.push(req.body)
    res.send({message:"Task added succesfully",tasks})
})

app.put('/tasks/:id',(req,res)=>{
    const id = req.params.id;
    const updatedTask=req.body;
    const index=tasks.findIndex(task=>task.id===id)
    if(index===-1)
    {
        res.send("Task not found")
    }
    else{
        
        tasks.splice(index,1,updatedTask);
        res.send({message:"Task updated succesfully",tasks})
       
    }

   
})

app.delete('/tasks/:id',(req,res)=>{
   
    const id = req.params.id;
    const index=tasks.findIndex(task=>task.id===id)
    if(index===-1)
    {
        res.send("Task not found")
    }
    else{
        
        tasks.splice(index,1);
        res.send({message:"Deleted",tasks})
       
    }

})

app.get('/tasks/:id',(req,res)=>{
    const id = req.params.id;
    const task=tasks.find(task=>task.id===id)
    if(!task)
    {
        res.send("Task not found")
    }
    else{
        res.json(task);
    }
})

app.listen(3000,(req,res)=>{
    console.log('Server is up and running on port 3000')
})