// src/a11y/role.ts

export type UiA11yRole =
  | "button"
  | "link"
  | "checkbox"
  | "radio"
  | "switch"
  | "textbox"
  | "listbox"
  | "option"
  | "menu"
  | "menuitem"
  | "dialog"
  | "alert"
  | "status"
  | "region"

export const uiA11yRoles: UiA11yRole[] = [
  "button",
  "link",
  "checkbox",
  "radio",
  "switch",
  "textbox",
  "listbox",
  "option",
  "menu",
  "menuitem",
  "dialog",
  "alert",
  "status",
  "region"
]

export interface UiA11yRoleIntent {
  role: UiA11yRole
}
