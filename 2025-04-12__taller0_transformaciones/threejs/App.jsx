import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Componente del cubo con animaciones
const AnimatedBox = () => {
  // Usamos un ref para el objeto 3D
  const ref = React.useRef();

  // Animación con useFrame
  useFrame((state, delta) => {
    // Traslación senoidal (movimiento en X)
    ref.current.position.x = Math.sin(state.clock.elapsedTime) * 2; // Oscilación en el eje X

    // Rotación constante sobre el eje Y
    ref.current.rotation.y += delta;

    // Escalado con función temporal (Math.sin)
    ref.current.scale.set(
      1 + Math.sin(state.clock.elapsedTime) * 12,  // Oscilación de la escala
      1 + Math.sin(state.clock.elapsedTime) * 10,
      1 + Math.sin(state.clock.elapsedTime) * 10
    );
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }} // Coloca la cámara para ver bien la esfera
    >
      {/* Agregamos OrbitControls para poder navegar en la escena */}
      <OrbitControls />
      {/* Luz en la escena */}
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} intensity={1} />
      {/* Objeto 3D con animaciones */}
      <AnimatedBox />
    </Canvas>
  );
};

export default App;
