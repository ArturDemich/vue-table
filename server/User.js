import mongoose from 'mongoose';

const User = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    nextDateEvent: '',
    events: [{
        title: { type: String },
        description: { type: String },
        startDate: { type: String },
        endDate: { type: String },
    }]
})

export default mongoose.model('User', User)