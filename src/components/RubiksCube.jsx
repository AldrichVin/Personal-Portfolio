import { useRef, useEffect, useMemo, useLayoutEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, PresentationControls, Environment } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

// Physics floor position
const PHYSICS_FLOOR_Y = -5.0

const COLORS = {
  white: '#FFFFFF',
  slate: '#94A3B8',
  dark: '#1A1A1A',
  lightSlate: '#CBD5E1',
  offWhite: '#F8FAFC',
  darkSlate: '#475569',
}

const cubeColors = [
  COLORS.white,
  COLORS.slate,
  COLORS.dark,
  COLORS.lightSlate,
  COLORS.offWhite,
  COLORS.darkSlate,
]

/**
 * SingleCube - Individual cubelet component
 */
const SingleCube = ({
  position,
  color,
  scale = 1,
  innerRef,
  onPointerDown,
  userData
}) => {
  const localRef = useRef()
  const ref = innerRef || localRef
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (ref.current) {
      const targetScale = hovered ? scale * 1.05 : scale
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 10)
    }
  })

  return (
    <group
      ref={ref}
      position={position}
      userData={userData}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'grab' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto' }}
      onPointerDown={(e) => {
        if (onPointerDown) onPointerDown(e)
        document.body.style.cursor = 'grabbing'
      }}
      onPointerUp={() => { document.body.style.cursor = 'grab' }}
    >
      <RoundedBox
        args={[1, 1, 1]}
        radius={0.08}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.1}
        />
      </RoundedBox>
    </group>
  )
}

/**
 * RubiksCubeGroup - The main Rubik's cube with slice-based animation
 */
const RubiksCubeGroup = () => {
  const topSliceRef = useRef()
  const midSliceRef = useRef()
  const botSliceRef = useRef()
  const mainGroupRef = useRef()
  const cubesRefs = useRef([])
  const idleTimeline = useRef(null)
  const physics = useRef({ active: false, velocities: [], offsets: [] })
  const dragRef = useRef(null)

  const { viewport, mouse, camera } = useThree()

  // Generate slice data
  const slices = useMemo(() => {
    const top = [], mid = [], bot = []
    const gap = 1.05

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const colorIndex = Math.floor(Math.random() * cubeColors.length)
          const cubeData = {
            localPosition: [x * gap, 0, z * gap],
            color: cubeColors[colorIndex],
            id: `${x}-${y}-${z}`
          }

          if (y === 1) top.push(cubeData)
          else if (y === 0) mid.push(cubeData)
          else bot.push(cubeData)
        }
      }
    }
    return { top, mid, bot }
  }, [])

  // Initialize physics velocities
  useEffect(() => {
    const totalCubes = 27
    for (let i = 0; i < totalCubes; i++) {
      physics.current.velocities.push(new THREE.Vector3(0, 0, 0))
      physics.current.offsets.push(new THREE.Vector3(0, 0, 0))
    }
  }, [])

  // Setup idle animation pause/play on scroll
  useEffect(() => {
    idleTimeline.current?.play()

    const st = ScrollTrigger.create({
      trigger: '#details-section',
      start: 'center center',
      onEnter: () => {
        idleTimeline.current?.pause()
      },
      onLeaveBack: () => {
        idleTimeline.current?.play()
      }
    })
    return () => st.kill()
  }, [])

  // Global pointer up listener for drag
  useEffect(() => {
    const handlePointerUp = () => {
      dragRef.current = null
    }
    window.addEventListener('pointerup', handlePointerUp)
    return () => window.removeEventListener('pointerup', handlePointerUp)
  }, [])

  const handleCubePointerDown = (index, e) => {
    if (!physics.current.active) return
    e.stopPropagation()
    e.target?.setPointerCapture?.(e.pointerId)
    dragRef.current = index
  }

  // Physics frame update
  useFrame((state, delta) => {
    if (!physics.current.active) return

    const vec = new THREE.Vector3(mouse.x, mouse.y, 0.5)
    vec.unproject(camera)
    const dir = vec.sub(camera.position).normalize()
    const distanceToFloor = (PHYSICS_FLOOR_Y - camera.position.y) / dir.y
    const mouseWorldPos = camera.position.clone().add(dir.multiplyScalar(distanceToFloor))

    const repulsionRadius = 4.0
    const repulsionForce = 45.0
    const drag = 0.96
    const worldWidth = viewport.width / 2

    cubesRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const velocity = physics.current.velocities[i]

      const currentWorldPos = new THREE.Vector3()
      mesh.getWorldPosition(currentWorldPos)
      const meshFloorPos = new THREE.Vector3(currentWorldPos.x, PHYSICS_FLOOR_Y, currentWorldPos.z)
      const mouseFloorPos = new THREE.Vector3(mouseWorldPos.x, PHYSICS_FLOOR_Y, mouseWorldPos.z)

      // Drag logic
      if (dragRef.current === i) {
        const targetPos = mouseFloorPos.clone()
        targetPos.y = PHYSICS_FLOOR_Y + 0.5

        const moveDiff = targetPos.clone().sub(mesh.position)
        velocity.copy(moveDiff.multiplyScalar(10))
        mesh.position.lerp(targetPos, 0.2)

        // Collision with others while dragging
        cubesRefs.current.forEach((otherMesh, j) => {
          if (i === j || !otherMesh) return
          const otherPos = new THREE.Vector3()
          otherMesh.getWorldPosition(otherPos)
          const dist = mesh.position.distanceTo(otherPos)
          const minDist = 1.3
          if (dist < minDist) {
            const pushDir = otherPos.clone().sub(mesh.position).normalize()
            const force = (minDist - dist) * 30.0
            physics.current.velocities[j].add(pushDir.multiplyScalar(force * delta))
          }
        })
        return
      }

      // Mouse repulsion
      if (dragRef.current === null) {
        const distToMouse = meshFloorPos.distanceTo(mouseFloorPos)
        if (distToMouse < repulsionRadius) {
          const forceDir = meshFloorPos.clone().sub(mouseFloorPos).normalize()
          const force = (1 - distToMouse / repulsionRadius) * repulsionForce
          velocity.add(forceDir.multiplyScalar(force * delta))
        }
      }

      // Cube-to-cube collision
      cubesRefs.current.forEach((otherMesh, j) => {
        if (i === j || !otherMesh) return
        const otherPos = new THREE.Vector3()
        otherMesh.getWorldPosition(otherPos)

        const dist = currentWorldPos.distanceTo(otherPos)
        const minDist = 1.1
        if (dist < minDist) {
          const pushDir = currentWorldPos.clone().sub(otherPos).normalize()
          pushDir.x += (Math.random() - 0.5) * 0.1
          pushDir.z += (Math.random() - 0.5) * 0.1
          const force = (minDist - dist) * 15.0
          velocity.add(pushDir.multiplyScalar(force * delta))
        }
      })

      // Wall collision
      const safeBoundary = Math.max(2, worldWidth - 1)
      if (mesh.position.x > safeBoundary) {
        velocity.x *= -0.8
        mesh.position.x = safeBoundary
      } else if (mesh.position.x < -safeBoundary) {
        velocity.x *= -0.8
        mesh.position.x = -safeBoundary
      }

      // Apply velocity
      mesh.position.x += velocity.x * delta
      mesh.position.z += velocity.z * delta

      // Idle bobbing
      mesh.position.y += Math.sin(state.clock.elapsedTime * 3 + i) * 0.003

      // Friction
      velocity.multiplyScalar(drag)
    })
  })

  // Main scroll animation setup
  useLayoutEffect(() => {
    if (!mainGroupRef.current || !topSliceRef.current || !midSliceRef.current || !botSliceRef.current) return

    const mm = gsap.matchMedia()

    mm.add({
      isMobile: '(max-width: 799px)',
      isDesktop: '(min-width: 800px)'
    }, (context) => {
      const { isMobile } = context.conditions
      const screenWidth = viewport.width

      // Initial position - cube on right side of hero
      const startPos = isMobile ? [0, 0, 0] : [4, 0.5, 0]
      const startScale = isMobile ? 0.7 : 1.1

      mainGroupRef.current.position.set(...startPos)
      mainGroupRef.current.scale.set(startScale, startScale, startScale)
      mainGroupRef.current.rotation.set(0.3, -0.5, 0)

      // Idle animation timeline (slice rotations)
      if (idleTimeline.current) idleTimeline.current.kill()

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.2, defaults: { ease: 'power3.inOut' } })
      idleTimeline.current = tl

      const t = 0.8
      tl.to(topSliceRef.current.rotation, { y: Math.PI / 2, duration: t })
        .to(botSliceRef.current.rotation, { y: -Math.PI / 2, duration: t }, '<0.1')
        .to(mainGroupRef.current.rotation, { z: Math.PI / 2, duration: t * 1.2 }, '+=0.1')
        .to(midSliceRef.current.rotation, { y: Math.PI / 2, duration: t })
        .to(topSliceRef.current.rotation, { y: Math.PI, duration: t }, '<0.1')
        .to(mainGroupRef.current.rotation, { x: 0.2, y: -0.5, z: 0, duration: t * 1.5 }, '+=0.1')
        .to(midSliceRef.current.rotation, { y: 0, duration: t }, '+=0.2')
        .to(topSliceRef.current.rotation, { y: 0, duration: t }, '<')
        .to(botSliceRef.current.rotation, { y: 0, duration: t }, '<')

      // Timeline 1: Hero → Details - cube moves to center below text
      const centerPosDetails = isMobile ? [0, -1, 0] : [0, -1.5, 0]
      const detailScale = isMobile ? 0.8 : 1.0

      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero-section',
          start: 'top top',
          endTrigger: '#details-section',
          end: 'center center',
          scrub: 1.2,
          immediateRender: false,
        }
      })

      tl1.to(mainGroupRef.current.rotation, {
        x: 0.2, y: Math.PI * 0.25, z: 0, duration: 1, ease: 'power2.inOut'
      }, 0)
      .to(mainGroupRef.current.position, {
        x: centerPosDetails[0], y: centerPosDetails[1], z: centerPosDetails[2], ease: 'power1.inOut'
      }, 0)
      .to(mainGroupRef.current.scale, {
        x: detailScale, y: detailScale, z: detailScale, ease: 'power1.inOut'
      }, 0)

      // Timeline 2: Details → Breakdown (Explosion) - cube at center, explodes
      const centerPosBreakdown = [0, 0, 0]
      const breakdownScale = isMobile ? 0.7 : 0.9

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: '#details-section',
          start: 'bottom bottom',
          endTrigger: '#breakdown-section',
          end: 'center center',
          scrub: 1,
        }
      })

      // Reset slices before exploding
      tl2.to([topSliceRef.current.rotation, midSliceRef.current.rotation, botSliceRef.current.rotation], {
        x: 0, y: 0, z: 0, duration: 0.3, ease: 'power2.inOut'
      }, 0)

      tl2.to(mainGroupRef.current.position, {
        x: centerPosBreakdown[0], y: centerPosBreakdown[1], z: centerPosBreakdown[2],
        ease: 'power2.inOut'
      }, 0)
      .to(mainGroupRef.current.scale, {
        x: breakdownScale, y: breakdownScale, z: breakdownScale,
        ease: 'power2.inOut'
      }, 0)
      .to(mainGroupRef.current.rotation, {
        x: 0.5, y: Math.PI * 2.25, z: 0.2,
        ease: 'power2.inOut'
      }, 0)

      // Explode cubes outward
      cubesRefs.current.forEach((mesh) => {
        if (!mesh) return
        const parentY =
          slices.top.find(c => c.id === mesh.userData.id) ? 1.05 :
          slices.bot.find(c => c.id === mesh.userData.id) ? -1.05 : 0

        const direction = new THREE.Vector3(mesh.position.x, parentY, mesh.position.z).normalize()
        if (direction.length() === 0) direction.set(0, 1, 0)

        const safeSpread = Math.min(3.0, screenWidth * 0.25)
        const explodeDist = safeSpread + Math.random() * 2

        const targetX = mesh.position.x + direction.x * (explodeDist * 0.7)
        const targetY = mesh.position.y + (direction.y * explodeDist) - parentY
        const targetZ = mesh.position.z + direction.z * explodeDist

        tl2.to(mesh.position, {
          x: targetX, y: targetY, z: targetZ, ease: 'power2.out'
        }, 0)

        tl2.to(mesh.rotation, {
          x: Math.random() * Math.PI * 2,
          y: Math.random() * Math.PI * 2,
          z: Math.random() * Math.PI * 2,
          duration: 1
        }, 0)
      })

      // Timeline 3: Breakdown → Footer (Physics Drop)
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: '#breakdown-section',
          start: 'center center',
          endTrigger: '#footer-section',
          end: 'bottom bottom',
          scrub: 1.5,
          onLeave: () => { physics.current.active = true },
          onEnterBack: () => {
            physics.current.active = false
            physics.current.velocities.forEach(v => v.set(0, 0, 0))
          }
        }
      })

      cubesRefs.current.forEach((mesh, i) => {
        if (!mesh) return

        const dropRange = Math.max(2, screenWidth * 0.8)
        const dropTargetX = (Math.random() - 0.5) * dropRange
        const dropTargetZ = (Math.random() - 0.5) * 10
        const dropTargetY = PHYSICS_FLOOR_Y + Math.random() * 1.5

        const parentYOffset =
          slices.top.find(c => c.id === mesh.userData.id) ? 1.05 :
          slices.bot.find(c => c.id === mesh.userData.id) ? -1.05 : 0

        const finalLocalY = dropTargetY - parentYOffset
        const randRot = Math.random() * Math.PI * 6

        tl3.to(mesh.position, {
          x: dropTargetX, y: finalLocalY, z: dropTargetZ,
          ease: 'bounce.out', duration: 2,
        }, i * 0.01)
        tl3.to(mesh.rotation, {
          x: randRot, y: randRot, z: randRot, ease: 'power1.out'
        }, '<')
      })
    })

    return () => mm.revert()
  }, [slices, viewport.width])

  const addToRefs = (el) => {
    if (el && !cubesRefs.current.includes(el)) cubesRefs.current.push(el)
  }
  cubesRefs.current = []

  const topCount = slices.top.length
  const midCount = slices.mid.length

  return (
    <group ref={mainGroupRef}>
      <PresentationControls
        global={false}
        cursor={true}
        snap={true}
        speed={2}
        zoom={1}
        rotation={[0, 0, 0]}
        polar={[-Infinity, Infinity]}
        azimuth={[-Infinity, Infinity]}
      >
        <group>
          {/* Top Slice */}
          <group ref={topSliceRef} position={[0, 1.05, 0]}>
            {slices.top.map((c, i) => (
              <SingleCube
                key={c.id}
                innerRef={addToRefs}
                position={c.localPosition}
                color={c.color}
                onPointerDown={(e) => handleCubePointerDown(i, e)}
                userData={{ id: c.id }}
              />
            ))}
          </group>

          {/* Middle Slice */}
          <group ref={midSliceRef} position={[0, 0, 0]}>
            {slices.mid.map((c, i) => (
              <SingleCube
                key={c.id}
                innerRef={addToRefs}
                position={c.localPosition}
                color={c.color}
                onPointerDown={(e) => handleCubePointerDown(topCount + i, e)}
                userData={{ id: c.id }}
              />
            ))}
          </group>

          {/* Bottom Slice */}
          <group ref={botSliceRef} position={[0, -1.05, 0]}>
            {slices.bot.map((c, i) => (
              <SingleCube
                key={c.id}
                innerRef={addToRefs}
                position={c.localPosition}
                color={c.color}
                onPointerDown={(e) => handleCubePointerDown(topCount + midCount + i, e)}
                userData={{ id: c.id }}
              />
            ))}
          </group>
        </group>
      </PresentationControls>
    </group>
  )
}

/**
 * Scene - Three.js scene with lighting
 */
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 7]} intensity={1.5} castShadow />
      <directionalLight position={[-5, 5, -2]} intensity={1} color="#bfdbfe" />
      <spotLight position={[0, 5, -10]} intensity={0.5} color="#ffffff" />

      <RubiksCubeGroup />

      <Environment preset="city" />
    </>
  )
}

/**
 * RubiksCube - Main component
 */
const RubiksCube = ({ isVisible = true }) => {
  const containerRef = useRef()

  if (!isVisible) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-auto hidden md:block"
      style={{ zIndex: 0 }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 12], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#FAFAFA']} />
        <Scene />
      </Canvas>
    </div>
  )
}

export default RubiksCube
