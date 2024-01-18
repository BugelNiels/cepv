
interface ColliderPart {
    name: string;
    color: string;
    enabled: boolean;
    path: string;
}

interface ColliderParts {
    beamPipe: ColliderPart;
    cathodeStripChambers: ColliderPart;
    driftTubes: ColliderPart;
    ecalBarrel: ColliderPart;
    ecalEndcapNeg: ColliderPart;
    ecalEndcapPos: ColliderPart;
    hcalBarrel: ColliderPart;
    hcalEndcapNeg: ColliderPart;
    hcalEndcapPos: ColliderPart;
    hcalFordwardNeg: ColliderPart;
    hcalFordwardPos: ColliderPart;
    hcalOuter: ColliderPart;
    pixelBarrel: ColliderPart;
    pixelEndcapNeg: ColliderPart;
    pixelEndcapPos: ColliderPart;
    steelYoke: ColliderPart;
    support: ColliderPart;
    trackerEndcapNeg: ColliderPart;
    trackerEndcapPos: ColliderPart;
    trackerInnerBarrelNeg: ColliderPart;
    trackerInnerBarrelPos: ColliderPart;
    trackerInnerBarrel: ColliderPart;
    trackerOuterBarrel: ColliderPart;
}

const defaultColliderParts: ColliderParts = {
    beamPipe: {
        name: "Beam Pipe",
        color: "#BBBBBB",
        enabled: true,
        path: "/models/Beam_Pipe.glb"
    },
    cathodeStripChambers: {
        name: "Cathode Strip Chambers",
        color: "#F4F4F4",
        enabled: true,
        path: "/models/Cathode_Strip_Chambers.glb"
    },
    driftTubes: {
        name: "Drift Tubes",
        color: "#F4F4F4",
        enabled: true,
        path: "/models/Drift_Tubes.glb"
    },
    ecalBarrel: {
        name: "ECAL Barrel",
        color: "#AAFFE7",
        enabled: true,
        path: "/models/ECAL_Barrel.glb"
    },
    ecalEndcapNeg: {
        name: "ECAL Endcap (-)",
        color: "#AAFFE7",
        enabled: true,
        path: "/models/ECAL_Endcap_neg.glb"
    },
    ecalEndcapPos: {
        name: "ECAL Endcap (+)",
        color: "#AAFFE7",
        enabled: true,
        path: "/models/ECAL_Endcap_pos.glb"
    },
    hcalBarrel: {
        name: "HCAL Barrel",
        color: "#FFE7AA",
        enabled: true,
        path: "/models/HCAL_Barrel.glb"
    },
    hcalEndcapNeg: {
        name: "HCAL Endcap (-)",
        color: "#FFE7AA",
        enabled: true,
        path: "/models/HCAL_Endcap_neg.glb"
    },
    hcalEndcapPos: {
        name: "HCAL Endcap (+)",
        color: "#FFE7AA",
        enabled: true,
        path: "/models/HCAL_Endcap_pos.glb"
    },
    hcalFordwardNeg: {
        name: "HCAL Forward (-)",
        color: "#FFBC00",
        enabled: true,
        path: "/models/HCAL_Forward_neg.glb"
    },
    hcalFordwardPos: {
        name: "HCAL Forward (+)",
        color: "#FFBC00",
        enabled: true,
        path: "/models/HCAL_Forward_pos.glb"
    },
    hcalOuter: {
        name: "HCAL Outer",
        color: "#F4F4F4",
        enabled: true,
        path: "/models/HCAL_Outer.glb"
    },
    pixelBarrel: {
        name: "Pixel Barrel",
        color: "#E7FFAA",
        enabled: true,
        path: "/models/Pixel_Barrel.glb"
    },
    pixelEndcapNeg: {
        name: "Pixel Endcap (-)",
        color: "#E7FFAA",
        enabled: true,
        path: "/models/Pixel_Endcap_neg.glb"
    },
    pixelEndcapPos: {
        name: "Pixel Endcap (+)",
        color: "#E7FFAA",
        enabled: true,
        path: "/models/Pixel_Endcap_pos.glb"
    },
    steelYoke: {
        name: "Steel Yoke",
        color: "#FF0000",
        enabled: true,
        path: "/models/Steel_Yoke.glb"
    },
    support: {
        name: "Support",
        color: "#FF0000",
        enabled: true,
        path: "/models/Support.glb"
    },
    trackerEndcapNeg: {
        name: "Tracker Endcap (-)",
        color: "#AAE7FF",
        enabled: true,
        path: "/models/Tracker_Endcap_neg.glb"
    },
    trackerEndcapPos: {
        name: "Tracker Endcap (+)",
        color: "#AAE7FF",
        enabled: true,
        path: "/models/Tracker_Endcap_pos.glb"
    },
    trackerInnerBarrel: {
        name: "Tracker Inner Barrel",
        color: "#AAE7FF",
        enabled: true,
        path: "/models/Tracker_Inner_Barrel.glb"
    },
    trackerInnerBarrelNeg: {
        name: "Tracker Inner Barrel (-)",
        color: "#AAE7FF",
        enabled: true,
        path: "/models/Tracker_Inner_Barrel_neg.glb"
    },
    trackerInnerBarrelPos: {
        name: "Tracker Inner Barrel (+)",
        color: "#AAE7FF",
        enabled: true,
        path: "/models/Tracker_Inner_Barrel_pos.glb"
    },
    trackerOuterBarrel: {
        name: "Tracker Outer Barrel",
        color: "#AAE7FF",
        enabled: true,
        path: "/models/Tracker_Outer_Barrel.glb"
    },
}

export { defaultColliderParts }
export type { ColliderPart, ColliderParts }