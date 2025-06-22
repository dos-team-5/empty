import * as THREE from 'three';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { degToRad } from 'three/src/math/MathUtils.js';

type GLTFResult = GLTF & {
  nodes: {
    Object_6: THREE.Mesh;
    Object_7: THREE.Mesh;
    Object_9: THREE.Mesh;
    Object_11: THREE.Mesh;
    Object_12: THREE.Mesh;
    Object_13: THREE.Mesh;
    Object_15: THREE.Mesh;
    Object_16: THREE.Mesh;
    Object_17: THREE.Mesh;
    Object_19: THREE.Mesh;
  };
  materials: {
    Geodoorl2sub11Mtl: THREE.MeshStandardMaterial;
    Geodoorl2sub31Mtl: THREE.MeshStandardMaterial;
    Geodoorr2sub31Mtl: THREE.MeshStandardMaterial;
    Geohoodsub00021Mtl: THREE.MeshStandardMaterial;
    Geohoodsub00031Mtl: THREE.MeshStandardMaterial;
    Georimblurlfsub01Mtl: THREE.MeshStandardMaterial;
    Georimblurlfsub021Mtl: THREE.MeshStandardMaterial;
    Ln12Mtl: THREE.MeshStandardMaterial;
    Ln1Mtl: THREE.MeshStandardMaterial;
    Tire1Mtl: THREE.MeshStandardMaterial;
  };
};

export function CarModel({ file }: { file: File | null }) {
  const groupRef = useRef<THREE.Group>(null);

  const texturePath = file
    ? URL.createObjectURL(file)
    : '/textures/decalImg.png';
  const texture = useTexture(texturePath);

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(texturePath);
      }
    };
  }, [file, texturePath]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= 0.01;
    }
  });

  const { nodes, materials } = useGLTF(
    '/models/tesla.glb'
  ) as unknown as GLTFResult;
  return (
    <group ref={groupRef} dispose={null} scale={0.5} position={[0, 0.5, 0]}>
      <mesh
        name="Object_6"
        castShadow
        receiveShadow
        geometry={nodes.Object_6.geometry}
        material={materials.Geodoorl2sub11Mtl}
        position={[-1.021, 3.161, -0.17]}
      />
      <mesh
        name="Object_7"
        castShadow
        receiveShadow
        geometry={nodes.Object_7.geometry}
        material={materials.Geodoorl2sub31Mtl}
        position={[0.062, 3.757, -2.659]}
      />
      <mesh
        name="Object_9"
        castShadow
        receiveShadow
        geometry={nodes.Object_9.geometry}
        material={materials.Geodoorr2sub31Mtl}
        position={[1.006, 2.71, 0.495]}
      />
      <mesh
        name="Object_11"
        castShadow
        receiveShadow
        geometry={nodes.Object_11.geometry}
        material={materials.Geohoodsub00021Mtl}
        position={[0, 2.176, 0]}
      >
        <Decal
          // debug
          position={[2.7, -0.5, 3.5]}
          rotation={[0, 0, degToRad(-1)]}
          scale={[3, 2, 1]}
        >
          <meshBasicMaterial
            map={texture}
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </Decal>
        <Decal
          // debug
          position={[2.7, -0.5, -3.5]}
          rotation={[0, Math.PI, degToRad(1)]}
          scale={[3, 2, 1]}
        >
          <meshBasicMaterial
            map={texture}
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </Decal>
      </mesh>
      <mesh
        name="Object_12"
        castShadow
        receiveShadow
        geometry={nodes.Object_12.geometry}
        material={materials.Geohoodsub00031Mtl}
        position={[6.5, 1.932, 0.815]}
      />
      <mesh
        name="Object_13"
        castShadow
        receiveShadow
        geometry={nodes.Object_13.geometry}
        material={materials.Georimblurlfsub01Mtl}
        position={[1.545, 1.836, 0.042]}
      />
      <mesh
        name="Object_15"
        castShadow
        receiveShadow
        geometry={nodes.Object_15.geometry}
        material={materials.Georimblurlfsub021Mtl}
        position={[1.02, 0.944, -0.007]}
      />
      <mesh
        name="Object_16"
        castShadow
        receiveShadow
        geometry={nodes.Object_16.geometry}
        material={materials.Ln12Mtl}
        position={[-6.998, 2.674, -0.007]}
      />
      <mesh
        name="Object_17"
        castShadow
        receiveShadow
        geometry={nodes.Object_17.geometry}
        material={materials.Ln1Mtl}
        position={[2.644, 2.327, 0.461]}
      />
      <mesh
        name="Object_19"
        castShadow
        receiveShadow
        geometry={nodes.Object_19.geometry}
        material={materials.Tire1Mtl}
        position={[1.019, 0.943, -0.008]}
      />
    </group>
  );
}

useGLTF.preload('/models/tesla.glb');
