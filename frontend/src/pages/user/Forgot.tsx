import { Alert, Button, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import signup from "../../assets/sendEmail.png";
import axios from 'axios';
import { signInFailure } from '../../redux/user/userSlice';

export default function Forgot() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const { error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username } = formData;

    if (!email || !username) {
      setValidationError('Both username and email are required');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/api/user/send-Forget-Pass-Otp', { email, username });

      if (response.data.success === false) {
        dispatch(signInFailure(response.data.message));
      }

      if (response.status === 200) {
        setLoading(false);
        navigate('/otpforgot');
      }
    } catch (error) {
      dispatch(signInFailure('Failed to send OTP. Please try again.'));
      setLoading(false);
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
            <h2 className='text-2xl font-bold mb-4'>Forgot Password?</h2>
            <input
              type='text'
              placeholder='Username'
              id='username'
              onChange={handleChange}
              className="w-full border border-gray-300 p-1"
            />
            <input
              type='email'
              placeholder='name@company.com'
              id='email'
              onChange={handleChange}
              className="w-full border border-gray-300 p-1"
            />

            <Button type='submit' className='font-bold hover:text-custom hover:bg-white bg-custom' disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Send'
              )}
            </Button>

            {validationError && (
              <Alert className='text-error'>
                {validationError}
              </Alert>
            )}

            {errorMessage && !validationError && (
              <Alert className='text-error' >
                {errorMessage}
              </Alert>
            )}

            <div className='mt-3 text-center font-krona text-gray-400'>
              <span>resetting your password is easy, fill </span> <br />
              <span>the email address you registered with EyeCue</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
