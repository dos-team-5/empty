'use client';
import Lottie from 'lottie-react';
import animationData from '../../../public/T1C.json';

const Test = () => {
  return (
    <div>
      <h1>My Next.js Lottie Animation</h1>
      <div className="relative h-dvh w-full overflow-hidden">
        <Lottie
          loop={false}
          animationData={animationData}
          className="h-dvh w-full"
        />
      </div>
    </div>
  );
};

export default Test;
