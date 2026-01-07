"use strict";
// src/resolver/resolve-responsive.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveResponsive = resolveResponsive;
function resolveResponsive(value, mode, breakpoint) {
    if (!isValidResponsiveValue(value)) {
        return value;
    }
    const responsive = value.$responsive;
    if (mode === "static") {
        // For static mode, pick the largest breakpoint (semantically ordered)
        const sortedBreakpoints = getSortedBreakpoints(Object.keys(responsive));
        const largestBreakpoint = sortedBreakpoints[sortedBreakpoints.length - 1];
        return responsive[largestBreakpoint];
    }
    if (mode === "runtime" && breakpoint) {
        // For runtime mode with breakpoint, resolve to current breakpoint value
        if (breakpoint in responsive) {
            return responsive[breakpoint];
        }
        // Fallback: find the closest smaller breakpoint (semantically ordered)
        const sortedBreakpoints = getSortedBreakpoints(Object.keys(responsive));
        const breakpointIndex = getBreakpointIndex(sortedBreakpoints, breakpoint);
        // Find the largest breakpoint that is smaller than or equal to current
        for (let i = breakpointIndex; i >= 0; i--) {
            const bp = sortedBreakpoints[i];
            if (bp in responsive) {
                return responsive[bp];
            }
        }
        // Ultimate fallback: smallest available breakpoint
        const smallestBreakpoint = sortedBreakpoints[0];
        return responsive[smallestBreakpoint];
    }
    return value;
}
/**
 * Validates that a value is a proper responsive token
 */
function isValidResponsiveValue(value) {
    return (typeof value === "object" &&
        value !== null &&
        "$responsive" in value &&
        typeof value.$responsive === "object" &&
        value.$responsive !== null);
}
/**
 * Returns breakpoints sorted by semantic size (not alphabetically)
 * Common breakpoint order: xs, sm, md, lg, xl, 2xl, etc.
 */
function getSortedBreakpoints(breakpoints) {
    const semanticOrder = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
    return breakpoints.sort((a, b) => {
        const indexA = semanticOrder.indexOf(a);
        const indexB = semanticOrder.indexOf(b);
        // If both are in semantic order, use that
        if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
        }
        // If one is in semantic order, prioritize it
        if (indexA !== -1)
            return -1;
        if (indexB !== -1)
            return 1;
        // Fallback to alphabetical for custom breakpoints
        return a.localeCompare(b);
    });
}
/**
 * Gets the index where a breakpoint would be inserted in sorted order
 * This helps find the closest smaller breakpoint
 */
function getBreakpointIndex(sortedBreakpoints, targetBreakpoint) {
    const semanticOrder = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
    const targetIndex = semanticOrder.indexOf(targetBreakpoint);
    if (targetIndex === -1) {
        // Custom breakpoint, find insertion point
        for (let i = 0; i < sortedBreakpoints.length; i++) {
            if (sortedBreakpoints[i] > targetBreakpoint) {
                return i - 1;
            }
        }
        return sortedBreakpoints.length - 1;
    }
    // Find the rightmost breakpoint that is <= target
    for (let i = sortedBreakpoints.length - 1; i >= 0; i--) {
        const bp = sortedBreakpoints[i];
        const bpIndex = semanticOrder.indexOf(bp);
        if (bpIndex !== -1 && bpIndex <= targetIndex) {
            return i;
        }
    }
    return -1; // No smaller breakpoint found
}
