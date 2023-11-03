const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connect;