'use client';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { LoadingOverlay } from '@mantine/core';
import { CarModel } from './CarModel';
import Ramp from './Ramp';
import { Suspense, useState } from 'react';

export const Loader = () => {
  return (
    <div className="z-[100000002] flex h-full w-full flex-col items-center justify-center !bg-transparent">
      <LoadingOverlay
        visible
        overlayProps={{ radius: 'sm', bg: 'transparent' }}
        loaderProps={{ color: 'pink', type: 'bars' }}
        className="!static !bg-transparent"
      />
      Loading...
    </div>
  );
};

const Canvas3D = ({
  file,
  applyImage,
}: {
  file: File | null;
  applyImage: boolean;
}) => {
  return (
    <div className="absolute top-88 left-[52%] mx-auto h-80 w-screen origin-center -translate-x-1/2 touch-none select-none sm:left-1/2 sm:h-120 md:h-118 lg:top-62 lg:left-[40%] lg:h-110 lg:w-[50vw] xl:top-64 xl:h-100 2xl:top-90 2xl:left-[10%] 2xl:h-120">
      <Suspense fallback={<Loader />}>
        <Canvas frameloop="always" shadows flat className="">
          <PerspectiveCamera position={[0, 3, 16]} fov={30} makeDefault />
          {/* <Center> */}
          <Model file={file} applyImage={applyImage} />
          {/* </Center> */}
          <EnvironmentSetup />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Canvas3D;

const EnvironmentSetup = () => {
  return (
    <>
      <OrbitControls
        makeDefault
        enableZoom={false}
        minPolarAngle={Math.PI / 2.7}
        maxPolarAngle={Math.PI / 2.1}
        enablePan={false}
        // minAzimuthAngle={-Math.PI / 2.5}
        // maxAzimuthAngle={Math.PI / 2.5}
      />
      <Environment
        preset="city"
        environmentIntensity={1.5}
        // backgroundIntensity={1}
      />
    </>
  );
};

const Model = ({
  file,
  applyImage,
}: {
  file: File | null;
  applyImage: boolean;
}) => {
  const [rotationSpeed, setRotationSpeed] = useState(0.007);
  return (
    <group
      name="carWithRamp"
      onPointerEnter={() => {
        setRotationSpeed(0);
        document.body.style.cursor = 'grab';
      }}
      onPointerLeave={() => {
        setRotationSpeed(0.007);
        document.body.style.cursor = 'default';
      }}
      onPointerDown={() => {
        document.body.style.cursor = 'grabbing';
      }}
      onPointerUp={() => {
        document.body.style.cursor = 'grab';
      }}
      position={[0, 0, 0]}
    >
      <CarModel
        file={file}
        applyImage={applyImage}
        rotationSpeed={rotationSpeed}
      />
      <Ramp rotationSpeed={rotationSpeed} />
    </group>
  );
};
