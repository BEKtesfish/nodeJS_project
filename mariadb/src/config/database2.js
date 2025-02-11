/**
 * A centralized module for managing a single MySQL  database connection
 * Provides methods to initialize, retrieve and close the connection
 */
import mysql from 'mysql2/promise';

let connection = null; // stores the connection instance

/**
 * Initializes the database connection if not already initialized
 * @returns {Promise<mysql.Connection>} The active database connection
 */
const intializeConnection = async () => {
    if(!connection){
        connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE,
            port : process.env.DATABASE_PORT || 3305
        });
        console.log('Database connected.');
    }
    return connection;
};

/**
 * Retrieves the active database connection. If not initialized, it will call 'intializeConnection'
 * @returns {Promise<mysql.connection>} The active database connection
 */
const getConnection = async ()=>{
    if(!connection){
        connection = await intializeConnection();
    }
    return connection;
}

/**
 * Closes the active database connection
 * @returns {Promise<void>} A promise that resolves when the connection is closed
 */
const closeConnection = async () => {
    if(connection){
        await connection.end();
        connection = null;
        console.log('Database connection closed.');
        
    }
}


/**
 * The exported 'db' objet, containing methods to manage the database connection.
 * @property {Function} initialize - Initialize the database connection.
 * @property {Function} getConnection - Retrives the active database connection
 * @property {Function} close - Closes the active database connection
 */
const db = {
    initialize:intializeConnection,
    getConnection,
    close:closeConnection,

}
export default db;