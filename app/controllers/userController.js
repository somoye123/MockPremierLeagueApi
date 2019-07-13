const UsersModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../../env');

const signUpUser = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await UsersModel.create(req.body);
        const response = user.toJSON();

        delete response.password;

        const token = jwt.sign({ id: user.id }, env.secret, { expiresIn: '1h' });
        res.status(200).json({
            status: "Success",
            message: "Successfully signed up",
            data: { user: response, token }
        });
    } catch (err) {
        console.log(err.code);
        if (err.code === 11000){
            res.status(409).json({
                status: "Error",
                message: "An error occurred, user already exists"
            });
        } else {
            res.status(500).json({
                status: "Error",
                message: "An error occurred while trying to sign up"
            });
        }

    }
};


const signInUser = async (req, res) => {
    try {
        const user = await UsersModel.findOne(
            { email: req.body.email },
            '+password'
        );

        if (!user)
            return res
                .status(404)
                .json({ status: "Error", message: "User not found" });

        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isPasswordValid)
            return res
                .status(401)
                .json({ status: "Error", message: "An error occurred, username or password invalid" });

        const token = jwt.sign({ id: user.id }, env.secret);
        res.json({status: "Success", message: "Sign in successfull", data: { token }});
    } catch (err) {
        res.status(500).json({ status:  "Error", message: "An error occurred, username or password invalid" });
    }
};


module.exports = {
    signUpUser,
    signInUser
};
