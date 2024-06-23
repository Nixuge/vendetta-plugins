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

    const overrides = getOverridesArray();
    for (const override of overrides) {
        // Try replacing smth in the url
        if (override.useRegex)
            url = url.replaceAll(override.regexPattern, override.to)
        else
            url = url.replaceAll(override.from, override.to) // TODO: TEST REGEX IF WEIRD OR NAH
        
        // If smth did get replaced check if bypassInApp & open it
        if (url != originalUrl) {
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

