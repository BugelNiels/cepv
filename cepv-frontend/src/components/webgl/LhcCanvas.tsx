import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import { LhcEvent } from '../../types';
import { ColliderParts } from '../../data/ColliderParts';
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
import { Tracks } from './Tracks';

type EnvironmentPreset = "apartment" | "city" | "dawn" | "forest" | "lobby" | "night" | "park" | "studio" | "sunset" | "warehouse" | undefined;


interface LhcCanvasProps {
    currentEvent: { result: LhcEvent | null };
    colliderPartsEnabled: ColliderParts;
    backgroundPreset: EnvironmentPreset;
}

// TODO: see if we can do this dynamically?
const getCollidorParts = (parts: ColliderParts) => {
    const scale: number = 1;
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

// TODO: at some point, switch preset as it is not suitable for a production environment
const LhcCanvas = (props: LhcCanvasProps) => {
    return (
        <Canvas className='rounded shadow' shadows camera={{ fov: 35, zoom: 1, near: 0.01, far: 500 }} style={{flex: "1 1 auto"}}>
            <Tracks result={props.currentEvent.result} />
            <Suspense fallback={null}>
                {getCollidorParts(props.colliderPartsEnabled)}
            </Suspense>
            <Environment preset={props.backgroundPreset} background blur={1} />
            <OrbitControls />
        </Canvas>
    )
}

export { LhcCanvas };
export type { LhcCanvasProps, EnvironmentPreset };