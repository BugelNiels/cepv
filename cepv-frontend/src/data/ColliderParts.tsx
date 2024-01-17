
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
        color: "#000000",
        enabled: false,
        path: "/models/Beam_Pipe.glb"
    },
    cathodeStripChambers: {
        name: "Cathode Strip Chambers",
        color: "#000000",
        enabled: false,
        path: "/models/Cathode_Strip_Chambers.glb"
    },
    driftTubes: {
        name: "Drift Tubes",
        color: "#000000",
        enabled: false,
        path: "/models/Drift_Tubes.glb"
    },
    ecalBarrel: {
        name: "ECAL Barrel",
        color: "#000000",
        enabled: false,
        path: "/models/ECAL_Barrel.glb"
    },
    ecalEndcapNeg: {
        name: "ECAL Endcap (-)",
        color: "#000000",
        enabled: false,
        path: "/models/ECAL_Endcap_neg.glb"
    },
    ecalEndcapPos: {
        name: "ECAL Endcap (+)",
        color: "#000000",
        enabled: false,
        path: "/models/ECAL_Endcap_pos.glb"
    },
    hcalBarrel: {
        name: "HCAL Barrel",
        color: "#000000",
        enabled: false,
        path: "/models/HCAL_Barrel.glb"
    },
    hcalEndcapNeg: {
        name: "HCAL Endcap (-)",
        color: "#000000",
        enabled: false,
        path: "/models/HCAL_Endcap_neg.glb"
    },
    hcalEndcapPos: {
        name: "HCAL Endcap (+)",
        color: "#000000",
        enabled: false,
        path: "/models/HCAL_Endcap_pos.glb"
    },
    hcalFordwardNeg: {
        name: "HCAL Forward (-)",
        color: "#000000",
        enabled: false,
        path: "/models/HCAL_Forward_neg.glb"
    },
    hcalFordwardPos: {
        name: "HCAL Forward (+)",
        color: "#000000",
        enabled: false,
        path: "/models/HCAL_Forward_pos.glb"
    },
    hcalOuter: {
        name: "HCAL Outer",
        color: "#000000",
        enabled: false,
        path: "/models/HCAL_Outer.glb"
    },
    pixelBarrel: {
        name: "Pixel Barrel",
        color: "#000000",
        enabled: false,
        path: "/models/Pixel_Barrel.glb"
    },
    pixelEndcapNeg: {
        name: "Pixel Endcap (-)",
        color: "#000000",
        enabled: false,
        path: "/models/Pixel_Endcap_neg.glb"
    },
    pixelEndcapPos: {
        name: "Pixel Endcap (+)",
        color: "#000000",
        enabled: false,
        path: "/models/Pixel_Endcap_pos.glb"
    },
    steelYoke: {
        name: "Steel Yoke",
        color: "#000000",
        enabled: false,
        path: "/models/Steel_Yoke.glb"
    },
    support: {
        name: "Support",
        color: "#000000",
        enabled: false,
        path: "/models/Support.glb"
    },
    trackerEndcapNeg: {
        name: "Tracker Endcap (-)",
        color: "#000000",
        enabled: false,
        path: "/models/Tracker_Endcap_neg.glb"
    },
    trackerEndcapPos: {
        name: "Tracker Endcap (+)",
        color: "#000000",
        enabled: false,
        path: "/models/Tracker_Endcap_pos.glb"
    },
    trackerInnerBarrelNeg: {
        name: "Tracker Inner Barrel (-)",
        color: "#000000",
        enabled: false,
        path: "/models/Tracker_Inner_Barrel_neg.glb"
    },
    trackerInnerBarrelPos: {
        name: "Tracker Inner Barrel (+)",
        color: "#000000",
        enabled: false,
        path: "/models/Tracker_Inner_Barrel_pos.glb"
    },
    trackerInnerBarrel: {
        name: "Tracker Inner Barrel",
        color: "#000000",
        enabled: false,
        path: "/models/Tracker_Inner_Barrel.glb"
    },
    trackerOuterBarrel: {
        name: "Tracker Outer Barrel",
        color: "#000000",
        enabled: false,
        path: "/models/Tracker_Outer_Barrel.glb"
    },
}

export { defaultColliderParts }
export type { ColliderPart, ColliderParts }