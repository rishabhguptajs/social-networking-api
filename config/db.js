import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${connect.connection.host}`)
  } catch (error) {
    console.error(`Error in MongoDB Connection :  ${error.message}`)
  }
}

export default connectDB