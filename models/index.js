import { User } from "../api/User/User.js";
import { db } from "../config/db.js";

const initializeModel = async(req,res)=>{
    try {
        await db.sync({alter: true });
        await User.sync({ alter: true });

        res.json("Database Created Successfully");
        
    } catch (error) {
        res.status(500).json(error);
    }

}
export {initializeModel};