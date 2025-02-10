import db from './config/database.js';
console.log( "hello "+process.env.DATABASE_PASSWORD)

const con = await db.initialize();

const sql = 'SELECT * FROM users';
const args =[]
const [results] = await con.execute(sql , args);

console.table(results);
await db.close();