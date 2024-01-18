import { CubicBezierLine, Line } from '@react-three/drei';
import { LhcEvent } from '../../types';
import { Vector3 } from 'three';

interface TrackProps {
    result: LhcEvent | null;
}

const Tracks = (props: TrackProps) => {
    if (props == undefined || props.result == null) {
        return;
    }
    const tracksV3: [] = props.result.event.Collections.Extras_V1;
    return tracksV3.map((track: [][]) => {

        const p0 = new Vector3(...track[0]);
        const d0 = new Vector3(...track[1]);
        const d0Norm = d0.normalize();
        const p3 = new Vector3(...track[2]);
        const d3 = new Vector3(...track[3]);
        const d3Norm = d3.normalize();

        const t = p0.distanceTo(p3) * 0.25;

        const p1 = new Vector3(p0.x + t * d0Norm.x, p0.y + t * d0Norm.y, p0.z + t * d0Norm.z);
        const p2 = new Vector3(p3.x - t * d3Norm.x, p3.y - t * d3Norm.y, p3.z - t * d3Norm.z);

        return (
            <>
            <CubicBezierLine
                start={p0}
                end={p3}
                midA={p1}
                midB={p2}
                color="#ffc906"
                lineWidth={6}
            />
            <CubicBezierLine
                start={p0}
                end={p3}
                midA={p1}
                midB={p2}
                color="white"
                lineWidth={2}
            />
            </>
        )
    });
}

export { Tracks };