import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import keyGen from 'easy-key-generator'

const setRandomColor = () => {
  const colorGen = new keyGen(8, { characterType: 'HexChar' })
  return parseInt(`0x${colorGen.generate()}`.toLowerCase())
}

const Box = ({ wireframe, ...props }) => {
  const ref = useRef({})
  const [hovered, setHover] = useState(false)
  const [rotate, setRotate] = useState(false)
  // const speed = 0.5
  // const amplitude = 1

  useFrame((state, delta) => {
    if (rotate) {
      ref.current.rotation.x += 1 * delta
      ref.current.rotation.y += 0.5 * delta
    }

    // ref.current.position.y =
    //   Math.sin(state.clock.getElapsedTime() * speed) * amplitude
  })

  useEffect(() => {
    console.log(ref)
  }, [])
  return (
    <mesh
      {...props}
      ref={ref}
      scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      onPointerDown={() => setRotate(!rotate)}
      onPointerUp={() => setRotate(!rotate)}
      onPointerOver={() => setHover(!hovered)}
      onPointerOut={() => setHover(!hovered)}>
      <boxGeometry />
      <meshBasicMaterial
        color={hovered ? setRandomColor() : 0x00ff00}
        wireframe={wireframe}
      />
    </mesh>
  )
}

export default Box
