// src/resolver/resolve-math.ts

import type { UiTokenValue } from "../tokens/core"
import { MathEvaluationError } from "./types"

export function resolveMath(
  value: UiTokenValue,
  lookup: (ref: string) => unknown
): unknown {
  if (
    typeof value === "object" &&
    value !== null &&
    "$math" in value
  ) {
    const expression = value.$math

    // Input validation - only allow safe characters
    if (!isValidMathExpression(expression)) {
      console.warn(`Invalid math expression: ${expression}`)
      return value
    }

    try {
      const result = evaluateMathExpression(expression, lookup)
      return result
    } catch (error) {
      throw new MathEvaluationError(expression, error)
    }
  }

  return value
}

/**
 * Validates that a math expression contains only safe characters
 */
function isValidMathExpression(expression: string): boolean {
  // Only allow: numbers, decimal points, basic operators, parentheses, whitespace, and word characters (for references)
  const safePattern = /^[\d\s\w.+\-*/()]*$/
  return safePattern.test(expression) && !hasUnsafePatterns(expression)
}

/**
 * Checks for potentially unsafe patterns in math expressions
 */
function hasUnsafePatterns(expression: string): boolean {
  const unsafePatterns = [
    /\b(eval|Function|constructor|prototype|__proto__|this|window|global|process|require|import|export)\b/i,
    /[[\]]/,  // Array access
    /\.\w+.*\(/,  // Method calls
    /\/\*.*/,  // Comments (could hide malicious code)
    /\/\/.*/,  // Line comments
    /;|\{|\}/,  // Statement separators, object literals
  ]

  return unsafePatterns.some(pattern => pattern.test(expression))
}

/**
 * Secure math expression evaluator with proper tokenization
 */
function evaluateMathExpression(expression: string, lookup: (ref: string) => unknown): number {
  // Tokenize the expression safely
  const tokens = tokenizeExpression(expression)

  let index = 0

  function parseExpression(): number {
    let result = parseTerm()

    while (index < tokens.length) {
      const token = tokens[index]
      if (token.type === 'operator' && (token.value === '+' || token.value === '-')) {
        index++
        const term = parseTerm()
        result = token.value === '+' ? result + term : result - term
      } else {
        break
      }
    }

    return result
  }

  function parseTerm(): number {
    let result = parseFactor()

    while (index < tokens.length) {
      const token = tokens[index]
      if (token.type === 'operator' && (token.value === '*' || token.value === '/')) {
        index++
        const factor = parseFactor()
        if (token.value === '*') {
          result *= factor
        } else {
          if (factor === 0) throw new Error('Division by zero')
          result /= factor
        }
      } else {
        break
      }
    }

    return result
  }

  function parseFactor(): number {
    const token = tokens[index++]

    if (token.type === 'number') {
      return token.value as number
    }

    if (token.type === 'identifier') {
      const resolved = lookup(token.value as string)
      if (typeof resolved === 'number') {
        return resolved
      }
      throw new Error(`Cannot resolve reference: ${token.value}`)
    }

    if (token.type === 'operator' && token.value === '(') {
      const result = parseExpression()
      if (index < tokens.length && tokens[index].type === 'operator' && tokens[index].value === ')') {
        index++
        return result
      }
      throw new Error('Mismatched parentheses')
    }

    throw new Error(`Unexpected token: ${token.value}`)
  }

  const result = parseExpression()

  if (index < tokens.length) {
    throw new Error('Unexpected tokens at end of expression')
  }

  return result
}

/**
 * Safely tokenizes a math expression into tokens
 */
function tokenizeExpression(expression: string): Array<{ type: 'number' | 'identifier' | 'operator', value: string | number }> {
  const tokens: Array<{ type: 'number' | 'identifier' | 'operator', value: string | number }> = []
  let i = 0

  while (i < expression.length) {
    const char = expression[i]

    // Skip whitespace
    if (/\s/.test(char)) {
      i++
      continue
    }

    // Numbers (including decimals)
    if (/\d/.test(char)) {
      let numStr = ''
      while (i < expression.length && /[\d.]/.test(expression[i])) {
        numStr += expression[i++]
      }
      const num = parseFloat(numStr)
      if (isNaN(num)) {
        throw new Error(`Invalid number: ${numStr}`)
      }
      tokens.push({ type: 'number', value: num })
      continue
    }

    // Identifiers (references)
    if (/[a-zA-Z_]/.test(char)) {
      let ident = ''
      while (i < expression.length && /[a-zA-Z0-9_.]/.test(expression[i])) {
        ident += expression[i++]
      }
      tokens.push({ type: 'identifier', value: ident })
      continue
    }

    // Operators and parentheses
    if (/[+\-*/()]/.test(char)) {
      tokens.push({ type: 'operator', value: char })
      i++
      continue
    }

    throw new Error(`Unexpected character: ${char}`)
  }

  return tokens
}
