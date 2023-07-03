const expressAsyncHandler = require('express-async-handler')
const { generateToken } = require('../config/jwtToken.js');
const UserModel = require('../model/User.js');

const login = expressAsyncHandler(async (req, res) => {
        try {
                const { email, password } = req.body;
                const findUser = await UserModel.findOne({ email });
                if (findUser) {
                        const isPasswordMatched = await findUser.isPasswordMatched(password);
                        if (isPasswordMatched) {
                                res.status(200).json({
                                        _id: findUser._id,
                                        firstname: findUser.firstname,
                                        lastname: findUser.lastname,
                                        email: findUser.email,
                                        language: findUser.preferredLanguage,
                                        token: generateToken(findUser._id)
                                });
                        } else {
                                res.status(400).json({ message: "Password Is Incorrect" });
                        }
                } else {
                        res.status(400).json({ message: "User Does not Exist" });
                }
        } catch (error) {
                res.status(400).json({ message: "Internal Server Error" });
        }
})

const Register = expressAsyncHandler(async (req, res) => {
        try {
                const { firstName, lastName, preferredLanguage, email, password } = req.body;;
                const findUser = await UserModel.findOne({ email });
                if (!findUser) {
                        const newUser = await UserModel.create({
                                email,
                                firstname: firstName,
                                lastname: lastName,
                                preferredLanguage,
                                password
                        });
                        return res.status(200).json({
                                message: "User Created Successfully", User: {
                                        firstname: newUser.firstname,
                                        lastname: newUser.lastname,
                                        email: newUser.email,
                                        preferredLanguage: newUser.preferredLanguage,
                                }
                        });
                } else {
                        return res.status(400).json({ message: "User Already Registered" });
                }
        } catch (error) {
                return res.status(500).json({ message: 'Internal Server Error' });
        }
})

const getAllUser = expressAsyncHandler(async (req, res) => {
        try {
                const users = await UserModel.find();
                return res.status(200).json(users);
        } catch (error) {
                return res.status(500).json({ message: 'Internal server error', Error: error });
        }
})

const makeGroup = expressAsyncHandler(async (req, res) => {
        console.log('req.body', req.body)

})

module.exports = { login, Register, getAllUser, makeGroup}