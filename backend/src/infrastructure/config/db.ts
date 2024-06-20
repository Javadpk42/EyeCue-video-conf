import mongoose from "mongoose";

const DB_STRING:string = process.env.MONGO_DB || ""
console.log('checking'+DB_STRING)
console.log('db.ts')
const connectDb = async()=>{
    try {
        await mongoose.connect(DB_STRING)
        .then((data:any)=>{
            console.log(`Database connected ${data.connection.host}`)
        })
        
    } catch (error:any) {
        console.log(error)
        // setTimeout(connectDb,5000)
        
    }
}

export default connectDb