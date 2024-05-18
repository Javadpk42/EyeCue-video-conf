import { Alert, Button, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import signup from "../../assets/sendEmail.png";
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../../redux/user/userSlice';


import axios from 'axios';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    console.log(formData)
  };


  const handleGoogleSuccess = async (codeResponse) => {
    try {
      dispatch(signInStart());

      setLoading(true);
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
      },{withCredentials:true});

      // if (response.data.success === true) {
      //   navigate('/');
      // }

      // setLoading(false); 
      if (response.data.success === false) {
        dispatch(signInFailure(response.data.message))
      }
  
      if (response.status === 200) {
        dispatch(signInSuccess(response.data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
      const { username, email, password }: any = formData
      const response = await axios.post('http://localhost:3000/api/user/sendEmail', { email, username });
      console.log(response.data);
      console.log(username, email, password)
      navigate('/verification',
        {
          state: {
            username: username,
            email: email,
            password: password
          }
        }
      );

    } catch (error) {
      console.error('Error fetching data:', error);
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
            <h2 className='text-2xl font-bold mb-4'>Let's get started</h2>
            <TextInput
              type='text'
              placeholder='Username'
              id='username'
              onChange={handleChange}
              className="w-full"
            />
            <TextInput
              type='email'
              placeholder='name@company.com'
              id='email'
              onChange={handleChange}
              className="w-full"
            />
            <TextInput
              type='password'
              placeholder='Password'
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
                'Sign Up'
              )}
            </Button>


            <Button type='button' onClick={() => login()} className='flex items-center justify-center '>
              <AiFillGoogleCircle className='w-6 h-6 mr-2 text-black  ' />
              <span className='text-black hover:font-bold'>Continue with Google</span>
            </Button>
            {errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )}
            <div className='mt-4 text-center'>
              <span>Already have an account? </span>
              <Link to='/signin' className='text-custom hover:font-bold'>Click here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}
