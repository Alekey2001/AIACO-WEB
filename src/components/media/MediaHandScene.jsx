import { Canvas, useFrame } from '@react-three/fiber'
import { Bounds, Float, useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import * as THREE from 'three'
function MouseLight() {
  const lightRef = useRef()

  useFrame((state) => {
    if (!lightRef.current) return

    const targetX = state.pointer.x * 3.5
    const targetY = state.pointer.y * 2.2

    lightRef.current.position.x = THREE.MathUtils.lerp(
      lightRef.current.position.x,
      targetX,
      0.08
    )

    lightRef.current.position.y = THREE.MathUtils.lerp(
      lightRef.current.position.y,
      targetY,
      0.08
    )

    lightRef.current.position.z = 4
  })

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 4]}
      intensity={7}
      distance={12}
      decay={1.8}
      color="#00eefc"
    />
  )
}
function InteractiveHand() {
  const groupRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })

  const { scene } = useGLTF('/models/hand.glb')

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    scene.traverse((child) => {
      if (!child.isMesh) return

      child.castShadow = true
      child.receiveShadow = true

      if (child.material) {
        child.material.side = THREE.DoubleSide

        if ('metalness' in child.material) {
          child.material.metalness = Math.max(
            child.material.metalness ?? 0,
            0.55
          )
        }

        if ('roughness' in child.material) {
          child.material.roughness = 0.3
        }

        child.material.needsUpdate = true
      }
    })
  }, [scene])

useFrame(() => {
  if (!groupRef.current) return

  const mouseX = mouseRef.current.x
  const mouseY = mouseRef.current.y

  // Giro horizontal amplio:
  // permite apreciar palma, dedos y laterales
  const targetRotationY = mouseX * 1.0

  // Inclinación vertical más moderada
  const targetRotationX = mouseY * 0.60

  // Ligera inclinación lateral para dar sensación orgánica
  const targetRotationZ = -mouseX * 0.045

  groupRef.current.rotation.x = THREE.MathUtils.lerp(
    groupRef.current.rotation.x,
    targetRotationX,
    0.035
  )

  groupRef.current.rotation.y = THREE.MathUtils.lerp(
    groupRef.current.rotation.y,
    targetRotationY,
    0.035
  )

  groupRef.current.rotation.z = THREE.MathUtils.lerp(
    groupRef.current.rotation.z,
    targetRotationZ,
    0.03
  )
})

  return (
 <Float
  speed={0.45}
  rotationIntensity={0.008}
  floatIntensity={0.02}
  floatingRange={[-0.01, 0.01]}
>
  <group ref={groupRef}>
    <primitive object={scene} />
  </group>
</Float>
  )
}

export default function MediaHandScene() {
  return (
    <div
      className="absolute inset-0"
      style={{
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 42,
          near: 0.1,
          far: 1000,
        }}
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
        }}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
      >
        {/* Luz ambiental */}
        <ambientLight intensity={1.2} />

        {/* Luz blanca frontal */}
        <directionalLight
          position={[4, 5, 6]}
          intensity={3.5}
          color="#ffffff"
        />

        {/* Luz cyan */}
       <MouseLight />
        {/* Luz púrpura */}
        <pointLight
  position={[-3, -1, -2]}
  intensity={3}
  distance={10}
  color="#bd00ff"
/>

        {/* Contraluz */}
        <pointLight
          position={[0, 3, -3]}
          intensity={2}
          color="#ffffff"
        />

        <Suspense fallback={null}>
          <Bounds
            fit
            clip
            observe
            margin={1.25}
          >
            <InteractiveHand />
          </Bounds>
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/models/hand.glb')