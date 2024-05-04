import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../../util/generateToken.js";
import { User } from "../User/User.js";


const registerUser = async (
    name,
    phone_number,
    email,
    password,
    gender,
    account_type
) => {
    try{
        const user = await User.create({
            name,
            phone_number,
            email,
            password,
            gender,
            account_type
        });
        
        var userInfo ={
            id: user.id,
            name: user.name,
            phone_number: user.phone_number,
            email: user.email,
            password: user.password,
            account_type: user.account_type,
            token: generateToken(user.id)
        };
        return userInfo;
    }
    catch (error) {}
};

const loginUser = asyncHandler(async (email, password) => {
    const user = await User.findOne({ where: {email} });

    if(!user) {
        throw Error("Invalid email")
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if(!validatePassword) {
        throw Error("Invalid Password")
    }
    const userInfo = {
            id: user.id,
            name: user.name,
            phone_number: user.phone_number,
            email: user.email,
            account_type: user.account_type,
            token: generateToken(user.id)
        };
    return userInfo;
});

export {registerUser, loginUser};