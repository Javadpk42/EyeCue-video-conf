import { Alert, Button, Spinner, TextInput } from 'flowbite-react';
import signup from "../../assets/otp.png";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Otp() {
  const location = useLocation();
  const [otp, setOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { username, email, password } = location.state;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages

    if (!otp) {
      setErrorMessage('OTP is required');
      return;
    }

    setLoading(true); // Set loading state to true while waiting for the response

    try {
      const response = await axios.post('http://localhost:3000/api/user/verifyEmail', {
        otp,
        email
      });

      if (response.data.success === true) {
        // If OTP verification is successful, call createUser API
        const createUserResponse = await axios.post('http://localhost:3000/api/user/signup', {
          username,
          email,
          password
        });
        if (createUserResponse.data.success === true) {
          navigate('/signin');
        }
      }
      setLoading(false); // Reset loading state after receiving the response
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setErrorMessage('Failed to verify OTP. Please try again.'); // Set error message if request fails
      setLoading(false); // Reset loading state after receiving the response
    }
  };

  return (
    <div className='h-screen'>
      <div className='border-b-2 py-4'>
        <div className="container mx-auto flex justify-between items-center">
          <Link to='/' className='text-3xl font-bold tracking-tight text-custom'>
            EyeCue
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-1/4 flex justify-center items-center">
          <img src={signup} alt="" className='ml-40 mt-36' />
        </div>

        <div className="w-full md:w-3/4 flex justify-center items-center">
          <form className='w-11/12 md:w-80 flex flex-col gap-4 md:mt-44 ml-40' onSubmit={handleSubmit}>
            <h2 className='text-2xl font-bold mb-4'>Check Your Email For OTP</h2>

            <div className='relative '>

              <input
                type='text'
                placeholder='Enter OTP'
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                className='w-full border border-gray-300 p-1'
              />
              {errorMessage && (
                <Alert className='text-error absolute'>
                  {errorMessage}
                </Alert>
              )}
            </div>
            <Button type='submit' className='font-bold hover:text-custom hover:bg-white bg-custom mt-2' disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Verify'
              )}
            </Button>


            <div className='mt-4 text-center'>
              <span>Can't find? </span>
              <Link to='/signin' className='text-black hover:font-bold'>Click <span className='text-custom'>here</span> to resend</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
