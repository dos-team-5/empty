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
    <div className="absolute top-60 -right-54 h-110 w-200 touch-none select-none xl:top-70 2xl:top-90">
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
        <Canvas frameloop="always" shadows flat>
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
