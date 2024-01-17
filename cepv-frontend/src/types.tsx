import React from 'react'


interface TypeTracksV3 {
    pos: number[];
    dir: number[];
    pt: number;
    phi: number;
    eta: number;
    charge: number;
    chi2: number;
    ndof: number;
}

interface LhcEvent {
    event: {
        Associations: {
            CaloClusterRecHitFractions_V1: [];
            GsfElectronExtras_V1: [];
            MuonGlobalPoints_V1: [];
            MuonTrackExtras_V1: [];
            MuonTrackerExtras_V1: [];
            MuonTrackerPoints_V1: [];
            TrackExtras_V1: [];
        };
        Collections: {
            BeamSpot_V1: [];
            CaloClusters_V1: [];
            CaloMETs_V1: [];
            EBRecHits_V2: [];
            EERecHits_V2: [];
            ESRecHits_V2: [];
            Errors_V1: [];
            Event_V2: [];
            Extras_V1: [];
            GlobalMuons_V1: [];
            GsfElectrons_V2: [];
            HBRecHits_V2: [];
            HERecHits_V2: [];
            HFRecHits_V2: [];
            HORecHits_V2: [];
            Jets_V1: [];
            METs_V1: [];
            MuonChambers_V1: [];
            Photons_V1: [];
            Points_V1: [];
            Products_V1: [];
            RecHitFractions_V1: [];
            StandaloneMuons_V2: [];
            TrackerMuons_V1: [];
            TrackerMuons_V2: [];
            Tracks_V3: [];
            TriggerObjects_V1: [];
            TriggerPaths_V1: [];
            Vertices_V1: [];
        };
        Types: {
            BeamSpot_V1: [];
            CaloClusters_V1: [];
            CaloMETs_V1: [];
            EBRecHits_V2: [];
            EERecHits_V2: [];
            ESRecHits_V2: [];
            Errors_V1: [];
            Event_V2: [];
            Extras_V1: [];
            GlobalMuons_V1: [];
            GsfElectrons_V2: [];
            HBRecHits_V2: [];
            HERecHits_V2: [];
            HFRecHits_V2: [];
            HORecHits_V2: [];
            Jets_V1: [];
            METs_V1: [];
            MuonChambers_V1: [];
            Photons_V1: [];
            Points_V1: [];
            Products_V1: [];
            RecHitFractions_V1: [];
            StandaloneMuons_V2: [];
            TrackerMuons_V1: [];
            TrackerMuons_V2: [];
            Tracks_V3: [];
            TriggerObjects_V1: [];
            TriggerPaths_V1: [];
            Vertices_V1: [];
        };
    }
}

export type { LhcEvent, TypeTracksV3 }