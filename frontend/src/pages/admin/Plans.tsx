// import React, { useState, useEffect } from 'react';
// import { NavLink, Link } from 'react-router-dom';
// import {
//     ArrowLeftRightIcon,
//     BarChart3Icon,
//     Clock4Icon,
//     LayoutDashboard,
//     HelpCircleIcon,
// } from 'lucide-react';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import RightArrowIcon from '../../assets/rightArrow.svg';

// const variants = {
//     expanded: { width: '220px' },
//     nonexpanded: { width: '60px' },
// };

// const navLinks = [
//     {
//         link: 'Dashboard',
//         icon: LayoutDashboard,
//         path: '/admin/home',
//     },
//     {
//         link: 'Transactions',
//         icon: ArrowLeftRightIcon,
//         path: '/admin/transactions',
//     },
//     {
//         link: 'Plans',
//         icon: BarChart3Icon,
//         path: '/admin/plans',
//     },
//     {
//         link: 'Activity',
//         icon: Clock4Icon,
//         path: '/admin/activity',
//     },
//     {
//         link: 'Support',
//         icon: HelpCircleIcon,
//         path: '/admin/support',
//     },
// ];

// export default function Plans() {
//     const [isExpanded, setIsExpanded] = useState(true);
//     const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//     const [plans, setPlans] = useState<number[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [amount, setAmount] = useState<number>(2000);

//     useEffect(() => {
//         const handleResize = () => {
//             setWindowWidth(window.innerWidth);
//             if (windowWidth < 768) {
//                 setIsExpanded(false);
//             }
//         };

//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, [windowWidth]);

//     useEffect(() => {
//         const fetchPlans = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/api/admin/subscriptions');
//                 setPlans(response.data.map((plan: { amount: number }) => plan.amount));
//                 setLoading(false);
//             } catch (error) {
//                 setLoading(false);
//                 setError('Error fetching plans');
//             }
//         };

//         fetchPlans();
//     }, []);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:3000/api/admin/subscriptions', { amount });
//             setPlans([response.data.amount]);
//             setAmount(2000);
//         } catch (error) {
//             setError('Error creating plan');
//         }
//     };

//     return (
//         <>
//             <div className="flex">
//                 {/* Side Navigation Bar */}
//                 <motion.div
//                     animate={isExpanded ? 'expanded' : 'nonexpanded'}
//                     variants={variants}
//                     className={
//                         'py-10 h-screen flex flex-col border border-r-1 bg-[#FDFDFD] relative' +
//                         (isExpanded ? ' px-10' : ' px-2 duration-500')
//                     }
//                 >
//                     <div
//                         onClick={() => setIsExpanded(!isExpanded)}
//                         className="cursor-pointer absolute -right-3 top-10 rounded-full w-6 h-6 bg-custom md:flex justify-center items-center"
//                     >
//                         <img src={RightArrowIcon} className="w-2" alt="Right Arrow" />
//                     </div>

//                     <div className="logo-div flex space-x-4 items-center">
//                         <Link to='/user' className={!isExpanded ? 'hidden' : 'block text-3xl font-bold tracking-tight text-custom'}>
//                             EyeCue
//                         </Link>
//                     </div>

//                     <div className="flex flex-col space-y-8 mt-12">
//                         {navLinks.map((item, index) => (
//                             <NavLink
//                                 to={item.path}
//                                 key={index}
//                                 className={({ isActive }) =>
//                                     'nav-links w-full flex space-x-3 w-full p-2 rounded ' +
//                                     (isActive ? 'bg-custom text-white' : 'text-black') +
//                                     (!isExpanded ? ' pl-3' : '')
//                                 }
//                             >
//                                 <item.icon className="md:w-6 w-4" />
//                                 <span className={!isExpanded ? 'hidden' : 'block'}>{item.link}</span>
//                             </NavLink>
//                         ))}
//                     </div>
//                 </motion.div>

//                 {/* Main component on basis of selected navigation from nav bar */}
//                 <main className="grow">
//                     <div className="flex flex-col py-10 lg:px-16 md:px10 px-6 h-screen overflow-y-auto w-full">
//                         <h2 className="lg:text-3xl md:text-2xl text-xl">Subscription Plans</h2>
//                         {loading ? (
//                             <p>Loading...</p>
//                         ) : error ? (
//                             <p>{error}</p>
//                         ) : (
//                             <div>
//                                 <table className="min-w-full bg-white mb-4">
//                                     <thead>
//                                         <tr>
//                                             <th className="py-2 px-4 border-b">Amount</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {plans.map((plan, index) => (
//                                             <tr key={index}>
//                                                 <td className="py-2 px-4 border-b">{plan}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                                 <form onSubmit={handleSubmit} className="space-y-4">
//                                     <input
//                                         type="number"
//                                         placeholder="Plan Amount"
//                                         value={amount}
//                                         onChange={(e) => setAmount(parseInt(e.target.value))}
//                                         className="w-full p-2 border border-gray-300"
//                                     />
//                                     <button
//                                         type="submit"
//                                         className="w-full p-2 bg-custom text-white"
//                                     >
//                                         Create Plan
//                                     </button>
//                                 </form>
//                             </div>
//                         )}
//                     </div>
//                 </main>
//             </div>
//         </>
//     );
// }


import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
    ArrowLeftRightIcon,
    BarChart3Icon,
    Clock4Icon,
    LayoutDashboard,
    HelpCircleIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import RightArrowIcon from '../../assets/rightArrow.svg';

const variants = {
    expanded: { width: '220px' },
    nonexpanded: { width: '60px' },
};

const navLinks = [
    {
        link: 'Dashboard',
        icon: LayoutDashboard,
        path: '/admin/home',
    },
    {
        link: 'Transactions',
        icon: ArrowLeftRightIcon,
        path: '/admin/transactions',
    },
    {
        link: 'Plans',
        icon: BarChart3Icon,
        path: '/admin/plans',
    },
    {
        link: 'Activity',
        icon: Clock4Icon,
        path: '/admin/activity',
    },
    {
        link: 'Support',
        icon: HelpCircleIcon,
        path: '/admin/support',
    },
];

export default function Plans() {
    const [isExpanded, setIsExpanded] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [plans, setPlans] = useState<{ id: number, amount: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [amount, setAmount] = useState<number>();
    const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (windowWidth < 768) {
                setIsExpanded(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/admin/subscriptions');
                setPlans(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError('Error fetching plans');
            }
        };

        fetchPlans();
    }, []);

    const handleEdit = (planId: number) => {
        setEditMode((prev) => ({ ...prev, [planId]: !prev[planId] }));
    };

    const handleSave = async (planId: number) => {
        try {
            const response = await axios.post('http://localhost:3000/api/admin/subscriptions', { amount });
            setPlans(plans.map(plan => plan.id === planId ? { ...plan, amount: response.data.amount } : plan));
            setEditMode((prev) => ({ ...prev, [planId]: false }));
        } catch (error) {
            setError('Error updating plan');
        }
    };

    return (
        <div className="flex">
            <motion.div
                animate={isExpanded ? 'expanded' : 'nonexpanded'}
                variants={variants}
                className={
                    'py-10 h-screen flex flex-col border border-r-1 bg-[#FDFDFD] relative' +
                    (isExpanded ? ' px-10' : ' px-2 duration-500')
                }
            >
                <div
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="cursor-pointer absolute -right-3 top-10 rounded-full w-6 h-6 bg-custom md:flex justify-center items-center"
                >
                    <img src={RightArrowIcon} className="w-2" alt="Right Arrow" />
                </div>

                <div className="logo-div flex space-x-4 items-center">
                    <Link to='/user' className={!isExpanded ? 'hidden' : 'block text-3xl font-bold tracking-tight text-custom'}>
                        EyeCue
                    </Link>
                </div>

                <div className="flex flex-col space-y-8 mt-12">
                    {navLinks.map((item, index) => (
                        <NavLink
                            to={item.path}
                            key={index}
                            className={({ isActive }) =>
                                'nav-links w-full flex space-x-3 w-full p-2 rounded ' +
                                (isActive ? 'bg-custom text-white' : 'text-black') +
                                (!isExpanded ? ' pl-3' : '')
                            }
                        >
                            <item.icon className="md:w-6 w-4" />
                            <span className={!isExpanded ? 'hidden' : 'block'}>{item.link}</span>
                        </NavLink>
                    ))}
                </div>
            </motion.div>

            <main className="grow">
                <div className="flex flex-col py-10 lg:px-16 md:px-10 px-6 h-screen overflow-y-auto w-full">
                    <h2 className="lg:text-3xl md:text-2xl text-xl">Subscription Plan</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                            {plans.map((plan) => (
                                <div key={plan.id} className="p-4 border rounded-lg shadow-md bg-white">
                                    {editMode[plan.id] ? (
                                        <>
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(parseInt(e.target.value))}
                                                className="w-full p-2 border border-gray-300 mb-4"
                                            />
                                            <button
                                                onClick={() => handleSave(plan.id)}
                                                className="mr-3 p-1 bg-gray-100 text-black rounded"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => handleEdit(plan.id)}
                                                className=" p-1  bg-gray-100 text-black rounded"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className='flex flex-wrap justify-between px-7 py-8 bg-gray-100'>
                                            <h4 className="text-lg font-bold">Plan Amount: {plan.amount}</h4>
                                            <button
                                                onClick={() => handleEdit(plan.id)}
                                                className=" text-custom rounded"
                                            >
                                                Edit
                                            </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
