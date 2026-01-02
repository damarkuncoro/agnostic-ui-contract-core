// src/a11y/keyboard.ts

export type UiA11yKeyboardAction =
  | "activate"
  | "confirm"
  | "cancel"
  | "navigate-next"
  | "navigate-prev"
  | "increment"
  | "decrement"

export const uiA11yKeyboardActions: UiA11yKeyboardAction[] = [
  "activate",
  "confirm",
  "cancel",
  "navigate-next",
  "navigate-prev",
  "increment",
  "decrement"
]

export interface UiA11yKeyboardIntent {
  actions?: UiA11yKeyboardAction[]
}
