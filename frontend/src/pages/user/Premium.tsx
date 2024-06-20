// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { makePayment } from '../../api/userApi';

// import { useSelector } from 'react-redux';
// import { loadStripe, Stripe } from "@stripe/stripe-js";
// import signup from "../../assets/new_c50.75db54ff.png";
// import { Link, useLocation } from 'react-router-dom';
// import { Button } from 'flowbite-react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const publicStripeKey = import.meta.env.VITE_PUBLIC_STRIPE_KEY;

// const Premium = () => {
//     const currentUser = useSelector((state) => state.user.currentUser);
//     const location = useLocation();

//     useEffect(() => {
//         const query = new URLSearchParams(location.search);
//         const paymentStatus = query.get('payment');

//         if (paymentStatus === 'success') {
//             toast.success('Payment successful! You have been upgraded to premium.');
//         } else if (paymentStatus === 'cancel') {
//             toast.error('Payment cancelled. Please try again.');
//         }
//     }, [location]);

//     const handlePurchase = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
    
//         const stripe: Stripe | null = await loadStripe(publicStripeKey);
    
//         const userId = currentUser?.data._id;
//         const email = currentUser?.data.email;
//         const amount = 2000;
    
//         try {
//             const sessionId = await makePayment(amount, email, userId);
//             console.log(sessionId.data)
//             if (stripe) {
//                 stripe.redirectToCheckout({
//                     sessionId: sessionId.data,
//                 });
//             } else {
//                 console.error('Failed to initialize Stripe');
//                 // Handle the error appropriately
//             }
            
//         } catch (error) {
//             console.error('Payment failed:', error);
//         }
//     };
    

//     return (
//         <div className='h-screen'>
//             <div className='border-b-2 py-4'>
//                 <div className="container mx-auto flex justify-between items-center">
//                     <Link to='/user' className='text-3xl font-bold tracking-tight text-custom'>
//                         EyeCue
//                     </Link>
//                 </div>
//             </div>

//             <div className="flex flex-col md:flex-row">
//                 <div className="w-1/4 flex justify-center items-center">
//                     <img src={signup} alt="" className='ml-40 mt-36' />
//                 </div>

//                 <div className="w-full flex justify-center items-center">
//                     <div className="landingMainDiv w-full lg:w-3/4 xl:w-2/3 flex justify-end mt-36">
//                         <div className="flex flex-col items-center w-full lg:w-2/3 p-9 mb-8 lg:mb-0 shadow-lg rounded-lg bg-white">
//                             <div className="mb-4">
//                                 <div className="py-3 flex">
//                                     <h3 className='font-bold'>Do more with EyeCue Pro</h3>
//                                 </div>
//                                 <div className="py-3 flex">
//                                     <span className="pr-3">&bull;</span>
//                                     <p>Get A Verified Badge with name</p>
//                                 </div>
//                                 <div className="flex py-3">
//                                     <span className="pr-3">&bull;</span>
//                                     <p>Easily capture your interview with our video recording feature.</p>
//                                 </div>
//                                 <div className="flex py-3">
//                                     <span className="pr-3">&bull;</span>
//                                     <p>Enjoy the freedom of limitless video storage in the cloud</p>
//                                 </div>
//                             </div>
//                             <form onSubmit={handlePurchase} className="w-full">
//                                 <Button type="submit" className="w-full font-semibold bg-custom hover:font-bold">Upgrade to Pro</Button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default Premium;



import React, { useEffect } from 'react';
import axios from 'axios';
import { makePayment } from '../../api/userApi';

import { useSelector } from 'react-redux';
import { loadStripe, Stripe } from "@stripe/stripe-js";
import signup from "../../assets/new_c50.75db54ff.png";
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const publicStripeKey = import.meta.env.VITE_PUBLIC_STRIPE_KEY;

const Premium = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const paymentStatus = query.get('payment');

        if (paymentStatus === 'success') {
            toast.success('Payment successful! You have been upgraded to premium.');
        } else if (paymentStatus === 'cancel') {
            toast.error('Payment cancelled. Please try again.');
        }
    }, [location]);
    let amount
        useEffect(() => {
            const fetchSubscriptionAmount = async () => {
                try {
                    const response = await axios.get('http://localhost:3000/api/admin/subscriptions');
                    console.log(response)
                    amount=response.data[0].amount// Assuming the API response is an object with an amount property
                } catch (error) {
                    setError('Error fetching subscription amount');
                    setLoading(false);
                }
            };
    
            fetchSubscriptionAmount();
        }, []);

    const handlePurchase = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const stripe: Stripe | null = await loadStripe(publicStripeKey);
    
        const userId = currentUser?.data._id;
        const email = currentUser?.data.email;
        
        
        try {
            const sessionId = await makePayment(amount, email, userId);
            console.log(sessionId.data)
            if (stripe) {
                stripe.redirectToCheckout({
                    sessionId: sessionId.data,
                });
            } else {
                console.error('Failed to initialize Stripe');
                // Handle the error appropriately
            }
            
        } catch (error) {
            console.error('Payment failed:', error);
        }
    };
    

    return (
        <div className='h-screen'>
            <div className='border-b-2 py-4'>
                <div className="container mx-auto flex justify-between items-center">
                    <Link to='/user' className='text-3xl font-bold tracking-tight text-custom'>
                        EyeCue
                    </Link>
                </div>
            </div>

            <div className="flex flex-col md:flex-row">
                <div className="w-1/4 flex justify-center items-center">
                    <img src={signup} alt="" className='ml-40 mt-36' />
                </div>

                <div className="w-full flex justify-center items-center">
                    <div className="landingMainDiv w-full lg:w-3/4 xl:w-2/3 flex justify-end mt-36">
                        <div className="flex flex-col items-center w-full lg:w-2/3 p-9 mb-8 lg:mb-0 shadow-lg rounded-lg bg-white">
                            <div className="mb-4">
                                <div className="py-3 flex">
                                    <h3 className='font-bold'>Do more with EyeCue Pro</h3>
                                </div>
                                <div className="py-3 flex">
                                    <span className="pr-3">&bull;</span>
                                    <p>Get A Verified Badge with name</p>
                                </div>
                                <div className="flex py-3">
                                    <span className="pr-3">&bull;</span>
                                    <p>Easily capture your interview with our video recording feature.</p>
                                </div>
                                <div className="flex py-3">
                                    <span className="pr-3">&bull;</span>
                                    <p>Enjoy the freedom of limitless video storage in the cloud</p>
                                </div>
                            </div>
                            <form onSubmit={handlePurchase} className="w-full">
                                <Button type="submit" className="w-full font-semibold bg-custom hover:font-bold">Upgrade to Pro</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Premium;