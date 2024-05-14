import React from 'react';
import hero from "../assets/bannerpeers.png";
import { Button } from './ui/button';


export default function Hero() {
  return (
    // <div className="flex flex-col md:flex-row">
    //   <div className="md:w-2/5 md:h-screen flex ">
    //     <div className=" ml-7 mt-32">
    //       <h2 className="text-4xl font-bold mb-6">Welcome to EyeCue <span className='text-custom'>Connect</span>, communicate, and collaborate seamlessly with EyeCue</h2>
    //       <p className=" font-sans text-lg text-gray-700 mb-8 ">
    //         Connect, communicate, and collaborate seamlessly with EyeCue. Experience
    //         crystal-clear video conferencing, screen sharing, and more.
    //         Connect, communicate, and collaborate seamlessly with EyeCue
    //         Connect, communicate, and collaborate seamlessly with EyeCue
    //       </p>
    //       <Button variant='destructive' className='font-bold hover:text-custom hover:bg-white bg-custom rounded-full'>
    //         Sign Up Free
    //       </Button>
    //     </div>
    //   </div>
    //   <div className="md:w-3/5 relative md:h-screen  py-1">
    //     <img
    //       src={hero}
    //       alt="Illustration"
    //       className=" object-cover absolute "
    //     />
    //   </div>
    // </div>
    // <div className='m-4 gap-4 grid sm:grid-cols-2 '>
    //   <div className=''>
    //   <h1 className="text-5xl tracking-tighter  font-bold mb-6">Welcome to EyeCue <span className='text-custom'>Connect</span> collaborate seamlessly with EyeCue</h1>
    //        <p className=" font-sans tracking-tighter text-md text-gray-700 mb-8 leading-[1.42] ">
    //          Connect, communicate, and collaborate seamlessly with EyeCue. Experience
    //          crystal-clear video conferencing, screen sharing, and more.
    //          Connect, communicate, and collaborate seamlessly with EyeCue
    //          Connect, communicate, and collaborate seamlessly with EyeCue
    //        </p>
    //        <Button variant='destructive' className='font-bold hover:text-custom hover:bg-white bg-custom rounded-full'>
    //          Sign Up Free
    //        </Button>
    //   </div>
    //   <div className=''>
    //         <img
    //             // src={hero}
    //             alt="Illustration"
    //             className=" object-cover absolute "
    //         />
    //   </div>
    // </div>

    <div className="bg-white">
     
      <main>
        {/* Hero section */}
        <section className=" py-12 px-4 sm:px-6 lg:px-8 text-white">
  <div className="max-w-7xl mx-auto">
    <div className='m-4 gap-4 grid md:grid-cols-2'>
      <div className=''>
        <h1 className="text-5xl tracking-tighter text-black  font-bold mb-6">Welcome to EyeCue <span className='text-custom'>Connect</span> collaborate seamlessly with EyeCue</h1>
        <p className="font-mono tracking-tighter text-md text-gray-700 mb-8 leading-[1.42] ">
          Connect, communicate, and collaborate seamlessly with EyeCue. Experience
          crystal-clear video conferencing, screen sharing, and more.
          Connect, communicate, and collaborate seamlessly with EyeCue
          Connect, communicate, and collaborate seamlessly with EyeCue
        </p>
        <button className=" bg-custom  py-2 px-4 rounded-full font-semibold">Discover EyeCue</button>
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
            <button className="bg-teal-400 text-black  py-3 px-6 rounded-full font-semibold">Sign Up, It's Free</button>
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
