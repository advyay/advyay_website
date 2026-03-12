'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'

function NeuralSystem() {
  const groupRef = useRef<THREE.Group>(null!)
  const linesRef = useRef<THREE.LineSegments>(null!)

  const nodeCount = 180
  const connectionDistance = 2.5

  const nodes = useMemo(() => {
    return new Array(nodeCount).fill(0).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 18
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015
      )
    }))
  }, [])

  const positions = useMemo(() => new Float32Array(nodeCount * 3), [])

  useFrame(({ clock }) => {
    const linePositions: number[] = []

    nodes.forEach((node, i) => {
      node.position.add(node.velocity)

      // Soft boundary bounce
      if (Math.abs(node.position.x) > 9) node.velocity.x *= -1
      if (Math.abs(node.position.y) > 9) node.velocity.y *= -1
      if (Math.abs(node.position.z) > 9) node.velocity.z *= -1

      positions[i * 3] = node.position.x
      positions[i * 3 + 1] = node.position.y
      positions[i * 3 + 2] = node.position.z
    })

    // Dynamic connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position)
        if (distance < connectionDistance) {
          linePositions.push(
            nodes[i].position.x,
            nodes[i].position.y,
            nodes[i].position.z,
            nodes[j].position.x,
            nodes[j].position.y,
            nodes[j].position.z
          )
        }
      }
    }

    if (linesRef.current) {
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(linePositions, 3)
      )
      linesRef.current.geometry.dispose()
      linesRef.current.geometry = geometry
    }

    // Subtle system drift
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.05
  })

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#4F9DFF"
          size={0.08}
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Connections */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.18}
        />
      </lineSegments>
    </group>
  )
}

export default function NeuralNetwork() {
  return (
    <div className="w-full h-full">
      <Canvas
        // style={{width:'200%', height:'200%'}}
        camera={{ position: [0, 0, 16], fov: 0 }}
        gl={{ antialias: true }}
      >
        <fog attach="fog" args={['#070B14', 15, 35]} />
        <ambientLight intensity={0.6} />
        <NeuralSystem />
      </Canvas>
    </div>
  )
}