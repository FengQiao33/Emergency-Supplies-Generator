import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

function RotatingBox() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color="#4A90E2"
        metalness={0.8}
        roughness={0.2}
        emissive="#1a3a5e"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function FloatingSpheres() {
  const spheres = useRef<THREE.Mesh[]>([]);

  useFrame((state, delta) => {
    spheres.current.forEach((sphere, i) => {
      if (sphere) {
        const time = state.clock.elapsedTime;
        sphere.position.y = Math.sin(time + i) * 0.5;
        sphere.rotation.x += delta * 0.5;
        sphere.rotation.z += delta * 0.3;
      }
    });
  });

  return (
    <>
      {[-2, 0, 2].map((x, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) spheres.current[i] = el;
          }}
          position={[x, 0, -2]}
        >
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color={i === 0 ? "#50C878" : i === 1 ? "#FFB84D" : "#FF6B6B"}
            metalness={0.7}
            roughness={0.3}
            emissive={i === 0 ? "#1a4a2e" : i === 1 ? "#4a3a1a" : "#4a1a1a"}
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
    </>
  );
}

export function Scene3D() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "40%",
        height: "100vh",
        zIndex: 1,
        opacity: 0.6,
        pointerEvents: "none",
      }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4A90E2" />
        <RotatingBox />
        <FloatingSpheres />
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
