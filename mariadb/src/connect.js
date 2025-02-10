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
    const [result, fields] = await connection.query(
        'SELECT * FROM users WHERE username = "alice"'
    );
    console.log(result);
    console.log(fields);
}catch(e){
    console.error(e);
}

await connection.end();
console.log('Database connection closed')