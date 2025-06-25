import { MeshReflectorMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, DoubleSide } from 'three';

const Ramp = ({ rotationSpeed }: { rotationSpeed: number }) => {
  const groupRef = useRef<Mesh>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= rotationSpeed;
    }
  });

  return (
    <mesh
      ref={groupRef}
      name="Ramp"
      castShadow
      receiveShadow
      position={[0, 0, 0]}
      // rotation={[-Math.PI / 2, 0, 0]}
    >
      {/* <Cylinder args={[4.5, 4.5, 1, 36, 1, false, 0, Math.PI * 2]} /> */}
      {/* <planeGeometry args={[50, 50]} /> */}
      <cylinderGeometry args={[4.3, 4.3, 0.7, 36, 1, false, 0, Math.PI * 2]} />

      {/* <meshStandardMaterial color={0x000000} /> */}

      <MeshReflectorMaterial
        side={DoubleSide}
        blur={[300, 100]}
        resolution={2048}
        mixBlur={1}
        mixStrength={0.3}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#050505"
        metalness={0.7}
        mirror={0}
      />
    </mesh>
  );
};

export default Ramp;
