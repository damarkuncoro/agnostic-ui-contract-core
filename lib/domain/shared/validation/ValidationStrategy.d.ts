/**
 * Strategy Pattern for Validation
 * Enables Open/Closed principle by allowing new validation strategies without modifying existing code
 */
import { ValidationResult } from './ValidationUtils';
export interface IValidationStrategy<T> {
    validate(entity: T): ValidationResult;
    getStrategyName(): string;
}
export declare abstract class ValidationStrategy<T> implements IValidationStrategy<T> {
    abstract validate(entity: T): ValidationResult;
    abstract getStrategyName(): string;
}
/**
 * Composite validation strategy that combines multiple strategies
 */
export declare class CompositeValidationStrategy<T> implements IValidationStrategy<T> {
    private strategies;
    constructor(strategies: IValidationStrategy<T>[]);
    validate(entity: T): ValidationResult;
    getStrategyName(): string;
    addStrategy(strategy: IValidationStrategy<T>): void;
    removeStrategy(strategyName: string): void;
}
/**
 * Basic entity validation strategy
 */
export declare class EntityValidationStrategy extends ValidationStrategy<any> {
    validate(entity: any): ValidationResult;
    getStrategyName(): string;
}
/**
 * Component-specific validation strategies
 */
export declare class ComponentValidationStrategy extends ValidationStrategy<any> {
    validate(entity: any): ValidationResult;
    getStrategyName(): string;
}
/**
 * Accessibility validation strategy
 */
export declare class AccessibilityValidationStrategy extends ValidationStrategy<any> {
    validate(entity: any): ValidationResult;
    getStrategyName(): string;
}
/**
 * Business rules validation strategy
 */
export declare class BusinessRulesValidationStrategy extends ValidationStrategy<any> {
    private rules;
    constructor(rules: Array<(entity: any) => string | null>);
    validate(entity: any): ValidationResult;
    getStrategyName(): string;
}
/**
 * Validation strategy factory
 */
export declare class ValidationStrategyFactory {
    static createEntityValidation(): EntityValidationStrategy;
    static createComponentValidation(): ComponentValidationStrategy;
    static createAccessibilityValidation(): AccessibilityValidationStrategy;
    static createBusinessRulesValidation(rules: Array<(entity: any) => string | null>): BusinessRulesValidationStrategy;
    static createCompositeValidation<T>(strategies: IValidationStrategy<T>[]): CompositeValidationStrategy<T>;
    static createDefaultComponentValidation(): CompositeValidationStrategy<any>;
}
/**
 * Validation context that manages strategies
 */
export declare class ValidationContext<T> {
    private strategies;
    addStrategy(name: string, strategy: IValidationStrategy<T>): void;
    removeStrategy(name: string): void;
    validate(entity: T, strategyNames?: string[]): ValidationResult;
    getAvailableStrategies(): string[];
}
//# sourceMappingURL=ValidationStrategy.d.ts.map