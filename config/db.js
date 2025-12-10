const mysql = require("mysql2")

let conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"institute",
})

conn.connect((err)=>{
    if(err) console.log(err.message);
    else console.log("Connected to MySQL Database.");
})

module.exports=conn;