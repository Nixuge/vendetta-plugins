import { Override } from "../types";


// Note: for some UNKNOWN REASON, SETTING THE REGEXPATTERN DOES. NOT. WORK.
// it does NOT make sense
// it's probably related to storing it which javascript CANNOT HANDLE (2024)

// Returns true if valid (even if regex disabled), false otherwise
export function validateRegex(item: Override): boolean {
    if (!item.useRegex) {
        // item.regexPattern = undefined;
        return true;
    }
    
    try {
        // item.regexPattern = new RegExp(item.from);
        return true;
    } catch(e) {
        // item.regexPattern = undefined;
        return false;
    }
}