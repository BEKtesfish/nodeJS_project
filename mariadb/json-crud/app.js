import { app } from './src/express.js'
import databaseService from './src/service/DatabaseService.js'


// Connect to the database
console.log('Connecting to database')
await databaseService.connect()


console.log('Database connected')

// Start the express server
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
