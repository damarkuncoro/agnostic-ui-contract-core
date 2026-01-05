import type { UiTokenValue } from "../tokens/core";
import type { UiResolveMode } from "./types";
import { resolveRef } from "./resolve-ref";
import { resolveMath } from "./resolve-math";
import { resolveResponsive } from "./resolve-responsive";
export type ResolverStep = {
    name: string;
    canHandle: (value: UiTokenValue) => boolean;
    resolve: (value: UiTokenValue, context: ResolverContext) => unknown;
};
export interface ResolverContext {
    mode: UiResolveMode;
    lookup: (ref: string) => unknown;
    pipeline: ResolverPipeline;
    breakpoint?: string;
}
export declare class ResolverPipeline {
    private steps;
    constructor();
    private initializeDefaultSteps;
    addStep(step: ResolverStep): this;
    removeStep(name: string): this;
    resolve(value: UiTokenValue, mode: UiResolveMode, lookup: (ref: string) => unknown, breakpoint?: string): unknown;
    getSteps(): readonly ResolverStep[];
}
export declare namespace Resolver {
    const pipeline: ResolverPipeline;
    function resolve(value: UiTokenValue, mode: UiResolveMode, lookup: (ref: string) => unknown, breakpoint?: string): unknown;
    const ref: typeof resolveRef;
    const math: typeof resolveMath;
    const responsive: typeof resolveResponsive;
}
export declare function resolvePipeline(value: UiTokenValue, mode: UiResolveMode, lookup: (ref: string) => unknown, breakpoint?: string): unknown;
//# sourceMappingURL=resolve-pipeline.d.ts.map