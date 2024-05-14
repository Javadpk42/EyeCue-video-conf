import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {  error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    console.log(formData)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const {email,password}:any = formData
      const response = await axios.post('http://localhost:3000/api/user/login',{email,password});
  
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
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
        <Link to='/' className='text-3xl font-bold tracking-tight text-custom' >
                EyeCue
            </Link>
          <p className='text-sm mt-5'>
             You can sign in with your email and password
          </p>
        </div>
        <div className='flex-1'>

          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>
              <Button type='submit' className='flex-1 font-bold hover:text-custom hover:bg-white bg-custom'>Login</Button>
              <Button type='button' outline className="flex items-center">
      <AiFillGoogleCircle className='w-6 h-6 mr-2' style={{ color: 'inherit' }} />
      <span className="text-black">Continue with Google</span>
    </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>forgot password?</span>
            <Link to='/signin' className='text-blue-500'>
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
