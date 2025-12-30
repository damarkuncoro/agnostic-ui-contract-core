// src/resolver/types.ts

export type UiResolveMode = "static" | "runtime"

export interface UiResolveOptions {
  /** static = build/SSR, runtime = responsive/user-pref */
  mode?: UiResolveMode
}

export type UiResolvedTokens<T> = {
  [K in keyof T]: T[K] extends object
    ? UiResolvedTokens<T[K]>
    : T[K]
}
