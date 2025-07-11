import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { useState, useRef } from 'react'

const elements = [
  { name: 'Akash', color: 'blue' },
  { name: 'Vayu', color: 'green' },
  { name: 'Agni', color: 'yellow' },
  { name: 'Jal', color: 'orange' },
  { name: 'Prithvi', color: 'red' },
]

function ChakraCube({ position, color, name, onClick, selected }) {
  const meshRef = useRef()

  // Slight rotation animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={onClick}
      scale={selected ? 1.5 : 1}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
      <Html distanceFactor={10}>
        <div style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>{name}</div>
      </Html>
    </mesh>
  )
}

export default function ChakraScene() {
  const [selected, setSelected] = useState(null)

  // Circular layout
  const radius = 3
  const angleStep = (2 * Math.PI) / elements.length

  return (
    <Canvas style={{ height: '500px' }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 5, 2]} />

      {elements.map((el, idx) => {
        const angle = idx * angleStep
        const x = radius * Math.cos(angle)
        const z = radius * Math.sin(angle)

        return (
          <ChakraCube
            key={idx}
            position={[x, 0, z]}
            color={el.color}
            name={el.name}
            selected={selected === el.name}
            onClick={() => setSelected(el.name)}
          />
        )
      })}

      <OrbitControls />
    </Canvas>
  )
}
