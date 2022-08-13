const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/education_center');
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect failure: ', error);
    }
}

module.exports = { connect };
