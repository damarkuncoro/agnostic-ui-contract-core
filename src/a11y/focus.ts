// src/a11y/focus.ts

export interface UiA11yFocusIntent {
  /** Component can receive focus */
  focusable?: boolean

  /** Focus is managed programmatically */
  managed?: boolean

  /** Trap focus (dialog, modal) */
  trap?: boolean

  /** Auto focus on mount */
  auto?: boolean
}
