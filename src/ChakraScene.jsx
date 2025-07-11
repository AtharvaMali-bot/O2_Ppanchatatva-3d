import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { useState, useRef } from 'react'

const elements = [
  { name: 'Akash', color: 'skyblue', shape: 'torus' },
  { name: 'Vayu', color: 'lightgreen', shape: 'cone' },
  { name: 'Agni', color: 'orange', shape: 'octahedron' },
  { name: 'Jal', color: 'blue', shape: 'sphere' },
  { name: 'Prithvi', color: 'brown', shape: 'box' },
]

function ChakraShape({ position, color, name, shape, onClick, selected }) {
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={selected ? 1.5 : 1}
      onClick={onClick}
    >
      {
        shape === 'box' ? <boxGeometry args={[1, 1, 1]} /> :
        shape === 'sphere' ? <sphereGeometry args={[0.7, 32, 32]} /> :
        shape === 'cone' ? <coneGeometry args={[0.7, 1.2, 32]} /> :
        shape === 'torus' ? <torusGeometry args={[0.6, 0.2, 16, 100]} /> :
        shape === 'octahedron' ? <octahedronGeometry args={[0.7]} /> :
        null
      }
      <meshStandardMaterial color={color} />
      <Html distanceFactor={10}>
        <div style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
          {name}
        </div>
      </Html>
    </mesh>
  )
}

export default function ChakraScene() {
  const [selected, setSelected] = useState(null)
  const radius = 3
  const angleStep = (2 * Math.PI) / elements.length

  return (
    <Canvas style={{ height: '500px' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} />
      <OrbitControls />

      {elements.map((el, idx) => {
        const angle = idx * angleStep
        const x = radius * Math.cos(angle)
        const z = radius * Math.sin(angle)

        return (
          <ChakraShape
            key={idx}
            position={[x, 0, z]}
            color={el.color}
            name={el.name}
            shape={el.shape}
            selected={selected === el.name}
            onClick={() => setSelected(el.name)}
          />
        )
      })}
    </Canvas>
  )
}
