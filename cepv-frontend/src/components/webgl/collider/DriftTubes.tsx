/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 Drift_Tubes.glb --transform -o DriftTubes.tsx -t 
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { ColliderPart } from '../../../data/ColliderParts'

type GLTFResult = GLTF & {
  nodes: {
    Drift_Tubes: THREE.Mesh
  }
  materials: {}
  animations: []
}

interface PartProps {
  part: ColliderPart;
}

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

export function DriftTubes(props: PartProps) {
  const { nodes, materials } = useGLTF('/models/Drift_Tubes-transformed.glb') as GLTFResult
  if (!props.part.enabled) {
    return;
  }
  return (
    <group dispose={null}>
      <mesh geometry={nodes.Drift_Tubes.geometry} position={[-2.932, -0.067, -0.049]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} >
        <meshStandardMaterial color={props.part.color} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/Drift_Tubes-transformed.glb')
