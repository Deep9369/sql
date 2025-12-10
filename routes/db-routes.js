const express=require('express');
const router=express.Router()
const conn = require('../config/db');
const { name } = require('ejs');


router.get('/reg',(req,res)=>{
    res.render('register')
})
router.get('/log',(req,res)=>{
    res.render('login')
})

router.post('/login',(req,res)=>{
    const{email,pass}=req.body

    const sql="SELECT * FROM students WHERE student_email = ? AND student_password = ?"
    conn.query(sql,[mail,pass],(err,results)=>{
        if(err){
            console.log(err.message);
        }


        if(results.length>0){
            res.redirect('/api/students')
        }else{   
            res.send('invalid')
        }
    })
})

router.post('/register',(req,res)=>{
    const {name,email,pass,gen,mobile}=req.body

let sql="INSERT INTO students(student_name,student_email,student_password,student_gender,student_mobile) VALUES(?,?,?,?,?)"
conn.query(sql,[name,email,pass,gen,mobile],((err)=>{
    if(err) console.log(err.message);
    else res.redirect('/api/log')
}))
})

router.get('/students',(req,res)=>{
    const sql="SELECT student_id,student_name,student_email,student_gender,student_mobile FROM students ORDER BY student_id DESC"

    conn.query(sql,(err,rows)=>{
        if(err){
            console.log(err.message);
            return res.send("DB error"+ err.message)
            
        }
        res.render('show',{students:rows})
        
    })
})

router.get('/students/delete/:id',(req,res)=>{
    console.log(req.params)
    const {id} =req.params

    const sql="DELETE from students WHERE student_id = ?";

    conn.query(sql , [id] ,(err)=>{
        if(err)console.log(err.message);
        else res.redirect('/api/students')
        
    })
})

router.get('/students/edit/:id',(req,res)=>{
    const{id}=req.params
    const sql = "SELECT student_id,student_name,student_email,student_password,student_gender,student_mobile FROM students WHERE student_id = ?";
    conn.query(sql,[id],(err,results)=>{
        const[result]=results
        if(err)console.log(err.message)
            else res.render('update_student',{result})
    })
})

router.post('/students/update/:id',(req,res)=>{
    const{id}=req.params
    const {name,password}=req.body  
    const sql ='UPDATE students SET student_name = ?, student_password = ? WHERE student_id = ?';

    conn.query(sql,[name,password,id],(err)=>{
        if(err)console.log(err.message) 
        else res.redirect('/api/students')

})

})   



module.exports=router;