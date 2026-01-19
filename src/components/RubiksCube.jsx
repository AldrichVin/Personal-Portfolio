import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, Float } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

const CUBE_SIZE = 0.85
const GAP = 0.1
const TOTAL_SIZE = CUBE_SIZE + GAP

const COLORS = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  tertiary: '#22d3ee',
  neutral1: '#f5f5f5',
  neutral2: '#e5e5e5',
  neutral3: '#d4d4d4',
}

const cubeColorArray = [
  COLORS.primary,
  COLORS.secondary,
  COLORS.tertiary,
  COLORS.neutral1,
  COLORS.neutral2,
  COLORS.neutral3,
]

const generateCubeData = () => {
  const data = []
  let index = 0
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        data.push({
          id: index,
          gridPos: { x, y, z },
          position: [x * TOTAL_SIZE, y * TOTAL_SIZE, z * TOTAL_SIZE],
          color: cubeColorArray[(index + Math.floor(Math.random() * 3)) % cubeColorArray.length],
        })
        index++
      }
    }
  }
  return data
}

const CUBE_DATA = generateCubeData()

const PhysicsState = {
  velocities: CUBE_DATA.map(() => ({ x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 })),
  positions: CUBE_DATA.map(c => ({ x: c.position[0], y: c.position[1], z: c.position[2] })),
  rotations: CUBE_DATA.map(() => ({ x: 0, y: 0, z: 0 })),
}

const SingleCube = ({ data, index, phase }) => {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const { viewport } = useThree()

  useFrame((state, delta) => {
    if (!meshRef.current) return

    const clampedDelta = Math.min(delta, 0.05)

    if (hovered && phase === 'idle') {
      meshRef.current.scale.lerp(new THREE.Vector3(1.15, 1.15, 1.15), 0.1)
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }

    const vel = PhysicsState.velocities[index]
    const pos = PhysicsState.positions[index]
    const rot = PhysicsState.rotations[index]

    if (phase === 'explode') {
      vel.y -= 20 * clampedDelta

      pos.x += vel.x * clampedDelta
      pos.y += vel.y * clampedDelta
      pos.z += vel.z * clampedDelta

      rot.x += vel.rx * clampedDelta
      rot.y += vel.ry * clampedDelta
      rot.z += vel.rz * clampedDelta

      const boundsX = viewport.width * 0.6
      const boundsY = viewport.height * 0.5
      const boundsZ = 6

      if (Math.abs(pos.x) > boundsX) {
        vel.x *= -0.5
        pos.x = Math.sign(pos.x) * boundsX
      }
      if (pos.y < -boundsY) {
        vel.y *= -0.4
        pos.y = -boundsY
        vel.x *= 0.8
        vel.z *= 0.8
        vel.rx *= 0.6
        vel.ry *= 0.6
        vel.rz *= 0.6
      }
      if (Math.abs(pos.z) > boundsZ) {
        vel.z *= -0.5
        pos.z = Math.sign(pos.z) * boundsZ
      }

      meshRef.current.position.set(pos.x, pos.y, pos.z)
      meshRef.current.rotation.set(rot.x, rot.y, rot.z)

    } else if (phase === 'reassemble') {
      const target = data.position
      const lerpFactor = 0.06

      pos.x += (target[0] - pos.x) * lerpFactor
      pos.y += (target[1] - pos.y) * lerpFactor
      pos.z += (target[2] - pos.z) * lerpFactor

      rot.x *= 0.9
      rot.y *= 0.9
      rot.z *= 0.9

      vel.x = vel.y = vel.z = 0
      vel.rx = vel.ry = vel.rz = 0

      meshRef.current.position.set(pos.x, pos.y, pos.z)
      meshRef.current.rotation.set(rot.x, rot.y, rot.z)

    } else if (phase === 'idle') {
      const target = data.position
      const lerpFactor = 0.1

      pos.x += (target[0] - pos.x) * lerpFactor
      pos.y += (target[1] - pos.y) * lerpFactor
      pos.z += (target[2] - pos.z) * lerpFactor

      rot.x *= 0.92
      rot.y *= 0.92
      rot.z *= 0.92

      meshRef.current.position.set(pos.x, pos.y, pos.z)
      meshRef.current.rotation.set(rot.x, rot.y, rot.z)
    }
  })

  return (
    <RoundedBox
      ref={meshRef}
      args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]}
      radius={0.1}
      smoothness={4}
      position={data.position}
      castShadow
      receiveShadow
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial
        color={data.color}
        metalness={0.15}
        roughness={0.25}
        envMapIntensity={0.6}
      />
    </RoundedBox>
  )
}

const RubiksCubeGroup = ({ phase }) => {
  const groupRef = useRef()
  const prevPhaseRef = useRef(phase)

  useEffect(() => {
    if (phase === 'explode' && prevPhaseRef.current !== 'explode') {
      CUBE_DATA.forEach((cube, i) => {
        const dir = new THREE.Vector3(...cube.position).normalize()
        PhysicsState.velocities[i] = {
          x: dir.x * 10 + (Math.random() - 0.5) * 5,
          y: Math.random() * 8 + 5,
          z: dir.z * 10 + (Math.random() - 0.5) * 5,
          rx: (Math.random() - 0.5) * 12,
          ry: (Math.random() - 0.5) * 12,
          rz: (Math.random() - 0.5) * 12
        }
      })
    }

    if (phase === 'idle' && prevPhaseRef.current !== 'idle') {
      CUBE_DATA.forEach((cube, i) => {
        PhysicsState.positions[i] = {
          x: cube.position[0],
          y: cube.position[1],
          z: cube.position[2]
        }
        PhysicsState.rotations[i] = { x: 0, y: 0, z: 0 }
        PhysicsState.velocities[i] = { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 }
      })
    }

    prevPhaseRef.current = phase
  }, [phase])

  useEffect(() => {
    if (!groupRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 30,
        repeat: -1,
        ease: 'none'
      })

      gsap.to(groupRef.current.rotation, {
        x: 0.2,
        z: 0.1,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <group ref={groupRef}>
      {CUBE_DATA.map((cube, i) => (
        <SingleCube
          key={cube.id}
          data={cube}
          index={i}
          phase={phase}
        />
      ))}
    </group>
  )
}

const Scene = ({ phase }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.3} />
      <pointLight position={[0, 5, 0]} intensity={0.4} color={COLORS.primary} />
      <pointLight position={[-3, -3, 3]} intensity={0.2} color={COLORS.secondary} />

      <Float
        speed={1.5}
        rotationIntensity={0.15}
        floatIntensity={0.4}
        enabled={phase === 'idle'}
      >
        <RubiksCubeGroup phase={phase} />
      </Float>
    </>
  )
}

const RubiksCube = () => {
  const containerRef = useRef()
  const [phase, setPhase] = useState('idle')

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          if (self.progress < 0.25) {
            setPhase('idle')
          } else if (self.progress < 0.7) {
            setPhase('explode')
          } else {
            setPhase('reassemble')
          }
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0.5, 9], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene phase={phase} />
      </Canvas>
    </div>
  )
}

export default RubiksCube
