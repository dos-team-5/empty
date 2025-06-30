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
import { useLanguage } from '@/providers/languageToggleContext';

export const Loader = () => {
  return (
    <div className="z-[100000002] flex h-full w-100 flex-col items-center justify-center !bg-transparent">
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
  const { language } = useLanguage();

  return (
    <div
      className={`h-full w-100 touch-none select-none ${language === 'fr' ? 'md:mt-0 xl:mt-16 2xl:mt-32' : 'md:mt-8 xl:mt-24 2xl:mt-32'} md:h-76 md:w-92 xl:h-88 xl:w-104 2xl:h-104 2xl:w-120`}
    >
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
