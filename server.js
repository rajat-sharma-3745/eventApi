import express from 'express'
import 'dotenv/config'
import eventRoutes from './routes/eventRoutes.js'
import { connectDb } from './config/db.js';
import { errorMiddleware } from './middlewares/error.js';
const app = express();
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('Welcome to event api')
})

app.use('/api/v3/app',eventRoutes)

const PORT = process.env.PORT||5000

app.use(errorMiddleware)
connectDb().then(()=>
app.listen(PORT,()=>console.log('Server running')))

