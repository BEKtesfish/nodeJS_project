import db from '../config/database.js';

const con = await db.initialize();

const sql = 'SELECT * FROM users WHERE `username` = ?';
const args =[ "alice"]
const [results] = await con.execute(sql , args);

console.log(results);
await db.close();