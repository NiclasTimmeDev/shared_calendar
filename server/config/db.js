const mongoose = require("mongoose");
const config = require("./config");

const dbCredential = config.mongoURI;
console.log(dbCredential);
const connectDB = async () => {
  try {
    await mongoose.connect(dbCredential, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Database connected");
  } catch (error) {
    console.log(error.message);
    console.error("Database connection failed");
    process.exit(1);
  }
};

connectDB();
