import {app} from './src/express.js'
const port = process.env.PORT || 3000

app.listen(port,()=>{
  console.log(`listening on http://localhost:${port}`)
})