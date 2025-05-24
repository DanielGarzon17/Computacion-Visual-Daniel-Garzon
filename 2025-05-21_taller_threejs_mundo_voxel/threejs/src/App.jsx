import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { VoxelWorld } from './components/VoxelWorld'
import './App.css'

function Scene() {
  return (
    <>
      {/* Color de fondo */}
      <color attach="background" args={['#87CEEB']} />

      {/* Luces */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Mundo Voxel */}
      <VoxelWorld />

      {/* Controles de órbita */}
      <OrbitControls />
    </>
  )
}

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [15, 15, 15], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  )
}

export default App

