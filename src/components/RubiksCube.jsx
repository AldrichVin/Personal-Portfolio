import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, Float } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

const CUBE_SIZE = 0.9
const GAP = 0.08
const TOTAL_SIZE = CUBE_SIZE + GAP

const COLORS = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  tertiary: '#22d3ee',
  neutral1: '#f5f5f5',
  neutral2: '#e5e5e5',
  neutral3: '#d4d4d4',
  dark: '#171717'
}

const cubeColors = [
  COLORS.primary,
  COLORS.secondary,
  COLORS.tertiary,
  COLORS.neutral1,
  COLORS.neutral2,
  COLORS.neutral3,
]

const SingleCube = ({ position, color, cubeRef, index }) => {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (cubeRef) {
      cubeRef.current = meshRef.current
    }
  }, [cubeRef])

  useFrame(() => {
    if (meshRef.current && hovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1)
    } else if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }
  })

  return (
    <RoundedBox
      ref={meshRef}
      args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]}
      radius={0.08}
      smoothness={4}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial
        color={color}
        metalness={0.1}
        roughness={0.3}
        envMapIntensity={0.5}
      />
    </RoundedBox>
  )
}

const RubiksCubeGroup = ({ scrollProgress, phase }) => {
  const groupRef = useRef()
  const cubesRef = useRef([])
  const velocitiesRef = useRef([])
  const positionsRef = useRef([])
  const rotationsRef = useRef([])
  const { viewport } = useThree()

  const cubePositions = useMemo(() => {
    const positions = []
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          positions.push({
            original: [x * TOTAL_SIZE, y * TOTAL_SIZE, z * TOTAL_SIZE],
            color: cubeColors[Math.floor(Math.random() * cubeColors.length)]
          })
        }
      }
    }
    return positions
  }, [])

  useEffect(() => {
    velocitiesRef.current = cubePositions.map(() => ({
      x: 0, y: 0, z: 0,
      rx: 0, ry: 0, rz: 0
    }))
    positionsRef.current = cubePositions.map(p => [...p.original])
    rotationsRef.current = cubePositions.map(() => [0, 0, 0])
  }, [cubePositions])

  useEffect(() => {
    if (!groupRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: 'none'
      })

      gsap.to(groupRef.current.rotation, {
        x: Math.PI * 0.1,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    })

    return () => ctx.revert()
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const cubes = cubesRef.current.filter(Boolean)

    if (phase === 'explode') {
      cubes.forEach((cube, i) => {
        if (!cube) return

        const vel = velocitiesRef.current[i]
        const pos = positionsRef.current[i]
        const rot = rotationsRef.current[i]

        vel.y -= 9.8 * delta * 0.5

        pos[0] += vel.x * delta * 60
        pos[1] += vel.y * delta * 60
        pos[2] += vel.z * delta * 60

        rot[0] += vel.rx * delta * 60
        rot[1] += vel.ry * delta * 60
        rot[2] += vel.rz * delta * 60

        const bounds = viewport.width * 0.4
        if (Math.abs(pos[0]) > bounds) {
          vel.x *= -0.7
          pos[0] = Math.sign(pos[0]) * bounds
        }
        if (pos[1] < -viewport.height * 0.4) {
          vel.y *= -0.6
          pos[1] = -viewport.height * 0.4
          vel.x *= 0.9
          vel.z *= 0.9
        }
        if (Math.abs(pos[2]) > bounds) {
          vel.z *= -0.7
          pos[2] = Math.sign(pos[2]) * bounds
        }

        cube.position.set(pos[0], pos[1], pos[2])
        cube.rotation.set(rot[0], rot[1], rot[2])
      })
    } else if (phase === 'reassemble') {
      cubes.forEach((cube, i) => {
        if (!cube) return
        const original = cubePositions[i].original

        cube.position.lerp(
          new THREE.Vector3(original[0], original[1], original[2]),
          0.05
        )

        cube.rotation.x *= 0.95
        cube.rotation.y *= 0.95
        cube.rotation.z *= 0.95

        positionsRef.current[i] = [cube.position.x, cube.position.y, cube.position.z]
        velocitiesRef.current[i] = { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 }
      })
    }
  })

  const triggerExplosion = () => {
    cubesRef.current.forEach((cube, i) => {
      if (!cube) return
      const original = cubePositions[i].original

      velocitiesRef.current[i] = {
        x: original[0] * 0.15 + (Math.random() - 0.5) * 0.2,
        y: Math.random() * 0.3 + 0.15,
        z: original[2] * 0.15 + (Math.random() - 0.5) * 0.2,
        rx: (Math.random() - 0.5) * 0.3,
        ry: (Math.random() - 0.5) * 0.3,
        rz: (Math.random() - 0.5) * 0.3
      }
    })
  }

  useEffect(() => {
    if (phase === 'explode') {
      triggerExplosion()
    }
  }, [phase])

  return (
    <group ref={groupRef}>
      {cubePositions.map((cube, index) => (
        <SingleCube
          key={index}
          position={cube.original}
          color={cube.color}
          index={index}
          cubeRef={{ current: null, set: (ref) => { cubesRef.current[index] = ref } }}
        />
      ))}
      <group>
        {cubePositions.map((cube, index) => {
          const ref = useRef()
          useEffect(() => {
            cubesRef.current[index] = ref.current
          }, [])
          return (
            <RoundedBox
              key={`physics-${index}`}
              ref={ref}
              args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]}
              radius={0.08}
              smoothness={4}
              position={cube.original}
              visible={phase === 'explode' || phase === 'reassemble'}
            >
              <meshStandardMaterial
                color={cube.color}
                metalness={0.1}
                roughness={0.3}
              />
            </RoundedBox>
          )
        })}
      </group>
    </group>
  )
}

const Scene = ({ scrollProgress, phase }) => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={0.4} />
      <pointLight position={[0, 5, 0]} intensity={0.3} color={COLORS.primary} />

      <Float
        speed={2}
        rotationIntensity={0.2}
        floatIntensity={0.3}
        enabled={phase === 'idle'}
      >
        <RubiksCubeGroup scrollProgress={scrollProgress} phase={phase} />
      </Float>
    </>
  )
}

const RubiksCube = () => {
  const containerRef = useRef()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [phase, setPhase] = useState('idle')

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress)

          if (self.progress < 0.3) {
            setPhase('idle')
          } else if (self.progress < 0.6) {
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
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene scrollProgress={scrollProgress} phase={phase} />
      </Canvas>
    </div>
  )
}

export default RubiksCube
