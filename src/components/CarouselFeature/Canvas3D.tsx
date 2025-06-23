'use client';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useProgress,
} from '@react-three/drei';
import { LoadingOverlay } from '@mantine/core';
import { CarModel } from './CarModel';
import Ramp from './Ramp';

const Canvas3D = ({ file }: { file: File | null }) => {
  const { progress } = useProgress();

  return (
    <div className="absolute top-88 -right-10 mx-auto h-[36%] w-[124%] origin-center touch-none select-none md:-right-32 md:w-[172%] lg:top-60 lg:-right-54 lg:h-110 lg:w-200 xl:top-70 xl:-right-48 2xl:top-90">
      {progress < 100 ? (
        <div className="z-[100000002] flex h-full w-full flex-col items-center justify-center !bg-transparent">
          <LoadingOverlay
            visible
            overlayProps={{ radius: 'sm', bg: 'transparent' }}
            loaderProps={{ color: 'pink', type: 'bars' }}
            className="!static !bg-transparent"
          />
          Loading...
        </div>
      ) : (
        <Canvas frameloop="always" shadows flat className="">
          <PerspectiveCamera position={[0, 3, 16]} fov={30} makeDefault />
          {/* <Center> */}
          <Model file={file} />
          {/* </Center> */}
          <EnvironmentSetup />
        </Canvas>
      )}
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

const Model = ({ file }: { file: File | null }) => {
  return (
    <group name="carWithRamp" position={[0, 0, 0]}>
      <CarModel file={file} />
      <Ramp />
    </group>
  );
};
