import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'

// Configuración del terreno
const CHUNK_SIZE = 16 // Tamaño del chunk (16x16 como Minecraft)
const MAX_HEIGHT = 8 // Altura máxima de los bloques

// Función para generar altura aleatoria
function generateHeight(x, z) {
    // Usar una combinación de seno y coseno para crear colinas
    const scale = 0.1
    const height = Math.sin(x * scale) * Math.cos(z * scale) * 3
    // Añadir algo de ruido aleatorio
    const noise = Math.random() * 2
    // Asegurar que la altura esté entre 0 y MAX_HEIGHT
    return Math.max(0, Math.min(MAX_HEIGHT, Math.floor(height + noise + 4)))
}

// Función para crear el terreno
function crearTerreno(width, depth, textures) {
    const blocks = []
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)

    // Materiales de respaldo en caso de que las texturas no se carguen
    const fallbackMaterials = {
        grass: new THREE.MeshStandardMaterial({ color: 0x4CAF50, roughness: 0.8, metalness: 0.2 }),
        dirt: new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.8, metalness: 0.2 }),
        rock: new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.9, metalness: 0.1 })
    }

    for (let x = 0; x < width; x++) {
        for (let z = 0; z < depth; z++) {
            const height = generateHeight(x, z)
            
            // Crear columna de bloques
            for (let y = 0; y < height; y++) {
                // Seleccionar material basado en la altura
                let material
                if (y === height - 1) {
                    // Capa superior (pasto)
                    material = textures?.grass ? 
                        new THREE.MeshPhysicalMaterial({
                            ...textures.grass,
                            roughness: 0.8,
                            metalness: 0.2,
                            envMapIntensity: 1
                        }) : fallbackMaterials.grass
                } else if (y > height - 3) {
                    // Capa de tierra
                    material = textures?.dirt ?
                        new THREE.MeshPhysicalMaterial({
                            ...textures.dirt,
                            roughness: 0.8,
                            metalness: 0.2,
                            envMapIntensity: 1
                        }) : fallbackMaterials.dirt
                } else {
                    // Capa de piedra
                    material = textures?.rock ?
                        new THREE.MeshPhysicalMaterial({
                            ...textures.rock,
                            roughness: 0.9,
                            metalness: 0.1,
                            envMapIntensity: 1
                        }) : fallbackMaterials.rock
                }

                blocks.push(
                    <mesh
                        key={`${x}-${y}-${z}`}
                        position={[x - width/2, y, z - depth/2]}
                        geometry={cubeGeometry}
                        material={material}
                    />
                )
            }
        }
    }

    return blocks
}

export function VoxelWorld() {
    const terrainGroupRef = useRef()
    const [textures, setTextures] = useState(null)
    const [error, setError] = useState(null)

    // Cargar texturas con manejo de errores
    const grassTextures = useTexture({
        map: '/textures/Grass/Grass005_1K-JPG_Color.jpg',
        roughnessMap: '/textures/Grass/Grass005_1K-JPG_Roughness.jpg',
        normalMap: '/textures/Grass/Grass005_1K-JPG_NormalGL.jpg',
        aoMap: '/textures/Grass/Grass005_1K-JPG_AmbientOcclusion.jpg'
    }, (loaded) => {
        console.log('Texturas de pasto cargadas:', loaded)
    }, (error) => {
        console.error('Error cargando texturas de pasto:', error)
        setError('Error cargando texturas de pasto')
    })

    const dirtTextures = useTexture({
        map: '/textures/Ground/Ground085_1K-JPG_Color.jpg',
        roughnessMap: '/textures/Ground/Ground085_1K-JPG_Roughness.jpg',
        normalMap: '/textures/Ground/Ground085_1K-JPG_NormalGL.jpg',
        aoMap: '/textures/Ground/Ground085_1K-JPG_AmbientOcclusion.jpg'
    }, (loaded) => {
        console.log('Texturas de tierra cargadas:', loaded)
    }, (error) => {
        console.error('Error cargando texturas de tierra:', error)
        setError('Error cargando texturas de tierra')
    })

    const asphaltTextures = useTexture({
        map: '/textures/Asphalt/Asphalt031_1K-JPG_Color.jpg',
        roughnessMap: '/textures/Asphalt/Asphalt031_1K-JPG_Roughness.jpg',
        normalMap: '/textures/Asphalt/Asphalt031_1K-JPG_NormalGL.jpg',
        aoMap: '/textures/Asphalt/Asphalt031_1K-JPG_AmbientOcclusion.jpg'
    }, (loaded) => {
        console.log('Texturas de asfalto cargadas:', loaded)
    }, (error) => {
        console.error('Error cargando texturas de asfalto:', error)
        setError('Error cargando texturas de asfalto')
    })

    useEffect(() => {
        if (!error) {
            setTextures({
                grass: grassTextures,
                dirt: dirtTextures,
                rock: asphaltTextures
            })
        }
    }, [grassTextures, dirtTextures, asphaltTextures, error])

    const blocks = crearTerreno(CHUNK_SIZE, CHUNK_SIZE, textures)

    return (
        <group ref={terrainGroupRef}>
            {blocks}
        </group>
    )
} 