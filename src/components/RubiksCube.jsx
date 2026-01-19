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

// Global physics state - persists across renders
const PhysicsState = {
  velocities: CUBE_DATA.map(() => ({ x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 })),
  positions: CUBE_DATA.map(c => ({ x: c.position[0], y: c.position[1], z: c.position[2] })),
  rotations: CUBE_DATA.map(() => ({ x: 0, y: 0, z: 0 })),
  groupY: 0,
  lastScrollProgress: 0,
}

const resetPhysicsState = () => {
  CUBE_DATA.forEach((cube, i) => {
    PhysicsState.positions[i] = { x: cube.position[0], y: cube.position[1], z: cube.position[2] }
    PhysicsState.rotations[i] = { x: 0, y: 0, z: 0 }
    PhysicsState.velocities[i] = { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 }
  })
  PhysicsState.groupY = 0
  PhysicsState.lastScrollProgress = 0
}

const SingleCube = ({ data, index, phase, scrollProgress }) => {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const { viewport } = useThree()

  useFrame((state, delta) => {
    if (!meshRef.current) return

    const clampedDelta = Math.min(delta, 0.05)

    // Hover effect only in idle phase
    if (hovered && phase === 'idle') {
      meshRef.current.scale.lerp(new THREE.Vector3(1.15, 1.15, 1.15), 0.1)
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }

    const vel = PhysicsState.velocities[index]
    const pos = PhysicsState.positions[index]
    const rot = PhysicsState.rotations[index]

    if (phase === 'explode' || phase === 'falling') {
      // Apply gentle gravity for slower falling
      vel.y -= 8 * clampedDelta

      // Update positions
      pos.x += vel.x * clampedDelta
      pos.y += vel.y * clampedDelta
      pos.z += vel.z * clampedDelta

      // Update rotations
      rot.x += vel.rx * clampedDelta
      rot.y += vel.ry * clampedDelta
      rot.z += vel.rz * clampedDelta

      // Boundary collisions - wide bounds since we're full screen now
      const boundsX = viewport.width * 0.8
      const boundsZ = 8

      if (Math.abs(pos.x) > boundsX) {
        vel.x *= -0.4
        pos.x = Math.sign(pos.x) * boundsX
      }
      if (Math.abs(pos.z) > boundsZ) {
        vel.z *= -0.4
        pos.z = Math.sign(pos.z) * boundsZ
      }

      // Apply friction
      vel.x *= 0.995
      vel.z *= 0.995
      vel.rx *= 0.99
      vel.ry *= 0.99
      vel.rz *= 0.99

      meshRef.current.position.set(pos.x, pos.y, pos.z)
      meshRef.current.rotation.set(rot.x, rot.y, rot.z)

    } else if (phase === 'reassemble') {
      const target = data.position
      const lerpFactor = 0.08

      pos.x += (target[0] - pos.x) * lerpFactor
      pos.y += (target[1] - pos.y) * lerpFactor
      pos.z += (target[2] - pos.z) * lerpFactor

      rot.x *= 0.92
      rot.y *= 0.92
      rot.z *= 0.92

      vel.x = vel.y = vel.z = 0
      vel.rx = vel.ry = vel.rz = 0

      meshRef.current.position.set(pos.x, pos.y, pos.z)
      meshRef.current.rotation.set(rot.x, rot.y, rot.z)

    } else if (phase === 'idle') {
      const target = data.position
      const lerpFactor = 0.12

      pos.x += (target[0] - pos.x) * lerpFactor
      pos.y += (target[1] - pos.y) * lerpFactor
      pos.z += (target[2] - pos.z) * lerpFactor

      rot.x *= 0.95
      rot.y *= 0.95
      rot.z *= 0.95

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

const RubiksCubeGroup = ({ phase, scrollProgress, groupYOffset }) => {
  const groupRef = useRef()
  const prevPhaseRef = useRef(phase)

  // Trigger explosion when entering explode phase
  useEffect(() => {
    if (phase === 'explode' && prevPhaseRef.current !== 'explode') {
      CUBE_DATA.forEach((cube, i) => {
        const dir = new THREE.Vector3(...cube.position).normalize()
        // Wide explosion - spread across most of the screen
        PhysicsState.velocities[i] = {
          x: dir.x * 12 + (Math.random() - 0.5) * 8,
          y: Math.random() * 4 + 3,
          z: dir.z * 6 + (Math.random() - 0.5) * 4,
          rx: (Math.random() - 0.5) * 6,
          ry: (Math.random() - 0.5) * 6,
          rz: (Math.random() - 0.5) * 6
        }
      })
    }

    // Reset when going back to idle
    if (phase === 'idle' && prevPhaseRef.current !== 'idle') {
      resetPhysicsState()
    }

    prevPhaseRef.current = phase
  }, [phase])

  // Idle rotation animation
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

  // Apply scroll-based Y offset to group
  useFrame(() => {
    if (groupRef.current) {
      // Smooth lerp to target Y position
      groupRef.current.position.y += (groupYOffset - groupRef.current.position.y) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {CUBE_DATA.map((cube, i) => (
        <SingleCube
          key={cube.id}
          data={cube}
          index={i}
          phase={phase}
          scrollProgress={scrollProgress}
        />
      ))}
    </group>
  )
}

const Scene = ({ phase, scrollProgress, groupYOffset }) => {
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

      {/* Position the cube group aligned with hero text - higher and more right */}
      <group position={[4.5, 1.5, 0]} scale={1.4}>
        <Float
          speed={1.5}
          rotationIntensity={0.15}
          floatIntensity={0.4}
          enabled={phase === 'idle'}
        >
          <RubiksCubeGroup
            phase={phase}
            scrollProgress={scrollProgress}
            groupYOffset={groupYOffset}
          />
        </Float>
      </group>
    </>
  )
}

const RubiksCube = ({ isVisible = true }) => {
  const containerRef = useRef()
  const [phase, setPhase] = useState('idle')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const [groupYOffset, setGroupYOffset] = useState(0)
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    // Reset physics when component mounts
    resetPhysicsState()

    const ctx = gsap.context(() => {
      // ScrollTrigger that spans from hero through about section
      // This gives us enough scroll distance for the full animation
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: '+=2500', // 2500px of scroll distance
        scrub: 0.3,
        onUpdate: (self) => {
          const progress = self.progress
          setScrollProgress(progress)

          // Phase transitions based on scroll progress
          // Explode early after tiny scroll (~100px)
          if (progress < 0.04) {
            // Idle phase - cube floats in place (first ~100px)
            setPhase('idle')
            setOpacity(1)
            setGroupYOffset(0)
          } else if (progress < 0.12) {
            // Transition to explode - start breaking apart
            setPhase('explode')
            setOpacity(1)
            setGroupYOffset(0)
          } else if (progress < 0.55) {
            // Falling phase - cubes fall with gravity
            setPhase('falling')
            // Gradually move the view down as cubes fall
            const fallProgress = (progress - 0.12) / 0.43
            setGroupYOffset(-fallProgress * 15) // Move camera focus down
            setOpacity(1 - fallProgress * 0.3) // Start fading
          } else if (progress < 0.75) {
            // Fade out phase
            setPhase('falling')
            const fadeProgress = (progress - 0.55) / 0.2
            setOpacity(Math.max(0, 0.7 - fadeProgress * 0.7))
            setGroupYOffset(-15 - fadeProgress * 5)
          } else {
            // Fully faded - stop rendering
            setOpacity(0)
            setShouldRender(false)
          }

          // Re-enable rendering if scrolling back up
          if (progress < 0.85 && !shouldRender) {
            setShouldRender(true)
          }
        }
      })
    })

    return () => {
      ctx.revert()
      resetPhysicsState()
    }
  }, [])

  // Don't render if fully faded out
  if (!shouldRender || !isVisible) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none hidden md:block"
      style={{
        zIndex: 20,
        opacity: opacity,
        transition: 'opacity 0.1s ease-out',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene
          phase={phase}
          scrollProgress={scrollProgress}
          groupYOffset={groupYOffset}
        />
      </Canvas>
    </div>
  )
}

export default RubiksCube
