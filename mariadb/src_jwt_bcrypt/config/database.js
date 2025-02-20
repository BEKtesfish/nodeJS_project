export const config ={
    host: process.env.DATABASE_HOST,
    user: process.env.USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port : process.env.DATABASE_PORT || 3305
}