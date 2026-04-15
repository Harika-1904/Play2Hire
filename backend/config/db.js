import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();

// Fix: Override system DNS with Google DNS (8.8.8.8) so Node.js can resolve
// MongoDB Atlas SRV records (_mongodb._tcp.*). The system DNS (ISP-assigned)
// does not support SRV queries, causing querySrv ECONNREFUSED errors.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // 10s timeout for clearer error messages
      socketTimeoutMS: 45000,
    });
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
