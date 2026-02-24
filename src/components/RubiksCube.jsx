import { useRef, useEffect, useMemo, useLayoutEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, PresentationControls, Environment } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

// Physics constants
const PHYSICS_FLOOR_Y = -4.5

// Refined color palette - softer, less competing
const COLORS = {
  white: '#FFFFFF',
  slate: '#E2E8F0',
  lightSlate: '#F1F5F9',
  offWhite: '#F8FAFC',
  accent1: '#CBD5E1',
  accent2: '#94A3B8',
  indigo: '#6366f1',
  indigoMuted: '#a5b4fc',
}

const cubeColors = [
  COLORS.white,
  COLORS.slate,
  COLORS.lightSlate,
  COLORS.offWhite,
  COLORS.accent1,
  COLORS.accent2,
  COLORS.indigo,
  COLORS.indigoMuted,
]

/**
 * SingleCube - Individual cubelet with refined materials
 */
const SingleCube = ({
  position,
  color,
  scale = 1,
  innerRef,
  onPointerDown,
  userData,
  opacity = 1
}) => {
  const localRef = useRef()
  const ref = innerRef || localRef
  const [hovered, setHovered] = useState(false)

  const _targetVec = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    if (ref.current) {
      const targetScale = hovered ? scale * 1.03 : scale
      _targetVec.set(targetScale, targetScale, targetScale)
      ref.current.scale.lerp(_targetVec, delta * 8)
    }
  })

  return (
    <group
      ref={ref}
      position={position}
      userData={userData}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => { setHovered(false) }}
      onPointerDown={(e) => {
        if (onPointerDown) onPointerDown(e)
      }}
      onPointerUp={() => {}}
      style={{ cursor: hovered ? 'grab' : 'auto' }}
    >
      <RoundedBox
        args={[1, 1, 1]}
        radius={0.1}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.05}
          transparent
          opacity={opacity}
        />
      </RoundedBox>
    </group>
  )
}

/**
 * RubiksCubeGroup - Main cube with refined motion
 */
const RubiksCubeGroup = ({ globalOpacity }) => {
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
    const gap = 1.08

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

  // Initialize physics
  useEffect(() => {
    const totalCubes = 27
    for (let i = 0; i < totalCubes; i++) {
      physics.current.velocities.push(new THREE.Vector3(0, 0, 0))
      physics.current.offsets.push(new THREE.Vector3(0, 0, 0))
    }
  }, [])

  // Idle animation control
  useEffect(() => {
    idleTimeline.current?.play()

    const st = ScrollTrigger.create({
      trigger: '#breakdown-section',
      start: 'top center',
      onEnter: () => idleTimeline.current?.pause(),
      onLeaveBack: () => idleTimeline.current?.play()
    })
    return () => st.kill()
  }, [])

  // Pointer up listener
  useEffect(() => {
    const handlePointerUp = () => { dragRef.current = null }
    window.addEventListener('pointerup', handlePointerUp)
    return () => window.removeEventListener('pointerup', handlePointerUp)
  }, [])

  const handleCubePointerDown = (index, e) => {
    if (!physics.current.active) return
    e.stopPropagation()
    e.target?.setPointerCapture?.(e.pointerId)
    dragRef.current = index
  }

  // Pre-allocated vectors to avoid GC pressure in useFrame
  const _vec = useMemo(() => new THREE.Vector3(), [])
  const _dir = useMemo(() => new THREE.Vector3(), [])
  const _mouseWorldPos = useMemo(() => new THREE.Vector3(), [])
  const _currentWorldPos = useMemo(() => new THREE.Vector3(), [])
  const _meshFloorPos = useMemo(() => new THREE.Vector3(), [])
  const _mouseFloorPos = useMemo(() => new THREE.Vector3(), [])
  const _targetPos = useMemo(() => new THREE.Vector3(), [])
  const _moveDiff = useMemo(() => new THREE.Vector3(), [])
  const _otherPos = useMemo(() => new THREE.Vector3(), [])
  const _pushDir = useMemo(() => new THREE.Vector3(), [])
  const _forceDir = useMemo(() => new THREE.Vector3(), [])

  // Physics frame - refined for smoother motion
  useFrame((state, delta) => {
    if (!physics.current.active) return

    _vec.set(mouse.x, mouse.y, 0.5)
    _vec.unproject(camera)
    _dir.copy(_vec).sub(camera.position).normalize()
    const distanceToFloor = (PHYSICS_FLOOR_Y - camera.position.y) / _dir.y
    _mouseWorldPos.copy(camera.position).add(_dir.multiplyScalar(distanceToFloor))

    const repulsionRadius = 3.5
    const repulsionForce = 30.0
    const drag = 0.94
    const worldWidth = viewport.width / 2

    cubesRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const velocity = physics.current.velocities[i]

      mesh.getWorldPosition(_currentWorldPos)
      _meshFloorPos.set(_currentWorldPos.x, PHYSICS_FLOOR_Y, _currentWorldPos.z)
      _mouseFloorPos.set(_mouseWorldPos.x, PHYSICS_FLOOR_Y, _mouseWorldPos.z)

      // Drag logic
      if (dragRef.current === i) {
        _targetPos.copy(_mouseFloorPos)
        _targetPos.y = PHYSICS_FLOOR_Y + 0.5
        _moveDiff.copy(_targetPos).sub(mesh.position)
        velocity.copy(_moveDiff.multiplyScalar(8))
        mesh.position.lerp(_targetPos, 0.15)

        cubesRefs.current.forEach((otherMesh, j) => {
          if (i === j || !otherMesh) return
          otherMesh.getWorldPosition(_otherPos)
          const dist = mesh.position.distanceTo(_otherPos)
          const minDist = 1.3
          if (dist < minDist) {
            _pushDir.copy(_otherPos).sub(mesh.position).normalize()
            const force = (minDist - dist) * 20.0
            physics.current.velocities[j].add(_pushDir.multiplyScalar(force * delta))
          }
        })
        return
      }

      // Mouse repulsion
      if (dragRef.current === null) {
        const distToMouse = _meshFloorPos.distanceTo(_mouseFloorPos)
        if (distToMouse < repulsionRadius) {
          _forceDir.copy(_meshFloorPos).sub(_mouseFloorPos).normalize()
          const force = (1 - distToMouse / repulsionRadius) * repulsionForce
          velocity.add(_forceDir.multiplyScalar(force * delta))
        }
      }

      // Cube collision
      cubesRefs.current.forEach((otherMesh, j) => {
        if (i === j || !otherMesh) return
        otherMesh.getWorldPosition(_otherPos)
        const dist = _currentWorldPos.distanceTo(_otherPos)
        const minDist = 1.2
        if (dist < minDist) {
          _pushDir.copy(_currentWorldPos).sub(_otherPos).normalize()
          _pushDir.x += (Math.random() - 0.5) * 0.1
          _pushDir.z += (Math.random() - 0.5) * 0.1
          const force = (minDist - dist) * 12.0
          velocity.add(_pushDir.multiplyScalar(force * delta))
        }
      })

      // Wall collision
      const safeBoundary = Math.max(2, worldWidth - 1)
      if (mesh.position.x > safeBoundary) {
        velocity.x *= -0.7
        mesh.position.x = safeBoundary
      } else if (mesh.position.x < -safeBoundary) {
        velocity.x *= -0.7
        mesh.position.x = -safeBoundary
      }

      mesh.position.x += velocity.x * delta
      mesh.position.z += velocity.z * delta

      // Gentle bobbing
      mesh.position.y += Math.sin(state.clock.elapsedTime * 2 + i) * 0.002

      velocity.multiplyScalar(drag)
    })
  })

  // Main animation setup
  useLayoutEffect(() => {
    if (!mainGroupRef.current || !topSliceRef.current || !midSliceRef.current || !botSliceRef.current) return

    const mm = gsap.matchMedia()

    mm.add({
      isMobile: '(max-width: 799px)',
      isDesktop: '(min-width: 800px)'
    }, (context) => {
      const { isMobile } = context.conditions
      const screenWidth = viewport.width

      // Initial position
      const startPos = isMobile ? [0, 0, 0] : [3.5, 0, 0]
      const startScale = isMobile ? 0.75 : 1.0

      mainGroupRef.current.position.set(...startPos)
      mainGroupRef.current.scale.set(startScale, startScale, startScale)
      mainGroupRef.current.rotation.set(0.25, -0.4, 0)

      // Idle animation - SLOWER rotation for premium feel
      if (idleTimeline.current) idleTimeline.current.kill()

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5, defaults: { ease: 'power2.inOut' } })
      idleTimeline.current = tl

      // Slower slice rotations
      const t = 1.2
      tl.to(topSliceRef.current.rotation, { y: Math.PI / 2, duration: t })
        .to(botSliceRef.current.rotation, { y: -Math.PI / 2, duration: t }, '<0.2')
        .to(mainGroupRef.current.rotation, { z: Math.PI / 2, duration: t * 1.3 }, '+=0.3')
        .to(midSliceRef.current.rotation, { y: Math.PI / 2, duration: t })
        .to(topSliceRef.current.rotation, { y: Math.PI, duration: t }, '<0.2')
        .to(mainGroupRef.current.rotation, { x: 0.25, y: -0.4, z: 0, duration: t * 1.5 }, '+=0.3')
        .to(midSliceRef.current.rotation, { y: 0, duration: t }, '+=0.4')
        .to(topSliceRef.current.rotation, { y: 0, duration: t }, '<')
        .to(botSliceRef.current.rotation, { y: 0, duration: t }, '<')

      // Timeline 1: Hero → Breakdown (move to center)
      const centerPosDetails = isMobile ? [0, -0.5, 0] : [0, -1, 0]
      const detailScale = isMobile ? 0.8 : 0.95

      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero-section',
          start: 'top top',
          endTrigger: '#breakdown-section',
          end: 'top center',
          scrub: 1.5,
          immediateRender: false,
        }
      })

      tl1.to(mainGroupRef.current.rotation, {
        x: 0.2, y: Math.PI * 0.2, z: 0, duration: 1, ease: 'power2.inOut'
      }, 0)
      .to(mainGroupRef.current.position, {
        x: centerPosDetails[0], y: centerPosDetails[1], z: centerPosDetails[2], ease: 'power1.inOut'
      }, 0)
      .to(mainGroupRef.current.scale, {
        x: detailScale, y: detailScale, z: detailScale, ease: 'power1.inOut'
      }, 0)

      // Timeline 2: Breakdown (Explosion)
      const breakdownScale = isMobile ? 0.7 : 0.85

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: '#breakdown-section',
          start: 'top center',
          end: 'center center',
          scrub: 1.2,
        }
      })

      // Reset slices
      tl2.to([topSliceRef.current.rotation, midSliceRef.current.rotation, botSliceRef.current.rotation], {
        x: 0, y: 0, z: 0, duration: 0.3, ease: 'power2.inOut'
      }, 0)

      tl2.to(mainGroupRef.current.position, {
        x: 0, y: 0, z: 0, ease: 'power2.inOut'
      }, 0)
      .to(mainGroupRef.current.scale, {
        x: breakdownScale, y: breakdownScale, z: breakdownScale, ease: 'power2.inOut'
      }, 0)
      .to(mainGroupRef.current.rotation, {
        x: 0.4, y: Math.PI * 2, z: 0.15, ease: 'power2.inOut'
      }, 0)

      // Explode - centered spread (symmetric around origin)
      cubesRefs.current.forEach((mesh) => {
        if (!mesh) return
        const parentY =
          slices.top.find(c => c.id === mesh.userData.id) ? 1.08 :
          slices.bot.find(c => c.id === mesh.userData.id) ? -1.08 : 0

        const direction = new THREE.Vector3(mesh.position.x, parentY, mesh.position.z).normalize()
        if (direction.length() === 0) direction.set(0, 1, 0)

        const safeSpread = Math.min(3.5, screenWidth * 0.25)
        const explodeDist = safeSpread + Math.random() * 1.5

        // Use direction only (not additive to current position) so explosion is centered at origin
        const targetX = direction.x * explodeDist
        const targetY = direction.y * explodeDist - parentY
        const targetZ = direction.z * explodeDist

        tl2.to(mesh.position, {
          x: targetX, y: targetY, z: targetZ, ease: 'power2.out'
        }, 0)

        // Slower rotation during explosion
        tl2.to(mesh.rotation, {
          x: Math.random() * Math.PI * 1.5,
          y: Math.random() * Math.PI * 1.5,
          z: Math.random() * Math.PI * 1.5,
          duration: 1
        }, 0)
      })

      // Timeline 3: Drop with gravity-like motion
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: '#breakdown-section',
          start: 'center center',
          endTrigger: '#about',
          end: 'top top',
          scrub: 2,
          onLeave: () => { physics.current.active = true },
          onEnterBack: () => {
            physics.current.active = false
            physics.current.velocities.forEach(v => v.set(0, 0, 0))
          }
        }
      })

      cubesRefs.current.forEach((mesh, i) => {
        if (!mesh) return

        const dropRange = Math.max(2, screenWidth * 0.6)
        const dropTargetX = (Math.random() - 0.5) * dropRange
        const dropTargetZ = (Math.random() - 0.5) * 8
        const dropTargetY = PHYSICS_FLOOR_Y + Math.random() * 1.2

        const parentYOffset =
          slices.top.find(c => c.id === mesh.userData.id) ? 1.08 :
          slices.bot.find(c => c.id === mesh.userData.id) ? -1.08 : 0

        const finalLocalY = dropTargetY - parentYOffset

        // Staggered drop with bounce
        tl3.to(mesh.position, {
          x: dropTargetX,
          y: finalLocalY,
          z: dropTargetZ,
          ease: 'bounce.out',
          duration: 2.5,
        }, i * 0.02)

        // Slower rotation during drop
        tl3.to(mesh.rotation, {
          x: Math.random() * Math.PI * 3,
          y: Math.random() * Math.PI * 3,
          z: Math.random() * Math.PI * 3,
          ease: 'power1.out'
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
        speed={1.5}
        zoom={1}
        rotation={[0, 0, 0]}
        polar={[-Infinity, Infinity]}
        azimuth={[-Infinity, Infinity]}
      >
        <group>
          <group ref={topSliceRef} position={[0, 1.08, 0]}>
            {slices.top.map((c, i) => (
              <SingleCube
                key={c.id}
                innerRef={addToRefs}
                position={c.localPosition}
                color={c.color}
                opacity={globalOpacity}
                onPointerDown={(e) => handleCubePointerDown(i, e)}
                userData={{ id: c.id }}
              />
            ))}
          </group>

          <group ref={midSliceRef} position={[0, 0, 0]}>
            {slices.mid.map((c, i) => (
              <SingleCube
                key={c.id}
                innerRef={addToRefs}
                position={c.localPosition}
                color={c.color}
                opacity={globalOpacity}
                onPointerDown={(e) => handleCubePointerDown(topCount + i, e)}
                userData={{ id: c.id }}
              />
            ))}
          </group>

          <group ref={botSliceRef} position={[0, -1.08, 0]}>
            {slices.bot.map((c, i) => (
              <SingleCube
                key={c.id}
                innerRef={addToRefs}
                position={c.localPosition}
                color={c.color}
                opacity={globalOpacity}
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
 * Scene - Refined lighting for depth
 */
const Scene = ({ globalOpacity }) => {
  return (
    <>
      {/* Ambient - soft fill */}
      <ambientLight intensity={0.6} />

      {/* Key light - top right, warm */}
      <directionalLight
        position={[8, 12, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[512, 512]}
        color="#ffffff"
      />

      {/* Fill light - left, cooler */}
      <directionalLight
        position={[-6, 4, -3]}
        intensity={0.5}
        color="#e0e7ff"
      />

      {/* Rim light - subtle backlight */}
      <spotLight
        position={[0, 8, -12]}
        intensity={0.3}
        color="#f0f0f0"
        angle={0.5}
      />

      <RubiksCubeGroup globalOpacity={globalOpacity} />

      <Environment preset="city" />
    </>
  )
}

/**
 * RubiksCube - Main component with global presence
 */
const RubiksCube = ({ isVisible = true }) => {
  const containerRef = useRef()
  const opacityRef = useRef(1)

  // Gradual opacity fade based on scroll — direct DOM, no re-render
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const windowHeight = window.innerHeight
        const docHeight = document.documentElement.scrollHeight
        const scrollProgress = scrollY / (docHeight - windowHeight)

        const newOpacity = scrollProgress > 0.6
          ? Math.max(0.15, 1 - ((scrollProgress - 0.6) / 0.3) * 0.85)
          : 1

        if (containerRef.current) {
          containerRef.current.style.opacity = newOpacity
        }
        opacityRef.current = newOpacity
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-auto hidden md:block"
      style={{ zIndex: 0 }}
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 11], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#FAFAFA']} />
        <Scene globalOpacity={1} />
      </Canvas>
    </div>
  )
}

export default RubiksCube
