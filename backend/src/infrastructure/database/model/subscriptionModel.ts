// models/subscriptionModel.ts
import { Schema, model } from 'mongoose';

interface ISubscription {
    amount: number;
}

const subscriptionSchema = new Schema<ISubscription>({
    amount: {
        type: Number,
        required: true,
    },
});

export const Subscription = model<ISubscription>('Subscription', subscriptionSchema);
