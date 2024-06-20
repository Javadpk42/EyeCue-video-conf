import { Schema, model, Document } from 'mongoose';

interface IRecording extends Document {
    userId: string;
    url: string;
    createdAt?: Date;
}

const recordingSchema = new Schema<IRecording>(
    {
        userId: {
            type: String,
        },
        url: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false }, // Only add `createdAt` timestamp
    }
);

export const Recording = model<IRecording>('Recording', recordingSchema);
