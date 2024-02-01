const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const registerUser = async (userData) => {
    try {
         
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error("Email already exists");
        }

        const newUser  = new User(userData);
        await newUser.save();
        console.log(newUser,"Data Save successfully");

        return newUser;
    } catch (error) {
        throw error;
        
    }
};

const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if(!user){
            throw new Error("Invalid email or password");
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            throw new Error("Invalid email or password");

        }
        
        const token = user.generateAuthToken();
        console.log('Generated Token:', token);
        console.log("login Successfully");
        return { user, token };

    } catch (error) {
        throw error;
        
    }
};



module.exports = { registerUser, loginUser};

