import {config} from '../config/database.js';
import mysql from 'mysql2/promise'


class DatabaseService {
    #connection = null;

    async connect (){
        try{
            console.log('Attempting to connect')
            this.#connection  = await mysql.createConnection(config)
            console.log('Connected to the database')
        } catch (error){
            console.error('Error connecting to the database', error)
            
        }
        process.on('SIGINT', ()=>this.closeConnection())
        process.on('SIGTERM', ()=>this.closeConnection())


    }
    async query(queryString,params =[]){
        try{
          
        
           
            const [rows] = await this.#connection.execute(queryString,params)
            return rows
        } catch (error){
            console.error('Error executing query', error)
            throw new Error(`Database Error: ${error.message}`)
        }
    }

    async closeConnection(){
        try{
            await this.#connection.end()
            console.log('Database connection closed')
        }catch (error){
            console.error('Error closing the database connection', error.message)
            throw error
        }
    }
}



export default new DatabaseService();