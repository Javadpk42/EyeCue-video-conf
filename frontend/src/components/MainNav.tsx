// import React from 'react'
// import { Button } from './ui/button'
// import { Link } from 'react-router-dom'

// export default function MainNav() {
//   return (
//     <div>
//       <Link to='/signup'>
//       <Button variant='destructive' className='font-bold hover:text-custom hover:bg-white bg-custom rounded-full'>
//         Sign Up Free
//       </Button>
//       </Link>
//     </div>
//   )
// }
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { signoutSuccess } from '../redux/user/userSlice';
import { logoutUser } from '../api/userApi';


export default function MainNav() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  console.log('Current User:', currentUser); // Debugging: log the current user

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(signoutSuccess());
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  
  return (
    <div>
      {currentUser ? (
        <Button
          variant='destructive'
          className='font-bold hover:text-custom hover:bg-white bg-custom rounded-full'
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : (
        <Link to='/user/signup'>
          <Button variant='destructive' className='font-bold hover:text-custom hover:bg-white bg-custom rounded-full'>
            Sign Up Free
          </Button>
        </Link>
      )}
    </div>
  );
}

