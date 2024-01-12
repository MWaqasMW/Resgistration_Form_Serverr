import mongoose from "mongoose"

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Db Connected")
    } catch (err) {
        throw err
    }
}

export default connectDb