require("dotenv").config();
const express = require('express');
const app = express(); 
const Port = process.env.PORT || 3000;
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require('cors');

// Middleware
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
  };
  
  app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);

// Error handling middleware
app.use(errorMiddleware);

// Catch-all for 404 errors
app.use((req, res, next) => {
    res.status(404).json({ msg: "Not Found" });
});

connectDb().then(() => {
    app.listen(Port, () => {
        console.log(`Server is running at port: ${Port}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database', err);
});
