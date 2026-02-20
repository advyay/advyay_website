'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Points, PointMaterial } from '@react-three/drei'
import { useMemo } from 'react'

export default function NeuralNetwork() {

  const points = useMemo(() => {
    const positions = new Float32Array(5000 * 3)
    for (let i = 0; i < 5000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40

    }
    return positions
  }, [])

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 12] }}
        className="w-full h-full"
      >
        <Points positions={points}>
          <PointMaterial color="#5865F2" size={0.02} />
        </Points>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  )
}
