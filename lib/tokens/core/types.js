"use strict";
// tokens/core/types.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUiTokenValue = isUiTokenValue;
exports.isUiTokenRef = isUiTokenRef;
exports.isUiTokenMath = isUiTokenMath;
exports.isUiTokenResponsive = isUiTokenResponsive;
/**
 * Type guard to check if a value is a valid token
 */
function isUiTokenValue(value) {
    if (value === null || typeof value !== "object") {
        return typeof value === "string" || typeof value === "number";
    }
    const obj = value;
    // Check for single intent markers
    const intentKeys = Object.keys(obj);
    if (intentKeys.length === 1) {
        const key = intentKeys[0];
        if (key === "$ref" && typeof obj[key] === "string")
            return true;
        if (key === "$math" && typeof obj[key] === "string")
            return true;
        if (key === "$responsive" && typeof obj[key] === "object" && obj[key] !== null)
            return true;
    }
    return false;
}
/**
 * Type guard for token references
 */
function isUiTokenRef(value) {
    return typeof value === "object" && value !== null &&
        "$ref" in value && typeof value.$ref === "string";
}
/**
 * Type guard for math expressions
 */
function isUiTokenMath(value) {
    return typeof value === "object" && value !== null &&
        "$math" in value && typeof value.$math === "string";
}
/**
 * Type guard for responsive tokens
 */
function isUiTokenResponsive(value) {
    return typeof value === "object" && value !== null &&
        "$responsive" in value && typeof value.$responsive === "object";
}
