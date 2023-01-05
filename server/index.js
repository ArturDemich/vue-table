import express from 'express'
import mongoose from 'mongoose'
import router from './router.js'


const port = process.env.PORT || 3020
const db = `mongodb+srv://Artur:pass963@cluster0.ebmxs1p.mongodb.net/users-table?retryWrites=true&w=majority`

const app = express()

app.use(express.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS")
    next();
});
app.use('/api', router)

async function startApp() {
    try {
        await mongoose
            .set('strictQuery', true)
            .connect(db)
            .then((res) => console.log('Connected to DB'))
            .catch((error) => console.log(error))
        app.listen(port, () => console.log(`Server start on port ${port}`))
    } catch (e) {
        console.log(e)
    }
}

startApp()