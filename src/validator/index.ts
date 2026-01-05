// src/validator/index.ts

import * as fs from 'fs'
import * as path from 'path'
import { ContractValidationResult, ContractValidationError, ContractValidationWarning } from './types'

export { ContractValidationResult, ContractValidationError, ContractValidationWarning } from './types'

/**
 * Validates a contract package against Agnostic UI standards
 */
export function validateContract(contractPath: string): ContractValidationResult {
  const errors: ContractValidationError[] = []
  const warnings: ContractValidationWarning[] = []

  try {
    // Check if path exists
    if (!fs.existsSync(contractPath)) {
      errors.push({
        type: 'error',
        code: 'PATH_NOT_FOUND',
        message: `Contract path does not exist: ${contractPath}`,
        file: contractPath
      })
      return { valid: false, errors, warnings }
    }

    // Validate package structure
    validatePackageStructure(contractPath, errors, warnings)

    // Validate package.json
    validatePackageJson(contractPath, errors, warnings)

    // Validate TypeScript files
    validateTypeScriptFiles(contractPath, errors, warnings)

    // Validate semantic arrays
    validateSemanticArrays(contractPath, errors, warnings)

    // Validate exports
    validateExports(contractPath, errors, warnings)

    // Validate documentation
    validateDocumentation(contractPath, errors, warnings)

  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    errors.push({
      type: 'error',
      code: 'VALIDATION_FAILED',
      message: `Validation failed: ${message}`,
      file: contractPath
    })
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * Validates the required package structure
 */
function validatePackageStructure(contractPath: string, errors: ContractValidationError[], warnings: ContractValidationWarning[]) {
  const requiredFiles = [
    'package.json',
    'tsconfig.json',
    'README.md',
    'src/index.ts'
  ]

  const recommendedFiles = [
    'src/types.ts',
    'src/variants.ts',
    'src/tokens.ts',
    'src/a11y.ts'
  ]

  // Check required files
  for (const file of requiredFiles) {
    const filePath = path.join(contractPath, file)
    if (!fs.existsSync(filePath)) {
      errors.push({
        type: 'error',
        code: 'MISSING_REQUIRED_FILE',
        message: `Missing required file: ${file}`,
        file: filePath
      })
    }
  }

  // Check recommended files
  for (const file of recommendedFiles) {
    const filePath = path.join(contractPath, file)
    if (!fs.existsSync(filePath)) {
      warnings.push({
        type: 'warning',
        code: 'MISSING_RECOMMENDED_FILE',
        message: `Missing recommended file: ${file}`,
        file: filePath
      })
    }
  }

  // Check src directory structure
  const srcPath = path.join(contractPath, 'src')
  if (fs.existsSync(srcPath)) {
    const srcFiles = fs.readdirSync(srcPath)
    const tsFiles = srcFiles.filter(f => f.endsWith('.ts'))

    if (tsFiles.length === 0) {
      errors.push({
        type: 'error',
        code: 'NO_TYPESCRIPT_FILES',
        message: 'No TypeScript files found in src directory',
        file: srcPath
      })
    }
  }
}

/**
 * Validates package.json configuration
 */
function validatePackageJson(contractPath: string, errors: ContractValidationError[], warnings: ContractValidationWarning[]) {
  const packageJsonPath = path.join(contractPath, 'package.json')

  if (!fs.existsSync(packageJsonPath)) {
    return // Already reported in structure validation
  }

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

    // Check package name
    if (!packageJson.name) {
      errors.push({
        type: 'error',
        code: 'MISSING_PACKAGE_NAME',
        message: 'package.json must have a name field',
        file: packageJsonPath
      })
    } else {
      // Check naming convention
      if (!packageJson.name.startsWith('@damarkuncoro/agnostic-ui-contract-')) {
        errors.push({
          type: 'error',
          code: 'INVALID_PACKAGE_NAME',
          message: 'Package name must follow @damarkuncoro/agnostic-ui-contract-[component] pattern',
          file: packageJsonPath
        })
      }
    }

    // Check dependencies
    if (!packageJson.dependencies?.['@damarkuncoro/agnostic-ui-contract-core']) {
      errors.push({
        type: 'error',
        code: 'MISSING_CORE_DEPENDENCY',
        message: 'Package must depend on @damarkuncoro/agnostic-ui-contract-core',
        file: packageJsonPath
      })
    }

    // Check TypeScript dependency
    if (!packageJson.devDependencies?.['typescript']) {
      warnings.push({
        type: 'warning',
        code: 'MISSING_TYPESCRIPT_DEV_DEP',
        message: 'Consider adding TypeScript as a dev dependency',
        file: packageJsonPath
      })
    }

  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    errors.push({
      type: 'error',
      code: 'INVALID_PACKAGE_JSON',
      message: `Invalid package.json: ${message}`,
      file: packageJsonPath
    })
  }
}

/**
 * Validates TypeScript files for proper structure
 */
function validateTypeScriptFiles(contractPath: string, errors: ContractValidationError[], warnings: ContractValidationWarning[]) {
  const srcPath = path.join(contractPath, 'src')

  if (!fs.existsSync(srcPath)) {
    return
  }

  const tsFiles = fs.readdirSync(srcPath).filter(f => f.endsWith('.ts'))

  for (const tsFile of tsFiles) {
    const filePath = path.join(srcPath, tsFile)

    try {
      const content = fs.readFileSync(filePath, 'utf-8')

      // Check for proper exports
      if (!content.includes('export')) {
        warnings.push({
          type: 'warning',
          code: 'NO_EXPORTS',
          message: `File has no exports: ${tsFile}`,
          file: filePath
        })
      }

      // Check for semantic arrays (const as readonly)
      if (content.includes('as const')) {
        // This is good - they're using readonly arrays
      }

      // Check for proper JSDoc comments on exports
      const exportMatches = content.match(/export (const|interface|type|function)/g)
      if (exportMatches) {
        // Could add more detailed JSDoc validation here
      }

    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      errors.push({
        type: 'error',
        code: 'FILE_READ_ERROR',
        message: `Cannot read TypeScript file: ${message}`,
        file: filePath
      })
    }
  }
}

/**
 * Validates semantic arrays follow proper patterns
 */
function validateSemanticArrays(contractPath: string, errors: ContractValidationError[], warnings: ContractValidationWarning[]) {
  const srcPath = path.join(contractPath, 'src')

  if (!fs.existsSync(srcPath)) {
    return
  }

  const tsFiles = fs.readdirSync(srcPath).filter(f => f.endsWith('.ts'))

  for (const tsFile of tsFiles) {
    const filePath = path.join(srcPath, tsFile)

    try {
      const content = fs.readFileSync(filePath, 'utf-8')

      // Look for semantic arrays (uiSomething = [...] as const)
      const semanticArrayRegex = /ui\w+\s*=\s*\[.*?\]\s*as\s+const/g
      const matches = content.match(semanticArrayRegex)

      if (matches) {
        for (const match of matches) {
          // Check if corresponding type is exported
          const arrayName = match.split('=')[0].trim()
          const typeName = `Ui${arrayName.charAt(2).toUpperCase()}${arrayName.slice(3)}`

          if (!content.includes(`typeof ${arrayName}[number]`)) {
            warnings.push({
              type: 'warning',
              code: 'MISSING_SEMANTIC_TYPE',
              message: `Semantic array ${arrayName} should have corresponding union type`,
              file: filePath
            })
          }
        }
      }

    } catch (error) {
      // File read errors already handled above
    }
  }
}

/**
 * Validates export patterns
 */
function validateExports(contractPath: string, errors: ContractValidationError[], warnings: ContractValidationWarning[]) {
  const indexPath = path.join(contractPath, 'src/index.ts')

  if (!fs.existsSync(indexPath)) {
    return
  }

  try {
    const content = fs.readFileSync(indexPath, 'utf-8')

    // Check for proper export patterns
    if (!content.includes('export * from')) {
      warnings.push({
        type: 'warning',
        code: 'NO_BARREL_EXPORTS',
        message: 'Consider using barrel exports for better API design',
        file: indexPath
      })
    }

    // Check for core re-exports
    if (!content.includes('@damarkuncoro/agnostic-ui-contract-core')) {
      warnings.push({
        type: 'warning',
        code: 'NO_CORE_REEXPORTS',
        message: 'Consider re-exporting core types for convenience',
        file: indexPath
      })
    }

  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    errors.push({
      type: 'error',
      code: 'INDEX_READ_ERROR',
      message: `Cannot read index file: ${message}`,
      file: indexPath
    })
  }
}

/**
 * Validates documentation completeness
 */
function validateDocumentation(contractPath: string, errors: ContractValidationError[], warnings: ContractValidationWarning[]) {
  const readmePath = path.join(contractPath, 'README.md')

  if (!fs.existsSync(readmePath)) {
    errors.push({
      type: 'error',
      code: 'MISSING_README',
      message: 'Contract must have a README.md file',
      file: readmePath
    })
    return
  }

  try {
    const content = fs.readFileSync(readmePath, 'utf-8')

    const requiredSections = [
      'Installation',
      'Usage',
      'API'
    ]

    for (const section of requiredSections) {
      if (!content.includes(`## ${section}`)) {
        errors.push({
          type: 'error',
          code: 'MISSING_README_SECTION',
          message: `README must contain section: ${section}`,
          file: readmePath
        })
      }
    }

    // Check for code examples
    if (!content.includes('```typescript')) {
      warnings.push({
        type: 'warning',
        code: 'NO_CODE_EXAMPLES',
        message: 'README should contain TypeScript code examples',
        file: readmePath
      })
    }

  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    errors.push({
      type: 'error',
      code: 'README_READ_ERROR',
      message: `Cannot read README: ${message}`,
      file: readmePath
    })
  }
}