import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ArrowLeftRightIcon,
  BarChart3Icon,
  Clock4Icon,
  LayoutDashboard,
  HelpCircleIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';

import RightArrowIcon from '../assets/rightArrow.svg';

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
    link: 'Activity',
    icon: Clock4Icon,
    path: '/admin/activity',
  },
  {
    link: 'Analytics',
    icon: BarChart3Icon,
    path: '/admin/analytics',
  },
  {
    link: 'Transactions',
    icon: ArrowLeftRightIcon,
    path: '/admin/transactions',
  },
  {
    link: 'Support',
    icon: HelpCircleIcon,
    path: '/admin/support',
  },
];

function Navbar() {
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
        <span className={!isExpanded ? 'hidden' : 'block'}>EyeCue</span>
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
  );
}

export default Navbar;
