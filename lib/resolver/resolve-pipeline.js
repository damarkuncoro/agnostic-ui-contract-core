"use strict";
// src/resolver/resolve-pipeline.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resolver = exports.ResolverPipeline = void 0;
exports.resolvePipeline = resolvePipeline;
const resolve_ref_1 = require("./resolve-ref");
const resolve_math_1 = require("./resolve-math");
const resolve_responsive_1 = require("./resolve-responsive");
class ResolverPipeline {
    constructor() {
        this.steps = [];
        this.initializeDefaultSteps();
    }
    initializeDefaultSteps() {
        // Reference resolution step (highest priority)
        this.addStep({
            name: "ref",
            priority: 100,
            canHandle: (value) => typeof value === "object" && value !== null && "$ref" in value,
            resolve: (value, context) => (0, resolve_ref_1.resolveRef)(value, context.lookup)
        });
        // Math expression step (high priority)
        this.addStep({
            name: "math",
            priority: 50,
            canHandle: (value) => typeof value === "object" && value !== null && "$math" in value,
            resolve: (value, context) => (0, resolve_math_1.resolveMath)(value, context.lookup)
        });
        // Responsive values step (medium priority)
        this.addStep({
            name: "responsive",
            priority: 25,
            canHandle: (value) => typeof value === "object" && value !== null && "$responsive" in value,
            resolve: (value, context) => (0, resolve_responsive_1.resolveResponsive)(value, context.mode, context.breakpoint)
        });
        // Fallback for primitive values (lowest priority, always runs)
        this.addStep({
            name: "primitive",
            priority: 0,
            canHandle: () => true,
            resolve: (value, context) => (0, resolve_responsive_1.resolveResponsive)(value, context.mode, context.breakpoint)
        });
    }
    addStep(step) {
        // Remove existing step with same name if it exists
        this.steps = this.steps.filter(s => s.name !== step.name);
        this.steps.push(step);
        this.sortSteps();
        return this;
    }
    removeStep(name) {
        this.steps = this.steps.filter(step => step.name !== name);
        return this;
    }
    sortSteps() {
        this.steps.sort((a, b) => b.priority - a.priority);
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
    getStep(name) {
        return this.steps.find(step => step.name === name);
    }
}
exports.ResolverPipeline = ResolverPipeline;
var Resolver;
(function (Resolver) {
    Resolver.pipeline = new ResolverPipeline();
    function resolve(value, mode, lookup, breakpoint) {
        return Resolver.pipeline.resolve(value, mode, lookup, breakpoint);
    }
    Resolver.resolve = resolve;
    Resolver.ref = resolve_ref_1.resolveRef;
    Resolver.math = resolve_math_1.resolveMath;
    Resolver.responsive = resolve_responsive_1.resolveResponsive;
})(Resolver || (exports.Resolver = Resolver = {}));
function resolvePipeline(value, mode, lookup, breakpoint) {
    return Resolver.resolve(value, mode, lookup, breakpoint);
}
