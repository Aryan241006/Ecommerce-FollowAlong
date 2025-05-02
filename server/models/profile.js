const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Keep ObjectId
    profileUrl: { type: String, required: true },
    addresses: [{
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    }]
});

module.exports = mongoose.model('Profile', profileSchema);
