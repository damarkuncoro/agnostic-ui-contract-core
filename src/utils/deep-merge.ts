// src/utils/deep-merge.ts

import { isObject } from "./is-object"

type PlainObject = Record<string, unknown>

export function deepMerge<T extends PlainObject>(
  target: T,
  source: Partial<T>
): T {
  const result: PlainObject = { ...target }

  for (const key in source) {
    const srcValue = source[key]
    const tgtValue = target[key]

    if (isObject(srcValue) && isObject(tgtValue)) {
      result[key] = deepMerge(
        tgtValue as PlainObject,
        srcValue as PlainObject
      )
    } else if (srcValue !== undefined) {
      result[key] = srcValue
    }
  }

  return result as T
}
