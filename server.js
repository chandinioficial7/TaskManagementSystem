const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

require('dotenv').config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('✅ MongoDB Connected');
})
.catch((err) => {
    console.log('❌ MongoDB Error:', err);
});

app.use('/api', authRoutes);
app.use('/api', taskRoutes);

app.get('/', (req, res) => {
    res.send('Task Management System Running');
});

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server Running on Port ${process.env.PORT}`);
});