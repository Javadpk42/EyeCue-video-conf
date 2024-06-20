import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// import { adminAdapter } from './injection/adminInjection';

const router = express.Router();
import  Admin  from '../database/model/adminModel';

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    // adminAdapter.loginAdmin(req, res, next);
    try {
        console.log('admin login entered')
        const { email, password } = req.body;
        const admin = await Admin.findOne();
        console.log(admin)
        if (admin&&email === admin.email && password === admin.password) {
          const token = jwt.sign(
            { id: password, email: email },
            "jwtsecret",
            { expiresIn: '1h' }
          );
    
          return res.status(200).json({ success: true, token });
        }
    
        return res.status(401).json({ success: false, message: 'Invalid credentials'});
      } catch (error) {
        next(error);
      }
});
import Payment from "../../infrastructure/database/model/paymentModel";

router.get('/payments', async (req, res) => {
    try {
        // Fetch payment data from MongoDB
        console.log('ad pay call')
        const payments = await Payment.find();

        // Send payment data as response
        res.json(payments);
    } catch (error) {
        console.error('Error fetching payment data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
import { Subscription } from '../database/model/subscriptionModel';

router.get('/subscriptions', async (req, res) => {
  try {
      const subscriptions = await Subscription.find().sort({ createdAt: -1 });
      res.json(subscriptions);
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new subscription and remove the old one
router.post('/subscriptions', async (req, res) => {
  try {
      const { amount } = req.body;

      // Delete all existing subscriptions
      await Subscription.deleteMany({});

      // Create a new subscription
      const newSubscription = new Subscription({ amount });
      await newSubscription.save();

      res.status(201).json(newSubscription);
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
export default router;
