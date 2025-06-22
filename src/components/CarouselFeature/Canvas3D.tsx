'use client';

import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls, PerspectiveCamera } from '@react-three/drei';

const Canvas3D = () => {
  return (
    <div className="absolute top-90 -right-4 h-100 w-150 touch-none select-none">
      <Canvas frameloop="demand" shadows flat>
        <PerspectiveCamera position={[0, -4, 0]} fov={65} makeDefault />
        <Center>
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshNormalMaterial />
          </mesh>
        </Center>
        <EnvironmentSetup />
      </Canvas>
    </div>
  );
};

export default Canvas3D;

const EnvironmentSetup = () => {
  return (
    <>
      {/* <color args={['#011910']} attach="background" />
      <fog attach="fog" args={['#011910', 5, 20]} /> */}
      <OrbitControls
        makeDefault
        // rotateSpeed={0.3}
        // dampingFactor={0.02}
        // zoomSpeed={0.5}
        // enablePan={false}
        // minPolarAngle={0}
        // maxPolarAngle={Math.PI / 2.3}
        // minAzimuthAngle={-Math.PI / 2.5}
        // maxAzimuthAngle={Math.PI / 2.5}
      />
    </>
  );
};
