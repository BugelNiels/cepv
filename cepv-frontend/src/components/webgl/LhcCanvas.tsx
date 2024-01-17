import { Canvas, ReactThreeFiber, extend } from '@react-three/fiber';
import React, { useRef, useState } from 'react'
import { Stats, OrbitControls, Stage, Line, PerspectiveCamera } from '@react-three/drei'
import { LhcEvent } from '../../types';


const LhcCanvas = (currentEvent: { result: LhcEvent | null }) => {


    const tracks = () => {
        if (currentEvent == undefined || currentEvent.result == null) {
            return;
        }
        const tracksV3: [] = currentEvent.result.event.Collections.Tracks_V3;
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
    return (
        <Canvas camera={{ fov: 35, zoom: 100, near: 0.01, far: 10 }}>
            <color attach="background" args={[0, 0, 0]} />
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

                {tracks()}
            <OrbitControls />
        </Canvas>
    )
}

export { LhcCanvas }