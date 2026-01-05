"use strict";
// src/resolver/resolve-math.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveMath = resolveMath;
const types_1 = require("./types");
function resolveMath(value, lookup) {
    if (typeof value === "object" &&
        value !== null &&
        "$math" in value) {
        const expression = value.$math;
        // Input validation - only allow safe characters
        if (!isValidMathExpression(expression)) {
            console.warn(`Invalid math expression: ${expression}`);
            return value;
        }
        try {
            const result = evaluateMathExpression(expression, lookup);
            return result;
        }
        catch (error) {
            throw new types_1.MathEvaluationError(expression, error);
        }
    }
    return value;
}
/**
 * Validates that a math expression contains only safe characters
 */
function isValidMathExpression(expression) {
    // Only allow: numbers, decimal points, basic operators, parentheses, whitespace, and word characters (for references)
    const safePattern = /^[\d\s\w.+\-*/()]*$/;
    return safePattern.test(expression) && !hasUnsafePatterns(expression);
}
/**
 * Checks for potentially unsafe patterns in math expressions
 */
function hasUnsafePatterns(expression) {
    const unsafePatterns = [
        /\b(eval|Function|constructor|prototype|__proto__|this|window|global|process|require|import|export)\b/i,
        /[[\]]/, // Array access
        /\.\w+.*\(/, // Method calls
        /\/\*.*/, // Comments (could hide malicious code)
        /\/\/.*/, // Line comments
        /;|\{|\}/, // Statement separators, object literals
    ];
    return unsafePatterns.some(pattern => pattern.test(expression));
}
/**
 * Simplified math expression evaluator optimized for common cases
 */
function evaluateMathExpression(expression, lookup) {
    // Fast path for simple expressions (most common case)
    const simpleResult = trySimpleEvaluation(expression, lookup);
    if (simpleResult !== null) {
        return simpleResult;
    }
    // Fallback to full tokenization for complex expressions
    return evaluateComplexExpression(expression, lookup);
}
/**
 * Fast evaluation for simple expressions like "value * 2" or "ref + 10"
 */
function trySimpleEvaluation(expression, lookup) {
    const trimmed = expression.trim();
    // Handle multiplication: "ref * number" or "number * ref"
    const multMatch = trimmed.match(/^(\w+(?:\.\w+)*|\d+(?:\.\d+)?)\s*\*\s*(\w+(?:\.\w+)*|\d+(?:\.\d+)?)$/);
    if (multMatch) {
        const [, left, right] = multMatch;
        const leftVal = resolveValue(left, lookup);
        const rightVal = resolveValue(right, lookup);
        return leftVal * rightVal;
    }
    // Handle addition: "ref + number" or "number + ref"
    const addMatch = trimmed.match(/^(\w+(?:\.\w+)*|\d+(?:\.\d+)?)\s*\+\s*(\w+(?:\.\w+)*|\d+(?:\.\d+)?)$/);
    if (addMatch) {
        const [, left, right] = addMatch;
        const leftVal = resolveValue(left, lookup);
        const rightVal = resolveValue(right, lookup);
        return leftVal + rightVal;
    }
    // Handle subtraction: "ref - number"
    const subMatch = trimmed.match(/^(\w+(?:\.\w+)*|\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)$/);
    if (subMatch) {
        const [, left, right] = subMatch;
        const leftVal = resolveValue(left, lookup);
        const rightVal = parseFloat(right);
        return leftVal - rightVal;
    }
    // Handle division: "ref / number"
    const divMatch = trimmed.match(/^(\w+(?:\.\w+)*|\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/);
    if (divMatch) {
        const [, left, right] = divMatch;
        const leftVal = resolveValue(left, lookup);
        const rightVal = parseFloat(right);
        if (rightVal === 0)
            throw new Error('Division by zero');
        return leftVal / rightVal;
    }
    return null; // Not a simple expression
}
/**
 * Resolve a value that could be a number literal or reference
 */
function resolveValue(value, lookup) {
    // Try parsing as number first
    const num = parseFloat(value);
    if (!isNaN(num)) {
        return num;
    }
    // Otherwise treat as reference
    const resolved = lookup(value);
    if (typeof resolved === 'number') {
        return resolved;
    }
    throw new Error(`Cannot resolve value: ${value}`);
}
/**
 * Full tokenization parser for complex expressions (fallback)
 */
function evaluateComplexExpression(expression, lookup) {
    // Tokenize the expression safely
    const tokens = tokenizeExpression(expression);
    let index = 0;
    function parseExpression() {
        let result = parseTerm();
        while (index < tokens.length) {
            const token = tokens[index];
            if (token.type === 'operator' && (token.value === '+' || token.value === '-')) {
                index++;
                const term = parseTerm();
                result = token.value === '+' ? result + term : result - term;
            }
            else {
                break;
            }
        }
        return result;
    }
    function parseTerm() {
        let result = parseFactor();
        while (index < tokens.length) {
            const token = tokens[index];
            if (token.type === 'operator' && (token.value === '*' || token.value === '/')) {
                index++;
                const factor = parseFactor();
                if (token.value === '*') {
                    result *= factor;
                }
                else {
                    if (factor === 0)
                        throw new Error('Division by zero');
                    result /= factor;
                }
            }
            else {
                break;
            }
        }
        return result;
    }
    function parseFactor() {
        const token = tokens[index++];
        if (token.type === 'number') {
            return token.value;
        }
        if (token.type === 'identifier') {
            const resolved = lookup(token.value);
            if (typeof resolved === 'number') {
                return resolved;
            }
            throw new Error(`Cannot resolve reference: ${token.value}`);
        }
        if (token.type === 'operator' && token.value === '(') {
            const result = parseExpression();
            if (index < tokens.length && tokens[index].type === 'operator' && tokens[index].value === ')') {
                index++;
                return result;
            }
            throw new Error('Mismatched parentheses');
        }
        throw new Error(`Unexpected token: ${token.value}`);
    }
    const result = parseExpression();
    if (index < tokens.length) {
        throw new Error('Unexpected tokens at end of expression');
    }
    return result;
}
/**
 * Safely tokenizes a math expression into tokens
 */
function tokenizeExpression(expression) {
    const tokens = [];
    let i = 0;
    while (i < expression.length) {
        const char = expression[i];
        // Skip whitespace
        if (/\s/.test(char)) {
            i++;
            continue;
        }
        // Numbers (including decimals)
        if (/\d/.test(char)) {
            let numStr = '';
            while (i < expression.length && /[\d.]/.test(expression[i])) {
                numStr += expression[i++];
            }
            const num = parseFloat(numStr);
            if (isNaN(num)) {
                throw new Error(`Invalid number: ${numStr}`);
            }
            tokens.push({ type: 'number', value: num });
            continue;
        }
        // Identifiers (references)
        if (/[a-zA-Z_]/.test(char)) {
            let ident = '';
            while (i < expression.length && /[a-zA-Z0-9_.]/.test(expression[i])) {
                ident += expression[i++];
            }
            tokens.push({ type: 'identifier', value: ident });
            continue;
        }
        // Operators and parentheses
        if (/[+\-*/()]/.test(char)) {
            tokens.push({ type: 'operator', value: char });
            i++;
            continue;
        }
        throw new Error(`Unexpected character: ${char}`);
    }
    return tokens;
}
//# sourceMappingURL=resolve-math.js.map