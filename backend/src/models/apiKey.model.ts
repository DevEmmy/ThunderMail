import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User", unique: true}
})

const ApiKey = mongoose.model("ApiKey", schema);
export default ApiKey