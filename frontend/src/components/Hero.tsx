import hero from "../assets/bannerpeers.png";

import { Link } from 'react-router-dom';


export default function Hero() {

    

  return (
    

    <div className="bg-white">
     
      <main>
        {/* Hero section */}
        <section className=" py-12 px-4 sm:px-6 lg:px-8 text-white">
  <div className="max-w-7xl mx-auto">
    <div className='m-4 gap-4 grid md:grid-cols-2'>
      <div className=''>
        <h1 className="text-5xl tracking-tighter text-black  font-bold mb-6">Welcome to EyeCue <span className='text-custom'>Connect</span> collaborate seamlessly with EyeCue</h1>
        <p className="font-krona tracking-tighter text-md text-gray-700 mb-8 leading-[1.42] ">
          Connect, communicate, and collaborate seamlessly with EyeCue. Experience
          crystal-clear video conferencing, screen sharing, and more.
          Connect, communicate, and collaborate seamlessly with EyeCue
          Connect, communicate, and collaborate seamlessly with EyeCue
        </p>
        <Link to='/user/premium'><button className=" bg-custom  py-2 px-4 rounded-full font-semibold">Upgrade to Pro</button> </Link>
      </div>
      <div className=''>
        {/* Assuming you have an image for the illustration */}
        <img
          src={hero}
          alt="Illustration"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  </div>
</section>

        {/* Call-to-action section */}
        <section className="bg-custom py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl text-white font-bold mb-4">Ready to Get Started?</h2>
            {/* Call-to-action button */}
            <Link to="/user/lobby"><button className="bg-teal-400 text-black  py-3 px-6 rounded-full font-semibold">Let's Get Started</button></Link>
          </div>
        </section>
      </main>
      <footer className="bg-gray-400 py-8">
        <div className="max-w-7xl mx-auto text-white text-center">
          <p>&copy; {new Date().getFullYear()} EyeCue Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>

  );
}
