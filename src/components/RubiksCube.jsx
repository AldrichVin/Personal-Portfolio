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

// Starting position (right side) and center position
const START_X = 4.5
const CENTER_X = 0
const CUBE_Y = 0.8

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
        // Calculate spread direction for deconstruction
        const spreadDir = new THREE.Vector3(x, y, z).normalize()
        data.push({
          id: index,
          gridPos: { x, y, z },
          position: [x * TOTAL_SIZE, y * TOTAL_SIZE, z * TOTAL_SIZE],
          color: cubeColorArray[(index + Math.floor(Math.random() * 3)) % cubeColorArray.length],
          // Each cube spreads outward based on its position in the grid
          spreadDirection: [
            spreadDir.x * 3 + (Math.random() - 0.5) * 0.5,
            spreadDir.y * 2.5 + (Math.random() - 0.5) * 0.5,
            spreadDir.z * 2 + (Math.random() - 0.5) * 0.5
          ],
          // Random rotation offset for variety during deconstruction
          rotationSpeed: [
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2
          ]
        })
        index++
      }
    }
  }
  return data
}

const CUBE_DATA = generateCubeData()

/**
 * SingleCube - Individual cubelet with scroll-driven position
 *
 * During deconstruction, position is interpolated based on scroll progress
 * (not physics-based) for smooth, controlled animation
 */
const SingleCube = ({ data, index, phase, deconstructProgress }) => {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (!meshRef.current) return

    // Hover effect during idle/moving/centered phases
    if (hovered && (phase === 'idle' || phase === 'moving' || phase === 'centered')) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1)
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }

    // Calculate target position based on phase
    if (phase === 'deconstructing' || phase === 'fadeout') {
      // Spread outward based on scroll progress (0 to 1)
      const spread = deconstructProgress
      const easeSpread = easeOutCubic(spread)

      const targetX = data.position[0] + data.spreadDirection[0] * easeSpread
      const targetY = data.position[1] + data.spreadDirection[1] * easeSpread
      const targetZ = data.position[2] + data.spreadDirection[2] * easeSpread

      // Smooth lerp to target
      meshRef.current.position.lerp(
        new THREE.Vector3(targetX, targetY, targetZ),
        0.08
      )

      // Add subtle rotation during deconstruction
      meshRef.current.rotation.x += data.rotationSpeed[0] * delta * spread * 0.5
      meshRef.current.rotation.y += data.rotationSpeed[1] * delta * spread * 0.5
      meshRef.current.rotation.z += data.rotationSpeed[2] * delta * spread * 0.3
    } else {
      // Assembled state - return to original position
      meshRef.current.position.lerp(
        new THREE.Vector3(...data.position),
        0.12
      )

      // Gradually reset rotation
      meshRef.current.rotation.x *= 0.95
      meshRef.current.rotation.y *= 0.95
      meshRef.current.rotation.z *= 0.95
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

// Easing function for smooth deconstruction
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

/**
 * RubiksCubeGroup - Contains all 27 cubelets
 * Handles group-level rotation animation
 */
const RubiksCubeGroup = ({ phase, deconstructProgress }) => {
  const groupRef = useRef()

  // Subtle idle rotation animation
  useEffect(() => {
    if (!groupRef.current) return

    const ctx = gsap.context(() => {
      // Slow continuous Y rotation
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 35,
        repeat: -1,
        ease: 'none'
      })

      // Gentle tilt animation
      gsap.to(groupRef.current.rotation, {
        x: 0.15,
        z: 0.08,
        duration: 10,
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
          deconstructProgress={deconstructProgress}
        />
      ))}
    </group>
  )
}

/**
 * Scene - Three.js scene with lighting and cube group
 *
 * The outer group position is controlled by scroll progress
 * to move the cube from right side to center
 */
const Scene = ({ phase, scrollProgress, deconstructProgress, groupXPosition }) => {
  const groupRef = useRef()

  // Smoothly interpolate group X position
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.x += (groupXPosition - groupRef.current.position.x) * 0.08
    }
  })

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

      {/* Outer group for horizontal translation (right → center) */}
      <group ref={groupRef} position={[START_X, CUBE_Y, 0]} scale={1.4}>
        <Float
          speed={1.5}
          rotationIntensity={0.12}
          floatIntensity={0.3}
          enabled={phase === 'idle' || phase === 'moving' || phase === 'centered'}
        >
          <RubiksCubeGroup
            phase={phase}
            deconstructProgress={deconstructProgress}
          />
        </Float>
      </group>
    </>
  )
}

/**
 * RubiksCube - Main component with scroll-driven animation
 *
 * Scroll Progress Model:
 * - 0.00–0.25: Move from right to center (cube intact)
 * - 0.25–0.45: Hold at center with subtle motion
 * - 0.45–0.85: Gradual deconstruction (spread outward)
 * - 0.85–1.00: Fade out and cleanup
 */
const RubiksCube = ({ isVisible = true }) => {
  const containerRef = useRef()
  const [phase, setPhase] = useState('idle')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const [groupXPosition, setGroupXPosition] = useState(START_X)
  const [deconstructProgress, setDeconstructProgress] = useState(0)
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: '+=2500',
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress
          setScrollProgress(progress)

          // Phase 1: Moving from right to center (0 - 0.25)
          if (progress < 0.25) {
            setPhase('moving')
            setOpacity(1)

            // Interpolate X position: START_X → CENTER_X
            const moveProgress = progress / 0.25
            const easedProgress = easeInOutCubic(moveProgress)
            setGroupXPosition(START_X + (CENTER_X - START_X) * easedProgress)
            setDeconstructProgress(0)
          }
          // Phase 2: Centered / Hold (0.25 - 0.45)
          else if (progress < 0.45) {
            setPhase('centered')
            setOpacity(1)
            setGroupXPosition(CENTER_X)
            setDeconstructProgress(0)
          }
          // Phase 3: Deconstruction (0.45 - 0.85)
          else if (progress < 0.85) {
            setPhase('deconstructing')

            // Calculate deconstruction progress (0 to 1)
            const deconProgress = (progress - 0.45) / 0.4
            setDeconstructProgress(deconProgress)
            setGroupXPosition(CENTER_X)

            // Start fading in the later part of deconstruction
            if (deconProgress > 0.6) {
              const fadeStart = (deconProgress - 0.6) / 0.4
              setOpacity(1 - fadeStart * 0.4)
            } else {
              setOpacity(1)
            }
          }
          // Phase 4: Fade out (0.85 - 1.0)
          else {
            setPhase('fadeout')
            const fadeProgress = (progress - 0.85) / 0.15
            setOpacity(Math.max(0, 0.6 - fadeProgress * 0.6))
            setDeconstructProgress(1)

            if (progress > 0.95) {
              setShouldRender(false)
            }
          }

          // Re-enable rendering if scrolling back up
          if (progress < 0.9 && !shouldRender) {
            setShouldRender(true)
          }
        }
      })
    })

    return () => ctx.revert()
  }, [shouldRender])

  if (!shouldRender || !isVisible) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none hidden md:block"
      style={{
        zIndex: 20,
        opacity: opacity,
        transition: 'opacity 0.15s ease-out',
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
          deconstructProgress={deconstructProgress}
          groupXPosition={groupXPosition}
        />
      </Canvas>
    </div>
  )
}

export default RubiksCube
