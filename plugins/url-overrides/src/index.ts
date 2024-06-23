import Settings from "./settings/components/Settings";
import { instead } from "@vendetta/patcher";
import { url as urlFunc } from "@vendetta/metro/common";
import { getOverridesArray } from "./settings/settings";

import { ReactNative } from "@vendetta/metro/common";

const { Linking } = ReactNative

export const settings = Settings;
export const onLoad = () => console.log("URL Overrides loaded.");
export const onUnload = () => {
    console.log("URL Overrides unloaded.");
    unpatch();
};

const unpatch = instead("openURL", urlFunc, (args, originalFunction) => {
    let originalUrl: string;
    try {
        originalUrl = args[0]
    } catch(e) { return }    

    let url = originalUrl;

    let changed = false;
    const overrides = getOverridesArray();
    for (const override of overrides) {
        // Try replacing smth in the url
        if (override.useRegex) {            
            try {
                const re = new RegExp(override.from.trim(), "g");
                let match: undefined | any[] = originalUrl.matchAll(re).next().value;
                if (match == undefined) {
                    changed = false;
                } else {
                    changed = true;
                    url = override.to;
                    match.slice(1).forEach((replacement, i) => {
                        url = url.replaceAll(`$${i+1}`, replacement)                        
                    });
                }
            } catch(e) {
                console.log(e);
            }
        } else {
            if (url.includes(override.from)) {
                changed = true;
                url.replaceAll(override.from, override.to)
            }
        }
        
        // If smth did get replaced check if bypassInApp & open it
        if (changed) {
            if (override.bypassInApp) {
                console.debug("Override found - skipping in-app browser while opening URL");
                Linking.openURL(url)
            } else {
                console.debug("Override found - Opening URL normally");
                originalFunction(url, args[1], args[2]);
            }
            return;
        }        
    };
    console.debug("Opening URL normally");
    // Otherwise if nothing found open original
    originalFunction(originalUrl, args[1], args[2]);
})

