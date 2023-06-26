const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(cors());
app.use(bodyparser.json());


// connect with mysql server
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fullstack',
    port: 3306
});

// check database connection
db.connect(err => {
    if(err){
        console.log(err);
    }
    console.log("Database Connection Successful!!")
})

app.get('/users', (req, res) =>{
    // console.log("All data get");

    let qrr = 'select * from users';
    db.query(qrr, (err, result) =>{

        if(err){
            console.log(err);
        }

        if(result.length > 0){
            res.send({
                message: "All Users Data : ",
                data: result
            });

        }

    });
    

});

// get single data by id
app.get('/users/:id', (req, res) => {
     let Id = req.params.id;
     let query1 = 'select * from users where id = ?';
     db.query(query1,[Id], (err, result)=>{
        if(err){
            console.log(err);
        }

        if(result.length > 0){
            res.send({
                message: "Get Data by Id : ",
                data: result
            });

        }else{
            res.send({
                message: "id not exists."
            });
        }
     });
});


// post data
app.post('/users', (req, res) =>{
    //console.log(req.body,"Post data Success");

    let uname = req.body.username;
    let uemail = req.body.email;
    let upass = req.body.password;
    let ucontact = req.body.contact;

    let query2 = 'insert into users(username, email, password,contact) values(?,?,?,?)';

    db.query(query2, [uname,uemail,upass,ucontact], (err, result) =>{

        if(err){
            console.log(err);
        }else{

            res.send({
                message: "Data Inserted Successfully."
            });

        }

    });

});


// update data

app.put('/users/:id', (req, res) =>{

    let ID = req.params.id;
    let uname = req.body.username;
    let uemail = req.body.email;
    let upass = req.body.password;
    let ucontact = req.body.contact;

    let query3 ="update users set username=?, email=?, password =?, contact=? where id=?";

    db.query(query3,[uname,uemail, upass,ucontact,ID] ,(err, result) =>{

        if(err){
            console.log(err);
        }else{

            res.send({
                message: "Data Updated Successfully."
            });

        }

    });

});

// delete data
app.delete('/users/:id', (req, res) =>{

    let ID = req.params.id;
    let query4 = 'delete from users where id=?';

    db.query(query4, [ID], (err, result) => {
        if(err){
            console.log(err);
        }else{

            res.send({
                message: "Data Deleted Successfully."
            });

        }
    });


});


app.listen(5000, () =>{
    console.log("Server is running on PORT 5000");
});