import React, { useState, useEffect } from 'react';
import { NavLink,Link } from 'react-router-dom';
import Chart from "../../components/Chart";
import {
  ArrowLeftRightIcon,
  BarChart3Icon,
  Clock4Icon,
  LayoutDashboard,
  HelpCircleIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';

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
    link: 'Analytics',
    icon: BarChart3Icon,
    path: '/admin/analytics',
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

export function Home() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
        className="cursor-pointer absolute -right-3 top-10 rounded-full w-6 h-6 bg-custom md:flex hidden justify-center items-center"
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
    </motion.div>        {/* Main component on basis of selected navigation from nav bar */}
        <main className="grow">
        <div className="flex flex-col py-10 lg:px-16 md:px10 px-6 h-screen overflow-y-auto w-full">
      <h2 className="lg:text-3xl md:text-2xl text-xl">Dashboard</h2>

      <div className="md:flex md:space-x-8 py-6">
        <div className="flex flex-col rounded-md border md:w-[400px] w-[250px] h-[150px] md:p-8 p-4 justify-center">
          <h2>Javad PK</h2>
          <p className="text-gray-500 mt-3">Your Expenses: Rs10000</p>
        </div>
        <div className="flex flex-col rounded-md border md:w-[400px] w-[250px] h-[150px] md:p-8 p-4 justify-center md:mt-0 mt-4">
          <h2>Javad PK</h2>
          <p className="text-gray-500 mt-3">Your Savings: Rs100000</p>
        </div>
      </div>
      <div className="flex space-x-8 py-6 w-4/5">
        <div className="flex flex-col rounded-md border w-full p-8 justify-center">
          Expenses Graph
          <Chart />
        </div>
      </div>
      <div className="md:flex md:space-x-8 py-6">
        <div className="flex flex-col rounded-md border  md:w-[400px] w-[250px] h-[200px] md:p-8 p-4 justify-center">
          <h2>Your Activity</h2>
          <li className="text-gray-500 mt-3">Sent Rs 2000</li>
        </div>
        <div className="flex flex-col rounded-md border md:w-[400px] w-[250px] h-[200px] md:p-8 p-4 justify-center md:mt-0 mt-4">
          <h2>Pending Bills</h2>
          <li className="text-gray-500 mt-3">subscription bill: Rs 1000</li>
        </div>
      </div>
    </div>
        </main>
      </div>
    </>
  );
}


