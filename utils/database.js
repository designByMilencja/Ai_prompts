import mongoose from "mongoose";

require('dotenv').config();

let isConnected = false;
export const connectToDB = async () => {
    mongoose.set('strictQuery', true)
    if (isConnected) {
        console.log('Mongodb is already connected')
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true;
        console.log('Mongodb connected')
    } catch (e) {
        console.log(e)
    }
}
