require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const connectDb = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');
const favicon = require('serve-favicon');
const adminRoute = require("./router/admin-router");
const blogRouter = require("./router/blog-router");
const teacherRouter = require("./router/teacher-router");
const path = require('path');

const app = express(); 
const Port = process.env.PORT || 3000;

const corsOptions = {
  origin: ['http://localhost:5173', 'https://chaintech-network-black.vercel.app','https://devbharal.vercel.app'],
  methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/api/auth', authRoute);
app.use('/api/form', contactRoute);
app.use('/api/data', serviceRoute);
app.use('/api/admin', adminRoute);
app.use('/api/teacher', teacherRouter);
app.use('/api/blogs', blogRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(errorMiddleware);

app.use((req, res, next) => {
  console.log(`404 Error - Path: ${req.path}`);
  res.status(404).json({ msg: 'Not Found' });
});

connectDb().then(() => {
  app.listen(Port, () => {
    console.log(`Server is running at port: ${Port}`);
  });
}).catch(err => {
  console.error('Failed to connect to the database', err);
});
