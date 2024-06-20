import mongoose, { Document, Schema, Model } from "mongoose";
import { IAdmin } from "../../../domain/admin";

const adminSchema: Schema = new Schema<IAdmin & Document>({
    email: { type: String, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true
});

const AdminModel: Model<IAdmin & Document> = mongoose.model<IAdmin & Document>("Admin", adminSchema);

export default AdminModel;
