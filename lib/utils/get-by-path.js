// src/utils/get-by-path.ts
export function getByPath(obj, path) {
    if (!path)
        return undefined;
    return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}
//# sourceMappingURL=get-by-path.js.map