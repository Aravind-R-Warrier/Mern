const mongoose=require('mongoose')

const connectionString=process.env.connection_string

mongoose.connect(connectionString).then(()=>{
    console.log('mongoDb Atlas Connected SuccessFully with pf-server')
}).catch((err)=>{
    console.log(err,"something wrong with mongoose")
})