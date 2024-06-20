import { Alert, Button, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import signup from "../../assets/sendEmail.png";
import { signInStart, signInSuccess, signInFailure } from '../../redux/admin/adminSlice';
import { loginAdmin } from '../../api/adminApi';

export default function AdminSignIn() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error: errorMessage } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      setLoading(true);
      dispatch(signInStart());
      const response = await loginAdmin(email, password);
      console.log(response)

      if (response.success === false) {
        dispatch(signInFailure(response.message));
      }

      if (response.success) {
        dispatch(signInSuccess(response));
        navigate('/admin/home');
      }
    } catch (error: any) {
      console.log(error);
      dispatch(signInFailure(error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-screen'>
      <div className='border-b-2 py-4'>
        <div className="container mx-auto flex justify-between items-center">
          <Link to='/admin' className='text-3xl font-bold tracking-tight text-custom'>
            AdminPanel
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-1/4 flex justify-center items-center">
          <img src={signup} alt="" className='ml-40 mt-36' />
        </div>

        <div className="w-full md:w-3/4 flex justify-center items-center">
          <form className='w-11/12 md:w-80 flex flex-col gap-4 md:mt-44 ml-40'>
            <h2 className='text-2xl font-bold mb-4'>Admin Sign In</h2>
            <div className='relative'>
              <input
                type='email'
                placeholder='name@company.com'
                id='email'
                name='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full border border-gray-300 p-1"
              />
            </div>
            <div className='relative'>
              <input
                type='password'
                placeholder='Password'
                id='password'
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full border border-gray-300 p-1"
              />
              {errorMessage && (
                <Alert className='text-error absolute text-xs'>
                  {errorMessage}
                </Alert>
              )}
            </div>

            <Button type='button' className='font-bold hover:text-custom hover:bg-white bg-custom' onClick={handleSignIn} disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>

            <div className='mt-4 text-center'>
              <span>Forgot password? </span>
              <Link to='/admin/forgot' className='text-custom hover:font-bold'>Click here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
