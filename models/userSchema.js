import mongoose from 'mongoose';

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    profilePic: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isOnline: {
        type: boolean,
        default: false,
    }
}, { timestamps: true });

//Export the model
const UserModel = mongoose.model('User', userSchema);

export default UserModel;