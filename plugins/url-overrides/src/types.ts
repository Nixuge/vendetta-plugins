export interface Override {
    index: number,
    from: string,
    to: string,
    bypassInApp: boolean,
    useRegex: boolean,
    regexPattern?: RegExp
}
