const AdminsModel = require('../models/adminModel');
const validation = require('../middlewares/validations');


const signUpAdmin = async (req, res) => {
    try {
        const hashedPassword = await validation.hashPassword(req.body.password);
        const adminDetails = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedPassword,
            is_admin: true
        }
        const admin = await  AdminsModel.create(adminDetails);
        const response = admin.toJSON();

        delete response.password;
        console.log(response)
        const token = validation.generateAdminToken(
            response.email,
            response._id,
            response.is_admin
        );
        res.status(200).json({
            status: "Success",
            message: "Successfully signed up as an admin",
            data: { admin: response, token }
        });
    } catch (err) {
        console.log(err);
        if (err.code === 11000){
            res.status(409).json({
                status: "Error",
                message: "An error occurred this user already exists"
            });
        } else {
            res.status(500).json({
                status: "Error",
                message: "An error occurred while signing up"
            });
        }

    }
};


const signInAdmin = async (req, res) => {
    try {
        const admin = await AdminsModel.findOne(
            { email: req.body.email, is_admin: true },
            '+password'
        );


        if (!admin)
            return res
                .status(404)
                .json({
                    status: "Error",
                    message: "Admin not found"
                });

        const isPasswordValid = await validation.comparePassword(
            admin.password,
            req.body.password
        );

        if (!isPasswordValid)
            return res
                .status(401)
                .json({
                    status: "Error",
                    message: "An error occurred"
                });
        const response = admin.toJSON();
        const token = validation.generateAdminToken(
            response.email,
            response._id,
            response.is_admin
        );
        res.json({
            status: "Success",
            message: "Successfully signed in",
            data: { token }
        });
    } catch (err) {
        res.status(500).json({ status: "Error", message: "An error occurred" });
    }
};


module.exports = {
    signUpAdmin,
    signInAdmin
};
