import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'maria',
        port : '3305',
    }
);
try{
    const sql = 'SELECT * FROM users WHERE `username` = ?';
    const args =[ "alice"]
    const [results] = await connection.execute(sql , args);
    console.log(results);
  
}catch(e){
    console.error(e);
}

await connection.end();
console.log('Database connection closed')