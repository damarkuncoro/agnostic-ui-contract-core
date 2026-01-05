// src/resolver/resolve-pipeline.ts
import { resolveRef } from "./resolve-ref";
import { resolveMath } from "./resolve-math";
import { resolveResponsive } from "./resolve-responsive";
export class ResolverPipeline {
    constructor() {
        this.steps = [];
        this.initializeDefaultSteps();
    }
    initializeDefaultSteps() {
        // Reference resolution step
        this.addStep({
            name: "ref",
            canHandle: (value) => typeof value === "object" && value !== null && "$ref" in value,
            resolve: (value, context) => resolveRef(value, context.lookup)
        });
        // Math expression step
        this.addStep({
            name: "math",
            canHandle: (value) => typeof value === "object" && value !== null && "$math" in value,
            resolve: (value, context) => resolveMath(value, context.lookup)
        });
        // Responsive values step
        this.addStep({
            name: "responsive",
            canHandle: (value) => typeof value === "object" && value !== null && "$responsive" in value,
            resolve: (value, context) => resolveResponsive(value, context.mode, context.breakpoint)
        });
        // Fallback for primitive values (always runs last)
        this.addStep({
            name: "primitive",
            canHandle: () => true,
            resolve: (value, context) => resolveResponsive(value, context.mode)
        });
    }
    addStep(step) {
        this.steps.push(step);
        return this;
    }
    removeStep(name) {
        this.steps = this.steps.filter(step => step.name !== name);
        return this;
    }
    resolve(value, mode, lookup, breakpoint) {
        const context = {
            mode,
            lookup,
            pipeline: this,
            breakpoint
        };
        for (const step of this.steps) {
            if (step.canHandle(value)) {
                return step.resolve(value, context);
            }
        }
        return value;
    }
    getSteps() {
        return [...this.steps];
    }
}
export var Resolver;
(function (Resolver) {
    Resolver.pipeline = new ResolverPipeline();
    function resolve(value, mode, lookup, breakpoint) {
        return Resolver.pipeline.resolve(value, mode, lookup, breakpoint);
    }
    Resolver.resolve = resolve;
    Resolver.ref = resolveRef;
    Resolver.math = resolveMath;
    Resolver.responsive = resolveResponsive;
})(Resolver || (Resolver = {}));
export function resolvePipeline(value, mode, lookup, breakpoint) {
    return Resolver.resolve(value, mode, lookup, breakpoint);
}
//# sourceMappingURL=resolve-pipeline.js.map