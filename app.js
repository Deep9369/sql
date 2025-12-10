const express = require('express');
const app =express()
const router = require('./routes/db-routes');



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs");
app.use('/api',router)

const port=3001
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})