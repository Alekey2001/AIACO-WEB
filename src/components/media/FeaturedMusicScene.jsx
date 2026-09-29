import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function ParticleSphere({
  count = 1800,
  radius = 2.35,
  color = '#00eefc',
  size = 0.018,
  opacity = 0.7,
  speed = 1,
  isPlaying = false,
}) {
  const pointsRef = useRef()

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i

      const pseudoRandom = Math.sin(i * 12.9898) * 43758.5453
      const randomValue =
        pseudoRandom - Math.floor(pseudoRandom)

      const variation =
        1 + (randomValue - 0.5) * 0.08

      const r = radius * variation

      const x =
        r * Math.sin(phi) * Math.cos(theta)

      const y =
        r * Math.cos(phi)

      const z =
        r * Math.sin(phi) * Math.sin(theta)

      array[i * 3] = x
      array[i * 3 + 1] = y
      array[i * 3 + 2] = z
    }

    return array
  }, [count, radius])

  useFrame((state) => {
    if (!pointsRef.current) return

    const t = state.clock.elapsedTime

    // Rotación ambiental
    pointsRef.current.rotation.y =
      t * 0.055 * speed

    pointsRef.current.rotation.x =
      Math.sin(t * 0.18) * 0.08

    // Movimiento con mouse
    const targetY =
      state.pointer.x * 0.22

    const targetX =
      -state.pointer.y * 0.12

    pointsRef.current.rotation.y +=
      (
        targetY -
        pointsRef.current.rotation.y
      ) * 0.015

    pointsRef.current.rotation.x +=
      (
        targetX -
        pointsRef.current.rotation.x
      ) * 0.015

    // Pulso musical simulado
    const bass =
      Math.sin(t * 3.4) * 0.5 +
      Math.sin(t * 6.8) * 0.22 +
      Math.sin(t * 1.3) * 0.15

    // En pausa: movimiento muy sutil
    // En reproducción: movimiento más fuerte
    const energy =
      isPlaying ? 0.065 : 0.012

    const pulse =
      1 + bass * energy

    pointsRef.current.scale.setScalar(pulse)
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

function ParticleRings() {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return

    const t = state.clock.elapsedTime

    groupRef.current.rotation.y =
      -t * 0.035

    groupRef.current.rotation.z =
      Math.sin(t * 0.2) * 0.12
  })

  return (
    <group ref={groupRef}>
      <mesh
        rotation={[
          Math.PI / 2.8,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[2.7, 0.006, 8, 180]}
        />

        <meshBasicMaterial
          color="#00eefc"
          transparent
          opacity={0.18}
        />
      </mesh>

      <mesh
        rotation={[
          Math.PI / 2.1,
          0.4,
          0,
        ]}
      >
        <torusGeometry
          args={[2.95, 0.004, 8, 180]}
        />

        <meshBasicMaterial
          color="#bd00ff"
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  )
}

export default function FeaturedMusicScene({
  isPlaying = false,
}) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 1,
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 7],
          fov: 48,
        }}
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
        }}
        style={{
          background: 'transparent',
        }}
      >
        {/* Esfera cyan principal */}
        <ParticleSphere
          count={1800}
          radius={2.35}
          color="#00eefc"
          size={0.022}
          opacity={0.85}
          speed={1}
          isPlaying={isPlaying}
        />

        {/* Esfera púrpura exterior */}
        <ParticleSphere
          count={900}
          radius={2.62}
          color="#bd00ff"
          size={0.015}
          opacity={0.45}
          speed={0.65}
          isPlaying={isPlaying}
        />

        <ParticleRings />
      </Canvas>
    </div>
  )
}