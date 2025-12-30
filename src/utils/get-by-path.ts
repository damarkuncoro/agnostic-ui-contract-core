// src/utils/get-by-path.ts

export function getByPath(
  obj: unknown,
  path: string
): unknown {
  if (!path) return undefined

  return path.split(".").reduce(
    (acc: any, key) => (acc ? acc[key] : undefined),
    obj
  )
}
