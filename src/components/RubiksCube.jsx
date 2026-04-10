import { useRef, useEffect, useMemo, useLayoutEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, PresentationControls, Environment, Float } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

// ============================================
// CONSTANTS
// ============================================

const PHYSICS_FLOOR_Y = -4.5
const GAP = 1.08

const COLORS = {
  white: '#FFFFFF',
  accent: '#94A3B8',
  dark: '#1A1A1A',
  lightSlate: '#CBD5E1',
  offWhite: '#F8FAFC',
  darkSlate: '#475569',
  indigo: '#6366f1',
  indigoLight: '#a5b4fc',
}

const cubeColors = [
  COLORS.white, COLORS.accent, COLORS.dark,
  COLORS.lightSlate, COLORS.offWhite, COLORS.darkSlate,
  COLORS.indigo, COLORS.indigoLight,
]

// ============================================
// CUBELET ARRANGEMENT FUNCTIONS
// Pure functions returning target positions per cubelet
// ============================================

/** Arrange cubelets in a tilted ring/helix */
const arrangeRing = (count, radius = 3.5, tilt = 0.3) => {
  const positions = []
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    const heightOffset = Math.sin(angle * 2) * 0.8 // helix wave
    positions.push({
      x: Math.cos(angle) * radius,
      y: heightOffset + Math.sin(i * 0.5) * 0.3,
      z: Math.sin(angle) * radius,
      rx: angle * 0.5 + tilt,
      ry: angle,
      rz: Math.sin(angle) * 0.3,
    })
  }
  return positions
}

/** Arrange cubelets in a flat grid (for projects) */
const arrangeGrid = (count, cols = 6, spacing = 1.6) => {
  const rows = Math.ceil(count / cols)
  const positions = []
  const offsetX = ((cols - 1) * spacing) / 2
  const offsetY = ((rows - 1) * spacing) / 2

  for (let i = 0; i < count; i++) {
    const col = i % cols
    const row = Math.floor(i / cols)
    positions.push({
      x: col * spacing - offsetX,
      y: -(row * spacing - offsetY),
      z: 0,
      rx: 0,
      ry: 0,
      rz: 0,
    })
  }
  return positions
}

/** Arrange cubelets in stacked columns (for skills) */
const arrangeColumns = (count, groups = 4) => {
  const perGroup = Math.ceil(count / groups)
  const positions = []
  const groupSpacing = 2.2
  const cubeSpacing = 1.15
  const totalWidth = (groups - 1) * groupSpacing
  const offsetX = totalWidth / 2

  for (let i = 0; i < count; i++) {
    const group = Math.floor(i / perGroup)
    const indexInGroup = i % perGroup
    positions.push({
      x: group * groupSpacing - offsetX,
      y: indexInGroup * cubeSpacing - (perGroup * cubeSpacing) / 2 + cubeSpacing / 2,
      z: 0,
      rx: 0,
      ry: Math.PI * 0.1 * group,
      rz: 0,
    })
  }
  return positions
}

/** Return cubelets to original 3x3x3 positions */
const assembleCube = () => {
  const positions = []
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        positions.push({
          x: x * GAP,
          y: y * GAP,
          z: z * GAP,
          rx: 0,
          ry: 0,
          rz: 0,
        })
      }
    }
  }
  return positions
}

// ============================================
// SINGLE CUBE COMPONENT
// ============================================

const SingleCube = ({
  position, color, scale = 1, innerRef,
  onPointerDown, userData, opacity = 1
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
      onPointerOut={() => setHovered(false)}
      onPointerDown={(e) => { if (onPointerDown) onPointerDown(e) }}
      onPointerUp={() => {}}
    >
      <RoundedBox args={[1, 1, 1]} radius={0.1} smoothness={4} castShadow receiveShadow>
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

// ============================================
// RUBIK'S CUBE GROUP — Main animated cube
// ============================================

const RubiksCubeGroup = ({ globalOpacity, scrollVelocity = 0 }) => {
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
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const colorIndex = Math.floor(Math.random() * cubeColors.length)
          const cubeData = {
            localPosition: [x * GAP, 0, z * GAP],
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
    for (let i = 0; i < 27; i++) {
      physics.current.velocities.push(new THREE.Vector3(0, 0, 0))
      physics.current.offsets.push(new THREE.Vector3(0, 0, 0))
    }
  }, [])

  // Idle animation control
  useEffect(() => {
    idleTimeline.current?.play()
    const st = ScrollTrigger.create({
      trigger: '#details-section',
      start: 'center center',
      onEnter: () => idleTimeline.current?.pause(),
      onLeaveBack: () => idleTimeline.current?.play()
    })
    return () => st.kill()
  }, [])

  // Pointer up
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

  // Pre-allocated vectors
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

  // Physics frame
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
          if (dist < 1.3) {
            _pushDir.copy(_otherPos).sub(mesh.position).normalize()
            physics.current.velocities[j].add(_pushDir.multiplyScalar((1.3 - dist) * 20 * delta))
          }
        })
        return
      }

      if (dragRef.current === null) {
        const distToMouse = _meshFloorPos.distanceTo(_mouseFloorPos)
        if (distToMouse < repulsionRadius) {
          _forceDir.copy(_meshFloorPos).sub(_mouseFloorPos).normalize()
          velocity.add(_forceDir.multiplyScalar((1 - distToMouse / repulsionRadius) * repulsionForce * delta))
        }
      }

      cubesRefs.current.forEach((otherMesh, j) => {
        if (i === j || !otherMesh) return
        otherMesh.getWorldPosition(_otherPos)
        const dist = _currentWorldPos.distanceTo(_otherPos)
        if (dist < 1.2) {
          _pushDir.copy(_currentWorldPos).sub(_otherPos).normalize()
          _pushDir.x += (Math.random() - 0.5) * 0.1
          _pushDir.z += (Math.random() - 0.5) * 0.1
          velocity.add(_pushDir.multiplyScalar((1.2 - dist) * 12 * delta))
        }
      })

      const safeBoundary = Math.max(2, worldWidth - 1)
      if (mesh.position.x > safeBoundary) { velocity.x *= -0.7; mesh.position.x = safeBoundary }
      else if (mesh.position.x < -safeBoundary) { velocity.x *= -0.7; mesh.position.x = -safeBoundary }

      mesh.position.x += velocity.x * delta
      mesh.position.z += velocity.z * delta
      mesh.position.y += Math.sin(state.clock.elapsedTime * 2 + i) * 0.002

      velocity.multiplyScalar(drag)
    })
  })

  // ============================================
  // MAIN ANIMATION SETUP — 7 narrative timelines
  // ============================================
  useLayoutEffect(() => {
    if (!mainGroupRef.current || !topSliceRef.current || !midSliceRef.current || !botSliceRef.current) return

    const mm = gsap.matchMedia()

    mm.add({
      isMobile: '(max-width: 799px)',
      isDesktop: '(min-width: 800px)'
    }, (context) => {
      const { isMobile } = context.conditions
      const screenWidth = viewport.width

      // ---- Initial state ----
      const startPos = isMobile ? [0, -2.8, 0] : [3.5, 0, 0]
      const startScale = isMobile ? 0.5 : 0.7
      mainGroupRef.current.position.set(...startPos)
      mainGroupRef.current.scale.set(startScale, startScale, startScale)
      mainGroupRef.current.rotation.set(0.3, -0.5, 0)

      // ---- Idle animation ----
      if (idleTimeline.current) idleTimeline.current.kill()
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.2, defaults: { ease: 'power3.inOut' } })
      idleTimeline.current = tl

      const t = 0.8
      const sliceAngle = Math.PI / 4
      tl.to(topSliceRef.current.rotation, { y: sliceAngle, duration: t })
        .to(botSliceRef.current.rotation, { y: -sliceAngle, duration: t }, '<0.1')
        .to(mainGroupRef.current.rotation, { z: Math.PI / 2, duration: t * 1.2 }, '+=0.1')
        .to(midSliceRef.current.rotation, { y: sliceAngle, duration: t })
        .to(topSliceRef.current.rotation, { y: sliceAngle * 2, duration: t }, '<0.1')
        .to(mainGroupRef.current.rotation, { x: 0.2, y: -0.5, z: 0, duration: t * 1.5 }, '+=0.1')
        .to(midSliceRef.current.rotation, { y: 0, duration: t }, '+=0.2')
        .to(topSliceRef.current.rotation, { y: 0, duration: t }, '<')
        .to(botSliceRef.current.rotation, { y: 0, duration: t }, '<')

      // ============================================
      // TIMELINE 1: Hero → Details (reposition + scale)
      // Narrative: "Focused expertise" — cube centers and grows
      // ============================================
      const belowParaPos = isMobile ? [0, -0.5, 0] : [0, -0.8, 0]
      const detailScale = isMobile ? 0.6 : 0.85

      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero-section',
          start: 'top top',
          endTrigger: '#details-section',
          end: 'bottom center',
          scrub: 0.5,
          immediateRender: false,
        }
      })

      tl1.to(mainGroupRef.current.rotation, {
        x: 0.2, y: Math.PI * 0.25, z: 0, duration: 1, ease: 'power2.inOut'
      }, 0)
      .to(mainGroupRef.current.position, {
        x: belowParaPos[0], y: belowParaPos[1], z: belowParaPos[2], ease: 'power1.inOut'
      }, 0)
      .to(mainGroupRef.current.scale, {
        x: detailScale, y: detailScale, z: detailScale, ease: 'power1.inOut'
      }, 0)

      // ============================================
      // TIMELINE 2: Explosion — "Breaking down the components"
      // ============================================
      const breakdownScale = isMobile ? 0.55 : 0.8

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: '#breakdown-section',
          start: 'top 55%',
          end: 'center center',
          scrub: 0.5,
        }
      })

      tl2.to([topSliceRef.current.rotation, midSliceRef.current.rotation, botSliceRef.current.rotation], {
        x: 0, y: 0, z: 0, duration: 0.3, ease: 'power2.inOut'
      }, 0)

      tl2.to(mainGroupRef.current.position, { x: 0, y: 0, z: 0, ease: 'power2.inOut' }, 0)
        .to(mainGroupRef.current.scale, { x: breakdownScale, y: breakdownScale, z: breakdownScale, ease: 'power2.inOut' }, 0)
        .to(mainGroupRef.current.rotation, { x: 0.4, y: Math.PI * 2, z: 0.15, ease: 'power2.inOut' }, 0)

      cubesRefs.current.forEach((mesh) => {
        if (!mesh) return
        const parentY =
          slices.top.find(c => c.id === mesh.userData.id) ? 1.08 :
          slices.bot.find(c => c.id === mesh.userData.id) ? -1.08 : 0

        const direction = new THREE.Vector3(mesh.position.x, parentY, mesh.position.z).normalize()
        if (direction.length() === 0) direction.set(0, 1, 0)

        const safeSpread = Math.min(3.0, screenWidth * 0.25)
        const explodeDist = safeSpread + Math.random() * 2

        tl2.to(mesh.position, {
          x: mesh.position.x + direction.x * (explodeDist * 0.7),
          y: mesh.position.y + (direction.y * explodeDist) - parentY,
          z: mesh.position.z + direction.z * explodeDist,
          ease: 'power2.out', overwrite: 'auto'
        }, 0)

        tl2.to(mesh.rotation, {
          x: Math.random() * Math.PI * 1.5,
          y: Math.random() * Math.PI * 1.5,
          z: Math.random() * Math.PI * 1.5,
          duration: 1, overwrite: 'auto'
        }, 0)
      })

      // ============================================
      // TIMELINE 3: Drop — gravity fall with bounce
      // ============================================
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: '#breakdown-section',
          start: 'center center',
          endTrigger: '#about',
          end: 'top top',
          scrub: 0.5,
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

        tl3.to(mesh.position, {
          x: dropTargetX,
          y: dropTargetY - parentYOffset,
          z: dropTargetZ,
          ease: 'bounce.out',
          duration: 2.5,
          overwrite: 'auto',
        }, i * 0.02)

        tl3.to(mesh.rotation, {
          x: Math.random() * Math.PI * 3,
          y: Math.random() * Math.PI * 3,
          z: Math.random() * Math.PI * 3,
          ease: 'power1.out',
          overwrite: 'auto',
        }, '<')
      })

      // ============================================
      // TIMELINE 4: About — "The journey" orbit ring
      // Cubelets transition from scattered floor to ring
      // ============================================
      const ringPositions = arrangeRing(27, isMobile ? 2.5 : 3.5, 0.3)

      const tl4 = gsap.timeline({
        scrollTrigger: {
          trigger: '#about',
          start: 'top 80%',
          end: 'center center',
          scrub: 0.5,
          onEnter: () => {
            physics.current.active = false
            physics.current.velocities.forEach(v => v.set(0, 0, 0))
          },
          onLeaveBack: () => { physics.current.active = true },
        }
      })

      // Reset main group to neutral
      tl4.to(mainGroupRef.current.position, { x: 0, y: 0, z: 0, ease: 'power2.inOut', duration: 1 }, 0)
      tl4.to(mainGroupRef.current.rotation, { x: 0.2, y: 0, z: 0, ease: 'power2.inOut', duration: 1 }, 0)
      tl4.to(mainGroupRef.current.scale, {
        x: isMobile ? 0.5 : 0.65,
        y: isMobile ? 0.5 : 0.65,
        z: isMobile ? 0.5 : 0.65,
        ease: 'power2.inOut', duration: 1
      }, 0)

      // Reset slice rotations
      tl4.to([topSliceRef.current.rotation, midSliceRef.current.rotation, botSliceRef.current.rotation], {
        x: 0, y: 0, z: 0, duration: 0.5, ease: 'power2.inOut'
      }, 0)

      cubesRefs.current.forEach((mesh, i) => {
        if (!mesh || !ringPositions[i]) return
        const rp = ringPositions[i]
        const parentYOffset =
          slices.top.find(c => c.id === mesh.userData.id) ? 1.08 :
          slices.bot.find(c => c.id === mesh.userData.id) ? -1.08 : 0

        tl4.to(mesh.position, {
          x: rp.x, y: rp.y - parentYOffset, z: rp.z,
          ease: 'power3.inOut', duration: 1, overwrite: 'auto',
        }, i * 0.015)

        tl4.to(mesh.rotation, {
          x: rp.rx, y: rp.ry, z: rp.rz,
          ease: 'power2.inOut', duration: 1, overwrite: 'auto',
        }, i * 0.015)
      })

      // ============================================
      // TIMELINE 5: Projects — "Organized body of work" grid
      // ============================================
      const gridPositions = arrangeGrid(27, 6, isMobile ? 1.3 : 1.6)

      const tl5 = gsap.timeline({
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 80%',
          end: 'center center',
          scrub: 0.5,
        }
      })

      tl5.to(mainGroupRef.current.rotation, { x: 0, y: 0, z: 0, ease: 'power2.inOut', duration: 1 }, 0)
      tl5.to(mainGroupRef.current.scale, {
        x: isMobile ? 0.45 : 0.55,
        y: isMobile ? 0.45 : 0.55,
        z: isMobile ? 0.45 : 0.55,
        ease: 'power2.inOut', duration: 1
      }, 0)

      cubesRefs.current.forEach((mesh, i) => {
        if (!mesh || !gridPositions[i]) return
        const gp = gridPositions[i]
        const parentYOffset =
          slices.top.find(c => c.id === mesh.userData.id) ? 1.08 :
          slices.bot.find(c => c.id === mesh.userData.id) ? -1.08 : 0

        tl5.to(mesh.position, {
          x: gp.x, y: gp.y - parentYOffset, z: gp.z,
          ease: 'power3.out', duration: 1, overwrite: 'auto',
        }, i * 0.01)

        tl5.to(mesh.rotation, {
          x: gp.rx, y: gp.ry, z: gp.rz,
          ease: 'power2.out', duration: 1, overwrite: 'auto',
        }, i * 0.01)
      })

      // ============================================
      // TIMELINE 6: Skills — "Building blocks" stacked columns
      // ============================================
      const columnPositions = arrangeColumns(27, 4)

      const tl6 = gsap.timeline({
        scrollTrigger: {
          trigger: '#skills',
          start: 'top 80%',
          end: 'center center',
          scrub: 0.5,
        }
      })

      tl6.to(mainGroupRef.current.rotation, { x: 0.15, y: Math.PI * 0.15, z: 0, ease: 'power2.inOut', duration: 1 }, 0)
      tl6.to(mainGroupRef.current.scale, {
        x: isMobile ? 0.45 : 0.55,
        y: isMobile ? 0.45 : 0.55,
        z: isMobile ? 0.45 : 0.55,
        ease: 'power2.inOut', duration: 1
      }, 0)

      cubesRefs.current.forEach((mesh, i) => {
        if (!mesh || !columnPositions[i]) return
        const cp = columnPositions[i]
        const parentYOffset =
          slices.top.find(c => c.id === mesh.userData.id) ? 1.08 :
          slices.bot.find(c => c.id === mesh.userData.id) ? -1.08 : 0

        tl6.to(mesh.position, {
          x: cp.x, y: cp.y - parentYOffset, z: cp.z,
          ease: 'back.out(1.2)', duration: 1, overwrite: 'auto',
        }, i * 0.012)

        tl6.to(mesh.rotation, {
          x: cp.rx, y: cp.ry, z: cp.rz,
          ease: 'power2.out', duration: 1, overwrite: 'auto',
        }, i * 0.012)
      })

      // ============================================
      // TIMELINE 7: Contact — "Ready to connect" reassembly
      // ============================================
      const assembledPositions = assembleCube()

      const tl7 = gsap.timeline({
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 80%',
          end: 'center center',
          scrub: 0.5,
        }
      })

      tl7.to(mainGroupRef.current.rotation, { x: 0.3, y: -0.5, z: 0, ease: 'power2.inOut', duration: 1 }, 0)
      tl7.to(mainGroupRef.current.scale, {
        x: isMobile ? 0.5 : 0.7,
        y: isMobile ? 0.5 : 0.7,
        z: isMobile ? 0.5 : 0.7,
        ease: 'power2.inOut', duration: 1
      }, 0)
      tl7.to(mainGroupRef.current.position, { x: isMobile ? 0 : 2, y: 0, z: 0, ease: 'power2.inOut', duration: 1 }, 0)

      // Reset slices to identity
      tl7.to([topSliceRef.current.position], { x: 0, y: 1.08, z: 0, ease: 'power2.inOut', duration: 1 }, 0)
      tl7.to([midSliceRef.current.position], { x: 0, y: 0, z: 0, ease: 'power2.inOut', duration: 1 }, 0)
      tl7.to([botSliceRef.current.position], { x: 0, y: -1.08, z: 0, ease: 'power2.inOut', duration: 1 }, 0)

      cubesRefs.current.forEach((mesh, i) => {
        if (!mesh || !assembledPositions[i]) return
        const ap = assembledPositions[i]

        // Cubelets need positions local to their slice
        // The assembled positions are world positions; we need to convert
        // Top slice (y=1): local = world - sliceOffset
        // Mid slice (y=0): local = world
        // Bot slice (y=-1): local = world + sliceOffset
        const sliceY = ap.y // -1.08, 0, or 1.08
        let localY = 0
        if (Math.abs(sliceY - GAP) < 0.5) localY = 0 // top slice
        else if (Math.abs(sliceY) < 0.5) localY = 0 // mid slice
        else localY = 0 // bot slice

        tl7.to(mesh.position, {
          x: ap.x, y: localY, z: ap.z,
          ease: 'back.out(1.4)', duration: 1.2, overwrite: 'auto',
        }, i * 0.015)

        tl7.to(mesh.rotation, {
          x: 0, y: 0, z: 0,
          ease: 'power2.inOut', duration: 1, overwrite: 'auto',
        }, i * 0.015)
      })

    })

    return () => mm.revert()
  }, [slices, viewport.width])

  // Ref accumulator
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

// ============================================
// DECORATIVE ELEMENTS
// ============================================

const WireframeShape = ({ position, rotation = [0, 0, 0], scale = 1, type = 'box' }) => {
  const ref = useRef()
  const geometry = useMemo(() => {
    switch (type) {
      case 'sphere': return new THREE.SphereGeometry(1, 16, 16)
      case 'icosahedron': return new THREE.IcosahedronGeometry(1, 0)
      case 'torus': return new THREE.TorusGeometry(1, 0.3, 8, 24)
      case 'octahedron': return new THREE.OctahedronGeometry(1, 0)
      default: return new THREE.BoxGeometry(1, 1, 1)
    }
  }, [type])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15
      ref.current.rotation.y += delta * 0.2
    }
  })

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh ref={ref} geometry={geometry}>
        <meshBasicMaterial color="#111" wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

const FloatingCubes = () => (
  <group>
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <SingleCube position={[-2.5, 1.5, 2]} color="#94A3B8" scale={0.5} />
    </Float>
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.4}>
      <SingleCube position={[-5.5, -2.5, 1.5]} color="#1A1A1A" scale={0.4} />
    </Float>
    <Float speed={1.3} rotationIntensity={0.6} floatIntensity={0.4}>
      <SingleCube position={[-3.5, -2.8, 2.5]} color="#F8FAFC" scale={0.35} />
    </Float>
  </group>
)

// ============================================
// SCENE — Lighting + all 3D elements
// ============================================

const Scene = ({ globalOpacity }) => (
  <>
    <ambientLight intensity={0.6} />
    <directionalLight position={[8, 12, 5]} intensity={1.2} castShadow shadow-mapSize={[512, 512]} color="#ffffff" />
    <directionalLight position={[-6, 4, -3]} intensity={0.5} color="#e0e7ff" />
    <spotLight position={[0, 8, -12]} intensity={0.3} color="#f0f0f0" angle={0.5} />

    <RubiksCubeGroup globalOpacity={globalOpacity} />

    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
      <WireframeShape position={[0, 4, -5]} type="box" scale={1.5} />
    </Float>
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
      <WireframeShape position={[6, -4, -2]} type="sphere" scale={1.2} />
    </Float>
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
      <WireframeShape position={[-5, 5, -8]} type="icosahedron" scale={2} />
    </Float>
    <Float speed={0.6} rotationIntensity={0.15} floatIntensity={0.15}>
      <WireframeShape position={[-6, -3, -6]} type="torus" scale={1.8} />
    </Float>
    <Float speed={0.9} rotationIntensity={0.25} floatIntensity={0.2}>
      <WireframeShape position={[4, 3, -10]} type="octahedron" scale={1.3} />
    </Float>

    <FloatingCubes />
    <Environment preset="city" />
  </>
)

// ============================================
// MAIN EXPORT — Canvas wrapper
// ============================================

const RubiksCube = ({ isVisible = true }) => {
  const containerRef = useRef()

  // Scroll-based opacity via Lenis (reads from scroll event)
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

        // Full opacity hero→breakdown, fade during about→skills, return for contact
        let newOpacity = 1
        if (scrollProgress > 0.4 && scrollProgress < 0.75) {
          // Fade to 0.3 during middle sections (about, projects, skills)
          const fadeProgress = (scrollProgress - 0.4) / 0.15
          newOpacity = Math.max(0.3, 1 - fadeProgress * 0.7)
        } else if (scrollProgress >= 0.75) {
          // Fade back in for contact reassembly
          const returnProgress = (scrollProgress - 0.75) / 0.15
          newOpacity = Math.min(0.8, 0.3 + returnProgress * 0.5)
        }

        if (containerRef.current) {
          containerRef.current.style.opacity = newOpacity
        }
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
        <color attach="background" args={['#FFFFFF']} />
        <Scene globalOpacity={1} />
      </Canvas>
    </div>
  )
}

export default RubiksCube
