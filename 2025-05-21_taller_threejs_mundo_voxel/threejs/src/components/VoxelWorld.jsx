import { useRef, useState, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'

// Configuración del terreno
const CHUNK_SIZE = 50 // Tamaño del chunk (16x16 como Minecraft)
const MAX_HEIGHT = 8 // Altura máxima de los bloques

// Función para generar un valle amplio con río
function generateHeight(x, z) {
    const riverCenterZ = CHUNK_SIZE / 2; // Centro del río/valle en el eje Z

    // Calcular la distancia al centro del río en el eje Z
    const distToRiver = Math.abs(z - riverCenterZ);

    // Definir el ancho del río y la pendiente del valle (ajustado para ser más plano)
    const riverWidth = 3; // Ancho del río (en bloques)
    const valleySlope = 0.2; // Inclinación de las laderas del valle (reducido)

    let height = distToRiver * valleySlope; // La altura aumenta con la distancia al río

    // Asegurar que la altura sea 0 en la zona del río
    if (distToRiver < riverWidth / 2) {
        height = 0;
    }
    
    // Añadir algo de variación de altura a lo largo del eje X y Z para simular terreno irregular
    // Usaremos funciones seno para una variación simple, se podría usar ruido Perlin para algo más natural
    const noiseX = Math.sin(x * 0.1) * 0.5; // Ajusta la frecuencia y amplitud del ruido en X (reducido)
    const noiseZ = Math.sin(z * 0.1) * 0.5; // Ajusta la frecuencia y amplitud del ruido en Z (reducido)
    
    height += noiseX + noiseZ;

    // Asegurar que la altura esté entre 0 y MAX_HEIGHT y añadir una altura base
    const baseElevation = 1; // Altura mínima del terreno fuera del río (ajustado)
    return Math.max(0, Math.min(MAX_HEIGHT, Math.floor(height + baseElevation)));
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

// Función para configurar la iluminación de la escena
function configurarIluminacion() {
    return (
        <>
            {/* Luz direccional (sol) */}
            <directionalLight
                position={[10, 20, 10]}
                intensity={1.5}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            
            {/* Luz ambiental para iluminar zonas oscuras */}
            <ambientLight intensity={0.4} />
            
            {/* Luz puntual adicional para dar más profundidad */}
            <pointLight
                position={[-10, 10, -10]}
                intensity={0.5}
                color="#ffcc99"
            />
        </>
    )
}

// Función para crear objetos primitivos
function crearObjeto(tipo, posicion, material) {
    let geometria;
    let alturaObjeto = 0; 
    let radialSegments = 6;
    
    switch(tipo) {
        case 'esfera':
            geometria = new THREE.SphereGeometry(0.5, 32, 32); // Mantenemos esferas suaves si se usan en otro lado
            alturaObjeto = 1.0;
            break;
        case 'cilindro':
            geometria = new THREE.CylinderGeometry(0.3, 0.3, 2, radialSegments); // Usar segmentos reducidos
            alturaObjeto = 2.0;
            break;
        case 'cono':
            geometria = new THREE.ConeGeometry(0.5, 1.5, radialSegments); // Usar segmentos reducidos
            alturaObjeto = 1.5;
            break;
        case 'torus':
            geometria = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
             alturaObjeto = 0.4;
            break;
        default:
            geometria = new THREE.BoxGeometry(1, 1, 1);
            alturaObjeto = 1.0;
    }

    // posicion[1] es la coordenada Y donde queremos que esté la BASE del objeto.
    // El centro del objeto (en su coordenada local) está a alturaObjeto / 2 por encima de su base local.
    // Por lo tanto, la coordenada Y global del centro debe ser posicion[1] + alturaObjeto / 2.
    const yCentroObjeto = posicion[1] + alturaObjeto / 2;
    
    const posicionAjustada = [posicion[0], yCentroObjeto, posicion[2]];

    return (
        <mesh
            position={posicionAjustada}
            geometry={geometria}
            material={material}
            castShadow // Este objeto proyectará sombras
            receiveShadow // Este objeto recibirá sombras
        />
    );
}

// Función para crear un árbol (pino con 2 conos)
function crearArbol(x, y, z, materialTronco, materialHojas) {
    // La posición Y (y) aquí es la coordenada Y donde queremos la BASE del tronco.
    const baseTroncoY = y;

    return (
        <group position={[x, baseTroncoY, z]}>
            {/* Tronco */}
            {crearObjeto('cilindro', [0, 0, 0], materialTronco)} {/* La base del cilindro estará en baseTroncoY */}
            
            {/* Copa del árbol (2 conos intersecados) */}
            {/* Cono 1 */}
            <mesh
                position={[0, 2.5, 0]} // Posicionar encima del tronco
                geometry={new THREE.ConeGeometry(1, 3, 6)} // Radio base 1, altura 3, 6 segmentos
                material={materialHojas}
                castShadow // Este cono proyectará sombras
            />
            {/* Cono 2 (rotado 90 grados en Y) */}
             <mesh
                position={[0, 2.5, 0]} // Misma posición base que el cono 1
                geometry={new THREE.ConeGeometry(1, 3, 6)} // Misma geometría
                material={materialHojas}
                rotation={[0, Math.PI / 2, 0]} // Rotar 90 grados en Y
                castShadow // Este cono proyectará sombras
            />
        </group>
    );
}

// Función para crear un animal simple
function crearAnimal(x, y, z, material) {
    return (
        <group position={[x, y, z]}>
            {/* Cuerpo */}
            {crearObjeto('esfera', [0, 0.5, 0], material)}
            {/* Cabeza */}
            {crearObjeto('esfera', [0.5, 0.8, 0], material)}
            {/* Ojos */}
            {crearObjeto('esfera', [0.7, 0.9, 0.2], new THREE.MeshStandardMaterial({ color: 0x000000 }))}
            {crearObjeto('esfera', [0.7, 0.9, -0.2], new THREE.MeshStandardMaterial({ color: 0x000000 }))}
        </group>
    );
}

// Función para crear una planta
function crearPlanta(x, y, z, material) {
    return (
        <group position={[x, y, z]}>
            {/* Tallo */}
            {crearObjeto('cilindro', [0, 0.3, 0], material)}
            {/* Hojas */}
            {crearObjeto('esfera', [0.2, 0.6, 0], material)}
            {crearObjeto('esfera', [-0.2, 0.6, 0], material)}
        </group>
    );
}

// Función para crear una roca
function crearRoca(x, y, z, material) {
    return crearObjeto('esfera', [x, y, z], material);
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

    // Materiales para los objetos decorativos
    const materialTronco = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.9 });
    const materialHojas = new THREE.MeshStandardMaterial({
        color: 0x228B22, 
        roughness: 0.8, 
        transparent: true, // Habilitar transparencia
        opacity: 0.7 // Nivel de opacidad (0.0 es completamente transparente, 1.0 es opaco)
    });
    const materialAnimal = new THREE.MeshStandardMaterial({ color: 0xDEB887, roughness: 0.7 });
    const materialPlanta = new THREE.MeshStandardMaterial({ color: 0x90EE90, roughness: 0.6 });
    const materialRoca = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.9 });

    const blocks = crearTerreno(CHUNK_SIZE, CHUNK_SIZE, textures)

    // Generar elementos decorativos una sola vez y mantenerlos estáticos
    const elementosDecorativos = useMemo(() => {
        const elementos = [];
        
        // Función para obtener la coordenada Y de la superficie superior del bloque
        // generateHeight espera coordenadas X y Z en el rango 0 a CHUNK_SIZE-1
        const getSurfaceY = (xGrid, zGrid) => {
            const alturaBloques = generateHeight(xGrid, zGrid);
            // La superficie superior del bloque más alto (en Y = alturaBloques - 1) está en Y = (alturaBloques - 1) + 0.5 = alturaBloques - 0.5.
            return alturaBloques - 0.5; 
        };
        
        // Función para generar una posición aleatoria dentro del chunk (0 a CHUNK_SIZE-1)
        const generarPosicionAleatoriaTerreno = () => {
            const x = Math.floor(Math.random() * CHUNK_SIZE);
            const z = Math.floor(Math.random() * CHUNK_SIZE);
            return [x, z];
        };

        // Generar elementos decorativos aleatoriamente sobre el terreno
        
        // Generar árboles (en áreas más altas del terreno plano)
        for (let i = 0; i < 20; i++) { 
            const [xGrid, zGrid] = generarPosicionAleatoriaTerreno();
            const ySurface = getSurfaceY(xGrid, zGrid); // Obtener la coordenada Y de la superficie
            // Colocar árboles en áreas con altura de superficie >= 2
             if (ySurface >= 2 - 0.5) { // Ajustar la condición a la coordenada Y de la superficie
                // Ajustar posición X y Z para centrar en el mundo (-CHUNK_SIZE/2)
                // Pasar ySurface como la coordenada Y donde queremos la BASE del árbol
                elementos.push(crearArbol(xGrid - CHUNK_SIZE/2, ySurface, zGrid - CHUNK_SIZE/2, materialTronco, materialHojas));
            }
        }

        // Generar animales (en áreas medias del terreno plano)
        for (let i = 0; i < 15; i++) { 
            const [xGrid, zGrid] = generarPosicionAleatoriaTerreno();
            const ySurface = getSurfaceY(xGrid, zGrid); // Obtener la coordenada Y de la superficie
            // Colocar animales en áreas con altura de superficie entre 1 y 3
            if (ySurface >= 1 - 0.5 && ySurface <= 3 - 0.5) { // Ajustar la condición
                 // Ajustar posición X y Z para centrar en el mundo (-CHUNK_SIZE/2)
                 // Pasar ySurface como la coordenada Y donde queremos la BASE del animal
                elementos.push(crearAnimal(xGrid - CHUNK_SIZE/2, ySurface, zGrid - CHUNK_SIZE/2, materialAnimal));
            }
        }

        // Generar plantas (en áreas bajas cerca del río)
        for (let i = 0; i < 30; i++) { 
            const [xGrid, zGrid] = generarPosicionAleatoriaTerreno();
             const ySurface = getSurfaceY(xGrid, zGrid); // Obtener la coordenada Y de la superficie
            // Colocar plantas en áreas con altura de superficie < 2
            if (ySurface < 2 - 0.5 && ySurface >= 0 - 0.5) { // Ajustar la condición
                 // Ajustar posición X y Z para centrar en el mundo (-CHUNK_SIZE/2)
                 // Pasar ySurface como la coordenada Y donde queremos la BASE de la planta
                elementos.push(crearPlanta(xGrid - CHUNK_SIZE/2, ySurface, zGrid - CHUNK_SIZE/2, materialPlanta));
            }
        }

        // Generar rocas (en cualquier área con terreno)
        for (let i = 0; i < 25; i++) { 
            const [xGrid, zGrid] = generarPosicionAleatoriaTerreno();
             const ySurface = getSurfaceY(xGrid, zGrid); // Obtener la coordenada Y de la superficie
             if (ySurface >= 0 - 0.5) { // Ajustar la condición
                 // Ajustar posición X y Z para centrar en el mundo (-CHUNK_SIZE/2)
                 // Pasar ySurface como la coordenada Y donde queremos la BASE de la roca
                elementos.push(crearRoca(xGrid - CHUNK_SIZE/2, ySurface, zGrid - CHUNK_SIZE/2, materialRoca));
            }
        }

        return elementos;
    }, []); // El array vacío significa que esto solo se ejecutará una vez

    return (
        <group ref={terrainGroupRef}>
            {configurarIluminacion()}
            {blocks}
            {elementosDecorativos}
        </group>
    )
} 