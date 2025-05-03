import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, useProgress } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';
import { useState, Suspense } from 'react';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)} % loaded</Html>;
}

function Model({ format }) {
  const obj = useLoader(OBJLoader, '/models/FinalBaseMesh.obj');
  const stl = useLoader(STLLoader, '/models/FinalBaseMesh.stl');
  const gltf = useGLTF('/models/FinalBaseMesh.glb');

  let geometry = null;
  let name = "";
  let vertexCount = 0;

  if (format === "OBJ") {
    geometry = obj.children[0].geometry;
    name = "OBJ";
    vertexCount = geometry.attributes.position.count;
  } else if (format === "STL") {
    geometry = stl.geometry;
    name = "STL";
    vertexCount = geometry.attributes.position.count;
  } else if (format === "GLTF") {
    const firstNode = Object.values(gltf.nodes)[0];
    geometry = firstNode.geometry;
    name = "GLTF";
    vertexCount = geometry.attributes.position.count;
  }

  return (
    <>
      <mesh geometry={geometry} scale={0.5}>
        <meshStandardMaterial color="orange" />
      </mesh>
      <Html position={[0, -1.5, 0]}>
        <div style={{ background: 'white', padding: '0.5rem', borderRadius: '8px' }}>
          <strong>{name}</strong> — {vertexCount} vertices
        </div>
      </Html>
    </>
  );
}

function App() {
  const [format, setFormat] = useState("OBJ");

  return (
    <>
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
        <select onChange={(e) => setFormat(e.target.value)} value={format}>
          <option value="OBJ">OBJ</option>
          <option value="STL">STL</option>
          <option value="GLTF">GLTF</option>
        </select>
      </div>

      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={<Loader />}>
          <Model format={format} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
