// import express from "express";
// import dotenv from "dotenv";
// import authRoutes from "./routes/auth.routes.js";
// import messageRoutes from "./routes/message.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import movieRoutes from "./routes/list.routes.js";
// import connectToMongoDB from "./db/ConnectToMongoDB.js";
// import cookieParser from 'cookie-parser';
// import cors from 'cors'
// const app = express()

// const PORT = process.env.PORT || 3000
// dotenv.config();

// // app.get("/", (req, res) =>{
// //      res.send("Hello World!");
// // });


// //Middleware
// app.use(cors())
// app.use(express.json()); //parse json body
// app.use(cookieParser()); //parse cookies

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes)
// app.use("/api/users", userRoutes)
// app.use("/api/", movieRoutes)




// app.listen(PORT, () => {
// connectToMongoDB();
// console.log(`Server running on port  ${PORT}`)})

import express from "express";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import movieRoutes from "./routes/list.routes.js";
import connectToMongoDB from "./db/ConnectToMongoDB.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // parse json body
app.use(cookieParser()); // parse cookies

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/", movieRoutes);

// Serve static files from the 'dist' directory
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
