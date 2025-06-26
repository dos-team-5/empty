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
  rotationSpeed,
}: {
  file: File | null;
  applyImage: boolean;
  rotationSpeed: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Fallback texture for default view
  const fallbackTexture = useTexture('/textures/uploadAdImage100.png');
  const [customTexture, setCustomTexture] = useState<THREE.Texture | null>(
    null
  );

  // Generate blob URL only if image is applied
  const texturePath = useMemo(() => {
    return file && applyImage ? URL.createObjectURL(file) : null;
  }, [file, applyImage]);

  // Function to create a texture with rounded corners and preserved aspect ratio
  const createRoundedTexture = (
    image: HTMLImageElement,
    radius: number
  ): THREE.Texture => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const imageAspect = image.width / image.height;
    const targetAspect = 3 / 2; // Decal's target aspect ratio
    const canvasWidth = 512; // Fixed canvas size for consistency
    const canvasHeight = canvasWidth / targetAspect;

    // Set canvas size
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Calculate image scaling to fit within canvas while preserving aspect ratio
    let drawWidth = canvasWidth;
    let drawHeight = canvasWidth / imageAspect;
    let offsetX = 0;
    let offsetY = 0;

    if (drawHeight > canvasHeight) {
      // Image is too tall, scale down to fit height
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imageAspect;
      offsetX = (canvasWidth - drawWidth) / 2;
    } else {
      // Image fits or is too wide, center vertically
      offsetY = (canvasHeight - drawHeight) / 2;
    }

    // Create rounded rectangle path
    ctx.beginPath();
    ctx.moveTo(radius + offsetX, offsetY);
    ctx.lineTo(drawWidth - radius + offsetX, offsetY);
    ctx.quadraticCurveTo(
      drawWidth + offsetX,
      offsetY,
      drawWidth + offsetX,
      radius + offsetY
    );
    ctx.lineTo(drawWidth + offsetX, drawHeight - radius + offsetY);
    ctx.quadraticCurveTo(
      drawWidth + offsetX,
      drawHeight + offsetY,
      drawWidth - radius + offsetX,
      drawHeight + offsetY
    );
    ctx.lineTo(radius + offsetX, drawHeight + offsetY);
    ctx.quadraticCurveTo(
      offsetX,
      drawHeight + offsetY,
      offsetX,
      drawHeight - radius + offsetY
    );
    ctx.lineTo(offsetX, radius + offsetY);
    ctx.quadraticCurveTo(offsetX, offsetY, radius + offsetX, offsetY);
    ctx.closePath();

    // Clip to the rounded rectangle
    ctx.clip();

    // Draw the image, scaled and centered
    ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

    // Create texture from canvas
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  // Load and process custom texture with rounded corners
  useEffect(() => {
    if (texturePath) {
      const loader = new THREE.TextureLoader();
      loader.load(
        texturePath,
        (loadedTexture) => {
          const img = loadedTexture.image;
          // Apply rounded corners (radius in pixels, adjust as needed)
          const roundedTexture = createRoundedTexture(img, 50); // 50px radius for corners
          setCustomTexture(roundedTexture);
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
      groupRef.current.rotation.y -= rotationSpeed;
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
