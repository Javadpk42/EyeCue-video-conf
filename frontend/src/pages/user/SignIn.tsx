import { Alert, Button, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import signup from "../../assets/sendEmail.png";
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../../redux/user/userSlice';

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const { error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
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
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const { email, password } = values;
        dispatch(signInStart());
        const response = await axios.post('http://localhost:3000/api/user/login', { email, password }, { withCredentials: true });

        if (response.data.success === false) {
          dispatch(signInFailure(response.data.message));
        }

        if (response.status === 200) {
          dispatch(signInSuccess(response.data));
          navigate('/');
        }
      } catch (error) {
        console.log(error)
        dispatch(signInFailure(error.response?.data?.message));
      } finally {
        setLoading(false);
      }
    },
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
        <div className=" w-1/4 flex justify-center items-center">
          <img src={signup} alt="" className=' ml-40 mt-36' />
        </div>

        <div className="w-full md:w-3/4 flex justify-center items-center">
          <form className='w-11/12 md:w-80 flex flex-col gap-4 md:mt-44 ml-40' onSubmit={formik.handleSubmit}>
            <h2 className='text-2xl font-bold mb-4'>Sign In</h2>
            <div className='relative'>
            <input
              type='email'
              placeholder='name@company.com'
              id='email'
              name='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full border border-gray-300 p-1 "
            />
            {formik.touched.email && formik.errors.email && (
              <Alert className=' text-error absolute text-xs'>{formik.errors.email}</Alert>
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
              <Alert className=' text-error absolute text-xs'>{formik.errors.password}</Alert>
            )}
            {errorMessage && (
              <Alert className=' text-error absolute text-xs' >
                {errorMessage}
              </Alert>
            )}
            </div>
            
            <Button type='submit' className='font-bold hover:text-custom hover:bg-white bg-custom' disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>

            <Button type='button' className='flex items-center justify-center'>
              <AiFillGoogleCircle className='w-6 h-6 mr-2 text-black' />
              <span className='text-black hover:font-bold'>Continue with Google</span>
            </Button>
            
            <div className='mt-4 text-center'>
              <span>Forgot password? </span>
              <Link to='/forgot' className='text-custom hover:font-bold'>Click here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
