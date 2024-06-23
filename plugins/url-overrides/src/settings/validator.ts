import { Override } from "../types";


// Returns true if valid (even if regex disabled), false otherwise
export function validateRegex(item: Override): boolean {
    if (!item.useRegex) {
        item.regexPattern = undefined;
        return true;
    }
    
    try {
        item.regexPattern = new RegExp(item.from);
        return true;
    } catch(e) {
        item.regexPattern = undefined;
        return false;
    }
}