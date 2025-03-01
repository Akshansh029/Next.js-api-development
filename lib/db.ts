import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }

  if (connectionState === 2) {
    console.log("Reconnecting...");
    return;
  }

  try {
    mongoose.connect(MONGODB_URI!, {
      dbName: "next14-mongodb-restapis",
      bufferCommands: true,
    });
  } catch (error: any) {
    console.error("Failed to connect to MongoDB", error);
    throw new Error("Error: ", error);
  }
};

export default connect;
