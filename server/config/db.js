const mongoose = require('mongoose'); // Make sure 'mongoose' is required

mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL); // Removed deprecated options
        console.log('Database Connected: ' + conn.connection.host);
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

module.exports = connectDB;
