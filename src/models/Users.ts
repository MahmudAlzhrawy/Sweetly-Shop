
import{ Schema, model, models } from 'mongoose';
const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        minlength: 4,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    image:{
        type: String,
        default: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
    }
}, { timestamps: true });

const User = models.User || model('User', userSchema);
export default User;
