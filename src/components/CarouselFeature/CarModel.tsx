import * as THREE from 'three';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useEffect, useMemo, useRef, useState } from 'react';
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

export function CarModel({
  file,
  applyImage,
}: {
  file: File | null;
  applyImage: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Fallback texture for default view
  const fallbackTexture = useTexture('/textures/decalImg.png');

  const [customTexture, setCustomTexture] = useState<THREE.Texture | null>(
    null
  );

  // Generate blob URL only if image is applied
  const texturePath = useMemo(() => {
    return file && applyImage ? URL.createObjectURL(file) : null;
  }, [file, applyImage]);

  // Load custom texture manually when file and applyImage are valid
  useEffect(() => {
    if (texturePath) {
      const loader = new THREE.TextureLoader();
      loader.load(
        texturePath,
        (loadedTexture) => {
          setCustomTexture(loadedTexture);
        },
        undefined,
        (error) => {
          console.error('Failed to load custom texture', error);
        }
      );
    } else {
      setCustomTexture(null); // Reset to fallback when not applying
    }

    // Cleanup the blob URL
    return () => {
      if (texturePath) URL.revokeObjectURL(texturePath);
    };
  }, [texturePath]);

  const texture = customTexture ?? fallbackTexture;

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
        geometry={nodes.Object_6.geometry}
        material={materials.Geodoorl2sub11Mtl}
        position={[-1.021, 3.161, -0.17]}
      />
      <mesh
        geometry={nodes.Object_7.geometry}
        material={materials.Geodoorl2sub31Mtl}
        position={[0.062, 3.757, -2.659]}
      />
      <mesh
        geometry={nodes.Object_9.geometry}
        material={materials.Geodoorr2sub31Mtl}
        position={[1.006, 2.71, 0.495]}
      />
      <mesh
        geometry={nodes.Object_11.geometry}
        material={materials.Geohoodsub00021Mtl}
        position={[0, 2.176, 0]}
      >
        {texture && (
          <>
            <Decal
              position={[2.7, -0.5, 3.5]}
              rotation={[0, 0, degToRad(-1)]}
              scale={[3, 2, 1]}
            >
              <meshBasicMaterial
                map={texture}
                polygonOffset
                polygonOffsetFactor={-1}
                transparent
              />
            </Decal>
            <Decal
              position={[2.7, -0.5, -3.5]}
              rotation={[0, Math.PI, degToRad(1)]}
              scale={[3, 2, 1]}
            >
              <meshBasicMaterial
                map={texture}
                polygonOffset
                polygonOffsetFactor={-1}
                transparent
              />
            </Decal>
          </>
        )}
      </mesh>
      <mesh
        geometry={nodes.Object_12.geometry}
        material={materials.Geohoodsub00031Mtl}
        position={[6.5, 1.932, 0.815]}
      />
      <mesh
        geometry={nodes.Object_13.geometry}
        material={materials.Georimblurlfsub01Mtl}
        position={[1.545, 1.836, 0.042]}
      />
      <mesh
        geometry={nodes.Object_15.geometry}
        material={materials.Georimblurlfsub021Mtl}
        position={[1.02, 0.944, -0.007]}
      />
      <mesh
        geometry={nodes.Object_16.geometry}
        material={materials.Ln12Mtl}
        position={[-6.998, 2.674, -0.007]}
      />
      <mesh
        geometry={nodes.Object_17.geometry}
        material={materials.Ln1Mtl}
        position={[2.644, 2.327, 0.461]}
      />
      <mesh
        geometry={nodes.Object_19.geometry}
        material={materials.Tire1Mtl}
        position={[1.019, 0.943, -0.008]}
      />
    </group>
  );
}

useGLTF.preload('/models/tesla.glb');
