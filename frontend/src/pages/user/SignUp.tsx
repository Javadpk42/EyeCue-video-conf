import { Alert, Button, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import signup from "../../assets/sendEmail.png";
import { useDispatch,useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../../redux/user/userSlice';

import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function SignUp() {
  const { error: errorMessage } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters')
      .max(15, 'Username must not exceed 15 characters')
      .matches(/^[a-zA-Z0-9]+$/, 'Username can only contain alphanumeric characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[\W_]/, 'Password must contain at least one special character'),
  });


  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const { username, email, password } = values;
        const response = await axios.post('http://localhost:3000/api/user/sendEmail', { email, username });
        console.log(response.data);
        navigate('/verification', {
          state: {
            username,
            email,
            password
          }
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error.response.data.message);
        dispatch(signInFailure(error.response?.data?.message));
      }
    },
  });

  const handleGoogleSuccess = async (codeResponse) => {
    try {
      dispatch(signInStart());

      setLoading(true);
      const accessToken = codeResponse.access_token;

      const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      const { email, name } = profileResponse.data;
      const password = "javadpk42";

      const response = await axios.post('http://localhost:3000/api/user/googleAuth', {
        username: name,
        email,
        password
      }, { withCredentials: true });

      if (response.data.success === false) {
        dispatch(signInFailure(response.data.message));
      } else if (response.status === 200) {
        dispatch(signInSuccess(response.data));
        navigate('/');
      }
    } catch (error) {
      console.log(error)
      console.log(error.response.data.message)
      dispatch(signInFailure(error.response.data.message));
    } finally {
      setLoading(false);
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
          <form className='w-11/12 md:w-80 flex flex-col gap-4 md:mt-44 ml-40' onSubmit={formik.handleSubmit}>
            <h2 className='text-2xl font-bold mb-4'>Let's get started</h2>
            <div className='relative '>
              <input
                type='text'
                placeholder='Username'
                id='username'
                name='username'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className="w-full border border-gray-300 p-1"
              />
              {formik.touched.username && formik.errors.username && (
                <Alert className='absolute text-error text-xs '>{formik.errors.username}</Alert>
              )}
            </div>
            <div className='relative'>

              <input
                type='email'
                placeholder='name@company.com'
                id='email'
                name='email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full border border-gray-300 p-1"
              />
              {formik.touched.email && formik.errors.email && (
                <Alert className='absolute text-error text-xs'>{formik.errors.email}</Alert>
              )}
            </div>

            <div className='relative'>

              <input
                type='password'
                placeholder='Password'
                id='password'
                name='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full border border-gray-300 p-1"
              />
              {formik.touched.password && formik.errors.password && (
                <Alert className='absolute text-error text-xs '>{formik.errors.password}</Alert>
              )}
              {errorMessage && (
              <Alert className='absolute text-error text-xs'>
                {errorMessage}
              </Alert>
            )}
            </div>

            <Button type='submit' className='font-bold mt-2 hover:text-custom hover:bg-white bg-custom' disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}
            </Button>

            <Button type='button' onClick={() => login()} className='flex items-center justify-center'>
              <AiFillGoogleCircle className='w-6 h-6 mr-2 text-black' />
              <span className='text-black hover:font-bold'>Continue with Google</span>
            </Button>
            
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
