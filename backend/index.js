//Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
require('dotenv').config()
//express initialising server
const express=require('express')
//cors for maintain outside reqs
const cors=require('cors')
// router import
const router=require('./Route/route')
// mongoDb mongoose connecting to server
require('./Db/connection')
const pfServer=express()

pfServer.use(cors())
// middleware
pfServer.use(express.json())
//router using
pfServer.use(router)
// static method for display image in frontend
pfServer.use('/uploads',express.static('./uploads'))

const PORT=3000

pfServer.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`)
})

pfServer.get('/',(request,response)=>{
    response.send('<h1>helooooooo all ready to run </h1>')
})