import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react'
import { OrbitControls, Line, useGLTF, Environment } from '@react-three/drei'
import { LhcEvent } from '../../types';
import { ColliderPart, ColliderParts, defaultColliderParts } from '../../data/ColliderParts';
import { BeamPipe } from './collider/BeamPipe';
import { CathodeStripChambers } from './collider/CathodeStripChambers';
import { DriftTubes } from './collider/DriftTubes';
import { ECALBarrel } from './collider/ECALBarrel';
import { ECALEndcapNeg } from './collider/ECALEndcapNeg';
import { ECALEndcapPos } from './collider/ECALEndcapPos';
import { HCALBarrel } from './collider/HCALBarrel';
import { HCALEndcapNeg } from './collider/HCALEndcapNeg';
import { HCALEndcapPos } from './collider/HCALEndcapPos';
import { HCALForwardNeg } from './collider/HCALForwardNeg';
import { HCALForwardPos } from './collider/HCALForwardPos';
import { HCALOuter } from './collider/HCALOuter';
import { PixelBarrel } from './collider/PixelBarrel';
import { PixelEndcapNeg } from './collider/PixelEndcapNeg';
import { PixelEndcapPos } from './collider/PixelEndcapPos';
import { SteelYoke } from './collider/SteelYoke';
import { Support } from './collider/Support';
import { TrackerEndcapNeg } from './collider/TrackerEndcapNeg';
import { TrackerEndcapPos } from './collider/TrackerEndcapPos';
import { TrackerInnerBarrelNeg } from './collider/TrackerInnerBarrelNeg';
import { TrackerInnerBarrelPos } from './collider/TrackerInnerBarrelPos';
import { TrackerOuterBarrel } from './collider/TrackerOuterBarrel';
import { TrackerInnerBarrel } from './collider/TrackerInnerBarrel';


interface LhcCanvasProps {
    currentEvent: { result: LhcEvent | null };
    colliderPartsEnabled: ColliderParts;
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

// TODO: see if we can do this dynamically?
const getCollidorParts = (parts: ColliderParts) => {
    const scale: number = 0.1;
    return (
        <group scale={[scale, scale, scale]}>
            {<BeamPipe part={parts.beamPipe} />}
            {<CathodeStripChambers part={parts.cathodeStripChambers} />}
            {<DriftTubes part={parts.driftTubes} />}
            {<ECALBarrel part={parts.ecalBarrel} />}
            {<ECALEndcapNeg part={parts.ecalEndcapNeg} />}
            {<ECALEndcapPos part={parts.ecalEndcapPos} />}
            {<HCALBarrel part={parts.hcalBarrel} />}
            {<HCALEndcapNeg part={parts.hcalEndcapNeg} />}
            {<HCALEndcapPos part={parts.hcalEndcapPos} />}
            {<HCALForwardNeg part={parts.hcalFordwardNeg} />}
            {<HCALForwardPos part={parts.hcalFordwardPos} />}
            {<HCALOuter part={parts.hcalOuter} />}
            {<PixelBarrel part={parts.pixelBarrel} />}
            {<PixelEndcapNeg part={parts.pixelEndcapNeg} />}
            {<PixelEndcapPos part={parts.pixelEndcapPos} />}
            {<SteelYoke part={parts.steelYoke} />}
            {<Support part={parts.support} />}
            {<TrackerInnerBarrel part={parts.trackerInnerBarrel} />}
            {<TrackerEndcapNeg part={parts.trackerEndcapNeg} />}
            {<TrackerEndcapPos part={parts.trackerEndcapPos} />}
            {<TrackerInnerBarrelNeg part={parts.trackerInnerBarrelNeg} />}
            {<TrackerInnerBarrelPos part={parts.trackerInnerBarrelPos} />}
            {<TrackerOuterBarrel part={parts.trackerOuterBarrel} />}
        </group>
    )
}

const LhcCanvas = (props: LhcCanvasProps) => {


    return (
        <Canvas camera={{ fov: 35, zoom: 1, near: 0.01, far: 1000 }}>
            {tracks(props.currentEvent)}
            <Suspense fallback={null}>
                {getCollidorParts(props.colliderPartsEnabled)}
            </Suspense>
            <Environment preset="city" background blur={1} />
            <OrbitControls />
        </Canvas>
    )
}

export { LhcCanvas };
export type { LhcCanvasProps };