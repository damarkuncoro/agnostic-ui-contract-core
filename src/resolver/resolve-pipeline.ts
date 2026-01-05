// src/resolver/resolve-pipeline.ts

import type { UiTokenValue } from "../tokens/core"
import type { UiResolveMode } from "./types"
import { resolveRef } from "./resolve-ref"
import { resolveMath } from "./resolve-math"
import { resolveResponsive } from "./resolve-responsive"

export type ResolverStep = {
  name: string
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
    // Reference resolution step
    this.addStep({
      name: "ref",
      canHandle: (value) => typeof value === "object" && value !== null && "$ref" in value,
      resolve: (value, context) => resolveRef(value, context.lookup)
    })

    // Math expression step
    this.addStep({
      name: "math",
      canHandle: (value) => typeof value === "object" && value !== null && "$math" in value,
      resolve: (value, context) => resolveMath(value, context.lookup)
    })

    // Responsive values step
    this.addStep({
      name: "responsive",
      canHandle: (value) => typeof value === "object" && value !== null && "$responsive" in value,
      resolve: (value, context) => resolveResponsive(value, context.mode, context.breakpoint)
    })

    // Fallback for primitive values (always runs last)
    this.addStep({
      name: "primitive",
      canHandle: () => true,
      resolve: (value, context) => resolveResponsive(value, context.mode)
    })
  }

  addStep(step: ResolverStep) {
    this.steps.push(step)
    return this
  }

  removeStep(name: string) {
    this.steps = this.steps.filter(step => step.name !== name)
    return this
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