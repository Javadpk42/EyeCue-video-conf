import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import signimg from "../assets/login.webp";

import axios from 'axios';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    console.log(formData)
  };
  

  const handleGoogleSuccess = async (codeResponse) => {
    try {
      setLoading(true);
      
      // Extract access token from the codeResponse
      const accessToken = codeResponse.access_token;
  
      // Make a request to Google's API to fetch the user's profile information
      const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
  
      // Extract user data from profileResponse
      const { email, name } = profileResponse.data;
  
      // Generate random password
      const password = "javadpk42";
  
      // Send user data to backend API
      const response = await axios.post('http://localhost:3000/api/user/googleAuth', {
        username: name,
        email,
        password
      });
  
      if (response.data.success === true) {
        navigate('/');
      }
      
      setLoading(false); // Reset loading state after receiving the response
    } catch (error) {
      setLoading(false);
      console.error('Error during Google authentication:', error);
      setErrorMessage('Error during Google authentication');
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google authentication failed:', error);
    setErrorMessage('Google authentication failed');
  };
  const login = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError 
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('function called')
    e.preventDefault();
    
    try {
      setLoading(true)
      const {username,email,password}:any = formData
      const response = await axios.post('http://localhost:3000/api/user/sendEmail',{email,username});
      console.log(response.data);
      console.log(username,email, password)
      navigate('/verification',        
      {state: {
        username:username,
        email:email,
        password:password
      }}
      );

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    
    <div className='min-h-screen flex items-center justify-center mt-20'>
      <div className='flex flex-col gap-5 p-3 max-w-3xl mx-auto md:flex-row md:items-center'>
        <div className='flex-1 text-center md:text-left'>
          <Link to='/' className='text-3xl font-bold tracking-tight text-custom'>
            EyeCue
          </Link>
          <p className='text-sm mt-5'>
            You can sign up with your email and password
            or with Google.
          </p>
        </div>
        <div className='flex-1'>
          <h2 className='text-2xl font-semibold text-center md:text-left'>Let's Get Started</h2>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              {/* <Label value='Your username' /> */}
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}
              />
            </div>
            <div>
              {/* <Label value='Your email' /> */}
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              {/* <Label value='Your password' /> */}
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button type='submit' className='font-bold hover:text-custom hover:bg-white bg-custom' disabled={loading}>
            {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
            <Button type='button' onClick={() => login()} outline className='flex items-center justify-center'>
              <AiFillGoogleCircle className='w-6 h-6 mr-2' />
              <span className='text-black'>Continue with Google</span>
            </Button>
          </form>
          <div className='flex justify-center md:justify-start text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/signin' className='text-blue-500 ml-1'>
              Continue
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
    
  );
}
