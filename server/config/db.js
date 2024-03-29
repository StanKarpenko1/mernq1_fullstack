const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline.bold)
    } catch (err) {
        console.error(`Fail to connect DB. Error: ${err.message}`);
    }

};  

module.exports = connectDB