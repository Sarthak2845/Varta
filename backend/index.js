const express = require('express');
const app = express();
const connectDB = require('./config/connectDB');
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/users.route');
const cookieParser = require('cookie-parser');
const cors = require('cors');
connectDB();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
})); 
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
