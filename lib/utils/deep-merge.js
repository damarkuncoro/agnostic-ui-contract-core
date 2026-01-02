// src/utils/deep-merge.ts
import { isObject } from "./is-object";
export function deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
        const srcValue = source[key];
        const tgtValue = target[key];
        if (isObject(srcValue) && isObject(tgtValue)) {
            result[key] = deepMerge(tgtValue, srcValue);
        }
        else if (srcValue !== undefined) {
            result[key] = srcValue;
        }
    }
    return result;
}
//# sourceMappingURL=deep-merge.js.map