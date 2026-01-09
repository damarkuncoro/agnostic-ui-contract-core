/**
 * Strategy Pattern for Validation
 * Enables Open/Closed principle by allowing new validation strategies without modifying existing code
 */

import { ValidationResult, createValidationResult } from './ValidationUtils';

export interface IValidationStrategy<T> {
  validate(entity: T): ValidationResult;
  getStrategyName(): string;
}

export abstract class ValidationStrategy<T> implements IValidationStrategy<T> {
  abstract validate(entity: T): ValidationResult;
  abstract getStrategyName(): string;
}

/**
 * Composite validation strategy that combines multiple strategies
 */
export class CompositeValidationStrategy<T> implements IValidationStrategy<T> {
  constructor(private strategies: IValidationStrategy<T>[]) {}

  validate(entity: T): ValidationResult {
    const allResults = this.strategies.map(strategy => strategy.validate(entity));

    const combinedErrors = allResults.flatMap(result => result.errors);
    const combinedWarnings = allResults.flatMap(result => result.warnings);

    return createValidationResult(combinedErrors, combinedWarnings);
  }

  getStrategyName(): string {
    return `Composite(${this.strategies.map(s => s.getStrategyName()).join(', ')})`;
  }

  addStrategy(strategy: IValidationStrategy<T>): void {
    this.strategies.push(strategy);
  }

  removeStrategy(strategyName: string): void {
    this.strategies = this.strategies.filter(s => s.getStrategyName() !== strategyName);
  }
}

/**
 * Basic entity validation strategy
 */
export class EntityValidationStrategy extends ValidationStrategy<any> {
  validate(entity: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Basic entity validation
    if (!entity) {
      errors.push('Entity cannot be null or undefined');
      return createValidationResult(errors, warnings);
    }

    if (!entity.id) {
      errors.push('Entity must have an ID');
    }

    if (typeof entity.id !== 'string' || entity.id.trim().length === 0) {
      errors.push('Entity ID must be a non-empty string');
    }

    return createValidationResult(errors, warnings);
  }

  getStrategyName(): string {
    return 'EntityValidation';
  }
}

/**
 * Component-specific validation strategies
 */
export class ComponentValidationStrategy extends ValidationStrategy<any> {
  validate(entity: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Component-specific validation
    if (!entity.name) {
      errors.push('Component must have a name');
    }

    // Validate variants if present
    if (entity.variants) {
      if (!Array.isArray(entity.variants)) {
        errors.push('Variants must be an array');
      } else {
        entity.variants.forEach((variant: any, index: number) => {
          if (!variant.type || !variant.values) {
            errors.push(`Variant at index ${index} must have type and values`);
          }
        });
      }
    }

    // Validate props if present
    if (entity.props) {
      if (!Array.isArray(entity.props)) {
        errors.push('Props must be an array');
      } else {
        entity.props.forEach((prop: any, index: number) => {
          if (!prop.name || !prop.type) {
            errors.push(`Prop at index ${index} must have name and type`);
          }
        });
      }
    }

    return createValidationResult(errors, warnings);
  }

  getStrategyName(): string {
    return 'ComponentValidation';
  }
}

/**
 * Accessibility validation strategy
 */
export class AccessibilityValidationStrategy extends ValidationStrategy<any> {
  validate(entity: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!entity.accessibility) {
      warnings.push('No accessibility configuration provided');
      return createValidationResult(errors, warnings);
    }

    const accessibility = entity.accessibility;

    // Validate ARIA attributes
    if (accessibility.role && typeof accessibility.role !== 'string') {
      errors.push('ARIA role must be a string');
    }

    // Validate keyboard support
    if (accessibility.keyboard) {
      if (!Array.isArray(accessibility.keyboard)) {
        errors.push('Keyboard support must be an array of actions');
      } else if (accessibility.keyboard.length === 0) {
        warnings.push('Keyboard support is empty');
      }
    }

    return createValidationResult(errors, warnings);
  }

  getStrategyName(): string {
    return 'AccessibilityValidation';
  }
}

/**
 * Business rules validation strategy
 */
export class BusinessRulesValidationStrategy extends ValidationStrategy<any> {
  constructor(private rules: Array<(entity: any) => string | null>) {
    super();
  }

  validate(entity: any): ValidationResult {
    const errors: string[] = [];

    for (const rule of this.rules) {
      const error = rule(entity);
      if (error) {
        errors.push(error);
      }
    }

    return createValidationResult(errors);
  }

  getStrategyName(): string {
    return 'BusinessRulesValidation';
  }
}

/**
 * Validation strategy factory
 */
export class ValidationStrategyFactory {
  static createEntityValidation(): EntityValidationStrategy {
    return new EntityValidationStrategy();
  }

  static createComponentValidation(): ComponentValidationStrategy {
    return new ComponentValidationStrategy();
  }

  static createAccessibilityValidation(): AccessibilityValidationStrategy {
    return new AccessibilityValidationStrategy();
  }

  static createBusinessRulesValidation(rules: Array<(entity: any) => string | null>): BusinessRulesValidationStrategy {
    return new BusinessRulesValidationStrategy(rules);
  }

  static createCompositeValidation<T>(strategies: IValidationStrategy<T>[]): CompositeValidationStrategy<T> {
    return new CompositeValidationStrategy<T>(strategies);
  }

  static createDefaultComponentValidation(): CompositeValidationStrategy<any> {
    return new CompositeValidationStrategy([
      new EntityValidationStrategy(),
      new ComponentValidationStrategy(),
      new AccessibilityValidationStrategy()
    ]);
  }
}

/**
 * Validation context that manages strategies
 */
export class ValidationContext<T> {
  private strategies: Map<string, IValidationStrategy<T>> = new Map();

  addStrategy(name: string, strategy: IValidationStrategy<T>): void {
    this.strategies.set(name, strategy);
  }

  removeStrategy(name: string): void {
    this.strategies.delete(name);
  }

  validate(entity: T, strategyNames?: string[]): ValidationResult {
    const strategiesToUse = strategyNames
      ? strategyNames.map(name => this.strategies.get(name)).filter((strategy): strategy is IValidationStrategy<T> => strategy !== undefined)
      : Array.from(this.strategies.values());

    if (strategiesToUse.length === 0) {
      return createValidationResult([], ['No validation strategies configured']);
    }

    const composite = new CompositeValidationStrategy(strategiesToUse);
    return composite.validate(entity);
  }

  getAvailableStrategies(): string[] {
    return Array.from(this.strategies.keys());
  }
}