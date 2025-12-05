import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
    let token;

    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id).select("-password");

            if (!user) {
                res.status(401);
                throw new Error("User not found");
            }

            if (!user.isActive) {
                res.status(401);
                throw new Error("Your account has been suspended by admin!");
            }

            req.user = user;
            return next();
        }

        res.status(401);
        throw new Error("Unauthorized Access, No Token Found!!");

    } catch (error) {
        res.status(401);
        throw new Error(error.message || "Unauthorized Access!");
    }
};

export default protect;
