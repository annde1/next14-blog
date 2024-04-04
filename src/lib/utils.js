import mongoose from "mongoose";
const connection = {};
export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log(new Date());
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGO); //there was no connection so creating new one
    connection.isConnected = db.connections[0].readyState; //updating the connection object
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
