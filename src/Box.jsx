import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import keyGen from 'easy-key-generator'
import * as THREE from 'three'

const setRandomColor = () => {
  const colorGen = new keyGen(8, { characterType: 'HexChar' })
  return parseInt(`0x${colorGen.generate()}`)
}

const Box = ({ wireframe, ...props }) => {
  const ref = useRef({})
  const [hovered, setHover] = useState(false)
  const [rotate, setRotate] = useState(false)
  const [count, setCount] = useState(0)
  const geometry = useMemo(
    () => [new THREE.BoxGeometry(), new THREE.SphereGeometry(0.785398)],
    []
  )

  // const speed = 0.5
  // const amplitude = 1

  useFrame((state, delta) => {
    ref.current.rotation.x += 1 * delta * rotate // rotate will be either 0 or 1 (false or true)
    ref.current.rotation.y += 0.5 * delta * rotate

    // ref.current.position.y =
    //   Math.sin(state.clock.getElapsedTime() * speed) * amplitude
  })

  useEffect(() => {
    console.log(ref.current.geometry.uuid)
  })
  return (
    <mesh
      {...props}
      ref={ref}
      scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      onPointerDown={() => setCount((count + 1) % 2)}
      onPointerUp={() => setRotate(!rotate)}
      onPointerOver={() => setHover(!hovered)}
      onPointerOut={() => setHover(!hovered)}
      geometry={geometry[count]}>
      <boxGeometry />
      <meshBasicMaterial
        color={hovered ? setRandomColor() : 0x00ff00}
        wireframe={wireframe}
      />
    </mesh>
  )
}

export default Box
