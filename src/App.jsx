import { Canvas } from '@react-three/fiber'
import Box from './Box'

const App = ({ children }) => {
  return (
    <Canvas camera={{ position: [0, 0, 2] }}>
      <Box position={[0.55, 0.55, 0]} name="Box A" wireframe={true} />
      <Box position={[-0.55, 0, 0]} name="Box B" wireframe={false} />
    </Canvas>
  )
}

export default App
