import { useRef } from 'react'

const Box = ({ wireframe, ...props }) => {
  const ref = useRef()
  console.log(ref)
  return (
    <mesh {...props} ref={ref}>
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} wireframe={wireframe} />
    </mesh>
  )
}

export default Box
