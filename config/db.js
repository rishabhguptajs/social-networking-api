import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the URI provided in the environment variable
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    // If the connection is successful, log a success message with the host information
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    // If there's an error during connection, log the error message
    console.error(`Error in MongoDB Connection :  ${error.message}`);
  }
}

export default connectDB;
