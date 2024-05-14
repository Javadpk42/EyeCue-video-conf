import { Label, TextInput, Button } from 'flowbite-react';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';



export default function Verification() {
  const location = useLocation();
  const [otp, setOTP] = useState('');
//   const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { username, email, password } = location.state;

  console.log(username,email,password)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true while waiting for the response

    try {
      const response = await axios.post('http://localhost:3000/api/user/verifyEmail', {
        otp,
        email
      });
      console.log(response.data)
      if (response.data.success === true) {
        // If OTP verification is successful, call createUser API
        console.log('reached here')
        const createUserResponse = await axios.post('http://localhost:3000/api/user/signup', {
            username,
            email,
            password 
        });
        if (createUserResponse.data.success === true){
        navigate('/');

        }
      console.log(response.data);
      setLoading(false); // Reset loading state after receiving the response
    } }catch (error) {
      console.error('Error verifying OTP:', error);
      setErrorMessage('Failed to verify OTP. Please try again.'); // Set error message if request fails
      setLoading(false); // Reset loading state after receiving the response
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Enter OTP' />
              <TextInput
                type='text'
                placeholder='Enter OTP'
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
              />
            </div>
            
            <Button type='submit' className='font-bold hover:text-custom hover:bg-white bg-custom' disabled={loading}>
              {loading ? 'Verifying...' : 'Verify'}
            </Button>
          </form>
          {errorMessage && (
            <div className='text-red-500 mt-2'>{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}
