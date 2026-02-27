const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');


app.use(bodyParser.json())

const port = 8000;
const initMySQL = async()=>{
    conn = await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'webdb',
        port:8700
    });
    console.log('Connected to MySQL database');
}
//path: GET / users สำหรับดึงข้อมูล users ทั้งหมด
app.get('/users', async (req, res)=>{
    const results = await conn.query('SELECT * FROM users');
    res.json(results[0]);
})
//path: = POST /users สำหรับเพิ่ม user ใหม่
app.post('/users', async (req, res)=>{
    try{
        let user = req.body;
        const results = await conn.query('INSERT INTO users SET ?',user);
        console.log('results:',results)
        res.json({
            message: 'User added successfully',
            data: results[0]
        });
    }catch(error){
        console.error('Eror inserting user:',error);
        res.status(500).json({message: 'Error adding user'});
    }
})
//path: = GET /users/:id สำหรับดึงข้อมูล user ตาม id
app.get('/users/:id',async(req,res)=>{
        try{
            let id = req.params.id;
            const results = await conn.query('SELECT * FROM users WHERE id = ?', id);
            if(results[0].length === 0){
                throw { statusCode: 404, message: 'User not found'};
            }
            res.json(results[0][0])
        }catch(error){
            console.json('Error connecting to the database:',err);
            let statusCode = error.statusCode || 500;
            res.status(statusCode).json({
                message: error.message || 'Error fetching user'
            })
        }
    })

app.put('/users/:id',async (req,res)=>{
    try{
        let id = req.params.id;
        let updateUser = req.body;
        const results = await conn.query
        res.json({
            message: 'Update successfully',
            data: result[0]
        });
    }catch (error){
        console.error('Error updating user:', err);
        res.status(500),json({ error: 'Error updating user'});
    }
})
app.delete('/users/:id',async (req,res)=>{
    try{
        let id = req.params.id;
        const results = await conn.query('DELETE FROM users WHERE id = ?',id);
        res.json({
            message: 'Deleting successfully',
            data: results[0]
        });
    }catch (error){
        console.error('Error deleting user:', err);
        res.status(500),json({ error: 'Error deleting user'});
    }
})
/**app.get('/testdb-new', async (req, res) => {
    try {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'webdb',
            port: 8700
        });
        const results = await conn.query('SELECT * FROM users');
        res.json(results[0]);
    } catch (err) {
        console.json('Error connecting to the database:',err);
        res.status(500).json({error:'Internal Server Error'});
    }

})
/**let users = [];
let counter = 1;
/
Get /users - ดึงข้อมูลผุ้ใช้ทั้้งหมด
POST /users - เพื่มผู้ใช้ใหม่
GET /users/:id - ดึงข้อมูลผุ้ใช้งาน
PUT /users/:id - เเก้ไขข้อมูลใช่ตาม ID
DELETE /users/:id - ลบผุ้ใช้ตาม ID ที่บันทึก
 

app.get('/users', (req, res)=>{
    res.json(users);
});

app.post('/user', (req, res)=>{
    let user = req.body;
    user.id = counter
    counter +=1;
    users.push(user);
    res.json({
    message: 'User added successfully',
    user: user
    });
});

app.patch('/user/:id', (req, res)=>{
    let id =  req.params.id;
    let updateUser = req.body;

    // หา user ที่จาก id ที่ส่งมา
    let selectindex = users.findIndex(user => user.id == id);
    
    //update ข้อมูล user
    if(updateUser.firstname){
        users[selectindex].firstname = updateUser.firstname;
    }
    if(updateUser.lastname){
        users[selectindex].lastname = updateUser.lastname;
    }

    res.json({
        message: 'User update successfully!',
        data:{
            user: updateUser,
            indexUpdate: selectindex
        }
    })
    //ส่งตัว users ที่ update แล้วกลับไป
});

app.delete('/users/:id', (req, res)=>{
    let id = req.params.id;

    // หา index จาก id ที่ต้องการลบ
    let selectIndex = users.findIndex(user => user.id == id);

    users.splice(selectIndex, 1)
    //ลบ user ออกจาก users
    res.json({
        message: 'User deleted successfully!',
        indexDelete: selectIndex
    });
});*/

app.listen(port, async() => {
    await initMySQL();
    console.log(`Sever is running on http://localhost:${port}`)
});
