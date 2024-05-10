import {
  Stats,
  OrbitControls,
  Circle,
  Environment,
  Html
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useState } from 'react'

function Model() {
  const url = '/models/small_room.glb'
  const { scene } = useGLTF(url)
  const [cache, setCache] = useState({})

  if (!cache[url]) {
    const annotations = []
    scene.traverse((i) => {
      if (i.isMesh) {
        i.castShadow = true
        i.receiveShadow = true
      }

      if (i.userData.prop) {
        annotations.push(
          <Html
            key={i.uuid}
            position={[i.position.x, i.position.y, i.position.z]}
            distanceFactor={2}>
            <div className="annotation">{i.userData.prop}</div>
          </Html>
        )
      }
    })
    setCache({
      ...cache,
      [url]: (
        <primitive object={scene} castShadow receiveShadow>
          {annotations}
        </primitive>
      )
    })
  }

  return cache[url]
}

export default function App() {
  return (
    <Canvas camera={{ position: [-0.5, 1, 2] }} shadows>
      <Environment preset="sunset" background />
      <spotLight
        position={[15, 20, 10.5]}
        angle={1}
        power={10000}
        distance={100}
        castShadow>
        <mesh>
          <sphereGeometry args={[0.25]} />
        </mesh>
      </spotLight>
      <Model />
      <OrbitControls target={[0, 1, 0]} />
      <Stats />
    </Canvas>
  )
}
