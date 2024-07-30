require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const connectDb = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');
const favicon = require('serve-favicon');
const path = require('path');
const app = express(); 
const Port = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Log the routes being used
app.use('/api/auth', authRoute);
app.use('/api/form', contactRoute);
app.use('/api/data', serviceRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Error handling middleware
app.use(errorMiddleware);

// Catch-all for 404 errors
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
