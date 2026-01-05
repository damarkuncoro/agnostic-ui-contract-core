// src/resolver/resolve-pipeline.ts

import type { UiTokenValue } from "../tokens/core"
import type { UiResolveMode } from "./types"
import { resolveRef } from "./resolve-ref"
import { resolveMath } from "./resolve-math"
import { resolveResponsive } from "./resolve-responsive"

export type ResolverStep = {
  name: string
  priority: number // Higher priority = executed first
  canHandle: (value: UiTokenValue) => boolean
  resolve: (value: UiTokenValue, context: ResolverContext) => unknown
}

export interface ResolverContext {
  mode: UiResolveMode
  lookup: (ref: string) => unknown
  pipeline: ResolverPipeline
  breakpoint?: string
}

export class ResolverPipeline {
  private steps: ResolverStep[] = []

  constructor() {
    this.initializeDefaultSteps()
  }

  private initializeDefaultSteps() {
    // Reference resolution step (highest priority)
    this.addStep({
      name: "ref",
      priority: 100,
      canHandle: (value) => typeof value === "object" && value !== null && "$ref" in value,
      resolve: (value, context) => resolveRef(value, context.lookup)
    })

    // Math expression step (high priority)
    this.addStep({
      name: "math",
      priority: 50,
      canHandle: (value) => typeof value === "object" && value !== null && "$math" in value,
      resolve: (value, context) => resolveMath(value, context.lookup)
    })

    // Responsive values step (medium priority)
    this.addStep({
      name: "responsive",
      priority: 25,
      canHandle: (value) => typeof value === "object" && value !== null && "$responsive" in value,
      resolve: (value, context) => resolveResponsive(value, context.mode, context.breakpoint)
    })

    // Fallback for primitive values (lowest priority, always runs)
    this.addStep({
      name: "primitive",
      priority: 0,
      canHandle: () => true,
      resolve: (value, context) => resolveResponsive(value, context.mode, context.breakpoint)
    })
  }

  addStep(step: ResolverStep) {
    // Remove existing step with same name if it exists
    this.steps = this.steps.filter(s => s.name !== step.name)
    this.steps.push(step)
    this.sortSteps()
    return this
  }

  removeStep(name: string) {
    this.steps = this.steps.filter(step => step.name !== name)
    return this
  }

  private sortSteps() {
    this.steps.sort((a, b) => b.priority - a.priority)
  }

  resolve(value: UiTokenValue, mode: UiResolveMode, lookup: (ref: string) => unknown, breakpoint?: string): unknown {
    const context: ResolverContext = {
      mode,
      lookup,
      pipeline: this,
      breakpoint
    }

    for (const step of this.steps) {
      if (step.canHandle(value)) {
        return step.resolve(value, context)
      }
    }

    return value
  }

  getSteps(): readonly ResolverStep[] {
    return [...this.steps]
  }

  getStep(name: string): ResolverStep | undefined {
    return this.steps.find(step => step.name === name)
  }
}

export namespace Resolver {
  export const pipeline = new ResolverPipeline()

  export function resolve(
    value: UiTokenValue,
    mode: UiResolveMode,
    lookup: (ref: string) => unknown,
    breakpoint?: string
  ): unknown {
    return pipeline.resolve(value, mode, lookup, breakpoint)
  }

  export const ref = resolveRef
  export const math = resolveMath
  export const responsive = resolveResponsive
}

export function resolvePipeline(
  value: UiTokenValue,
  mode: UiResolveMode,
  lookup: (ref: string) => unknown,
  breakpoint?: string
): unknown {
  return Resolver.resolve(value, mode, lookup, breakpoint)
}