const express = require("express")

const cors = require("cors")

const helmet = require("helmet")

const app = express()

const PORT = process.env.PORT || 3000

const mongoose = require("mongoose")


const route = require("./routes/index")

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(express.urlencoded({
    extended: true
}))

mongoose.connect("mongodb://localhost/auth-service",{
    useNewUrlParser: true,
    useUnifiedTopology: true
},()=>{
    console.log(`Auth service connected`)
})


route(app)
app.listen(PORT ,()=>{
    console.log(`Server is running port ${PORT}`)
})
