const express = require('express');
const connectDB = require('./config/connectDB');
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/users.route');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {initSocket}=require('./config/socket')
const chatRoutes = require('./routes/chat.routes');

const app = express();
const http=require('http');
const server=http.createServer(app);
initSocket(server);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
})); 

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
