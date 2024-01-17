import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react'
import { OrbitControls, Line, useGLTF, Environment } from '@react-three/drei'
import { LhcEvent } from '../../types';
import { ColliderPart, ColliderParts, defaultColliderParts } from '../../data/ColliderParts';


interface LhcCanvasProps {
    currentEvent: { result: LhcEvent | null };
    colliderPartsEnabled: ColliderParts;
}

const loadObj = (part: ColliderPart) => {
    const { scene } = useGLTF(part.path);
    return (
        <primitive object={scene} color={part.color} />
    );
}

const colliderParts = (parts: ColliderParts) => {
    const meshes = Object.entries(parts).filter(
        ([_, value]: [string, ColliderPart]) => value.enabled
    ).map(([_, value]: [string, ColliderPart]) => {
        console.log("mesh:", value)
        return loadObj(value);
    });
    return (
        <group>
            {meshes}
        </group>
    )
}


const tracks = (currentLhcEvent: { result: LhcEvent | null }) => {
    if (currentLhcEvent == undefined || currentLhcEvent.result == null) {
        return;
    }
    const tracksV3: [] = currentLhcEvent.result.event.Collections.Tracks_V3;
    return tracksV3.map(track => {
        return (
            <Line
                points={[
                    [0, 0, 0],
                    track[0],
                ]}
                color={track[1]}
            />
        )
    });
}

Object.entries(defaultColliderParts).forEach(([key, value]) => {
    console.log("preloading: ", value.path);
    useGLTF.preload(value.path);
})

const LhcCanvas = (props: LhcCanvasProps) => {


    return (
        <Canvas camera={{ fov: 35, zoom: 1, near: 0.01, far: 1000 }}>
            {tracks(props.currentEvent)}
            <Suspense fallback={null}>
                {colliderParts(props.colliderPartsEnabled)}
            </Suspense>
            <Environment preset="city" background blur={1} />
            <OrbitControls />
        </Canvas>
    )
}

export { LhcCanvas };
export type { LhcCanvasProps };