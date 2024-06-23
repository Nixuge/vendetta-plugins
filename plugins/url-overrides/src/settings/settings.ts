import { storage } from "@vendetta/plugin";
import { Override } from "../types";

let overrideArray: Override[] = storage.overrideArray || [];
let listeners = [];

const notifyListeners = () => {
    listeners.forEach((listener) => listener([...overrideArray])); // Ensure a new array reference
    
    // Save to storage whenever overrideArray changes
    storage.overrideArray = overrideArray;
};

export function addOverride() {
    const newOverride = {
        index: overrideArray.length,
        from: '',
        to: '',
        bypassInApp: false,
        useRegex: false
    } satisfies Override;

    overrideArray.push(newOverride);    
    notifyListeners();
};

function recalculateAllIndexes() {
    for (let i = 0; i < overrideArray.length; i++) {
        overrideArray[i].index = i;
    }
}

export function removeOverride(override: Override) {
    const index = override.index;
    if (index > -1) {
        overrideArray = [...overrideArray.slice(0, index), ...overrideArray.slice(index + 1)];
        if (index != overrideArray.length) // if not last index
            recalculateAllIndexes()
        
        notifyListeners();
    }    
}

export const getOverridesArray = () => [...overrideArray]; // Return a new array reference

export function subscribeArrayList(listener) {
    listeners.push(listener);
    return () => {
        listeners = listeners.filter((l) => l !== listener);
    };
}

