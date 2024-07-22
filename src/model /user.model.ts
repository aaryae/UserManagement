import mongoose, { Schema } from 'mongoose';
import { ROLE } from '../constant/enum';
import { Message } from '../constant/message';
import {
    emailAddressRegex,
    passwordRegex,
    phoneNumberRegex,
} from '../constant/regex';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            matches: [emailAddressRegex, Message.validEmailAddress],
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            match: [phoneNumberRegex, Message.validPhoneNumber],
        },
        password: {
            type: String,
            required: true,
            match: [passwordRegex, Message.passwordShouldStrong],
        },
        role: {
            type: String,
            enum: Object.values(ROLE),
            default: ROLE,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('Users', userSchema);
export default User;
