import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import signup from "../../assets/sendEmail.png";

import axios from 'axios';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../../redux/user/userSlice';

export default function ResetPass() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const {  error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    console.log(formData)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {email,password}:any = formData
      const response = await axios.post('http://localhost:3000/api/user/forgot-password',{email,password});
  
      if (response.data.success === false) {
        dispatch(signInFailure(response.data.message));
      }
  
      if (response.status === 200) {
        dispatch(signInSuccess(response.data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='h-screen'>
      <div className='border-b-2 py-4'>
        <div className="container mx-auto flex justify-between items-center">
          <Link to='/' className='text-3xl font-bold tracking-tight text-custom' >
            EyeCue
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className=" w-1/4 flex justify-center items-center">
          <img src={signup} alt="" className=' ml-40 mt-36' />
        </div>

        <div className="w-full md:w-3/4 flex justify-center items-center">
          <form className='w-11/12 md:w-80 flex flex-col gap-4 md:mt-44 ml-40' onSubmit={handleSubmit}>
            <h2 className='text-2xl font-bold mb-4'>Reset Password</h2>
            
            <TextInput
              type='email'
              placeholder='name@company.com'
              id='email'
              onChange={handleChange}
              className="w-full"
            />
            <TextInput
              type='password'
              placeholder='New Password'
              id='password'
              onChange={handleChange}
              className="w-full"
            />
            <Button type='submit' className='font-bold hover:text-custom hover:bg-white bg-custom' disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Reset'
              )}
            </Button>


            
            {errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )}
           
          </form>
        </div>
      </div>
    </div>
    
  );
}
