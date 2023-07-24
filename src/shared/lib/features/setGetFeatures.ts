import {FeatureFlags} from "@/shared/types/featureFlags";

let featureFlags: FeatureFlags;

export function setFeatureFlags(newFeature?: FeatureFlags) {
    if (newFeature) {
        featureFlags = newFeature;
    }
}


export function getFeatureFlag(flag: keyof FeatureFlags) {
    return featureFlags[flag];
}
