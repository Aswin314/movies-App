import { isValidObjectId } from "mongoose";
 const checkid = async (req, res, next) => {

    if (!isValidObjectId(req.params.id)) {
        res.status(400).json({ message: "Invalid User ID" });
    }
    next();
}
export default checkid;