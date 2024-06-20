

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
//         link: 'Analytics',
//         icon: BarChart3Icon,
//         path: '/admin/analytics',
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

// export default function Transactions() {
//     const [isExpanded, setIsExpanded] = useState(true);
//     const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
//                         className="cursor-pointer absolute -right-3 top-10 rounded-full w-6 h-6 bg-custom md:flex  justify-center items-center"
//                     >
//                         <img src={RightArrowIcon} className="w-2" alt="Right Arrow" />
//                     </div>

//                     <div className="logo-div flex space-x-4 items-center">
//                         {/* <span className={!isExpanded ? 'hidden' : 'block text-3xl font-bold tracking-tight text-custom'}>EyeCue</span> */}
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
//                 </motion.div>        {/* Main component on basis of selected navigation from nav bar */}
//                 <main className="grow">
//                     <div>
//                         <div className="flex flex-col py-10 lg:px-16 md:px10 px-6 h-screen overflow-y-auto w-full">
//                             <h2 className="lg:text-3xl md:text-2xl text-xl">Transactions</h2>
//                             <p>Content for the Transactions page.</p>
//                         </div>
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

export default function Transactions() {
    const [isExpanded, setIsExpanded] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        const fetchPayments = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/admin/payments');
                console.log(response)
                setPayments(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    return (
        <>
            <div className="flex">
                {/* Side Navigation Bar */}
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

                {/* Main component on basis of selected navigation from nav bar */}
                <main className="grow">
                    <div className="flex flex-col py-10 lg:px-16 md:px10 px-6 h-screen overflow-y-auto w-full">
                        <h2 className="lg:text-3xl md:text-2xl text-xl">Transactions</h2>
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <table className="min-w-full bg-white mt-8">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b">Transaction ID</th>
                                        <th className="py-2 px-4 border-b">Amount</th>
                                        <th className="py-2 px-4 border-b">User ID</th>
                                        <th className="py-2 px-4 border-b">Email</th>
                                        <th className="py-2 px-4 border-b">Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map((payment) => (
                                        <tr key={payment._id}>
                                            <td className="py-2 px-4 border-b">{payment.transactionId}</td>
                                            <td className="py-2 px-4 border-b">{payment.amount}</td>
                                            <td className="py-2 px-4 border-b">{payment.userId}</td>
                                            <td className="py-2 px-4 border-b">{payment.email}</td>
                                            <td className="py-2 px-4 border-b">{new Date(payment.createdAt).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}



