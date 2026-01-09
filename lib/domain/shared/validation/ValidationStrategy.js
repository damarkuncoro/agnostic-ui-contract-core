"use strict";
/**
 * Strategy Pattern for Validation
 * Enables Open/Closed principle by allowing new validation strategies without modifying existing code
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationContext = exports.ValidationStrategyFactory = exports.BusinessRulesValidationStrategy = exports.AccessibilityValidationStrategy = exports.ComponentValidationStrategy = exports.EntityValidationStrategy = exports.CompositeValidationStrategy = exports.ValidationStrategy = void 0;
const ValidationUtils_1 = require("./ValidationUtils");
class ValidationStrategy {
}
exports.ValidationStrategy = ValidationStrategy;
/**
 * Composite validation strategy that combines multiple strategies
 */
class CompositeValidationStrategy {
    constructor(strategies) {
        this.strategies = strategies;
    }
    validate(entity) {
        const allResults = this.strategies.map(strategy => strategy.validate(entity));
        const combinedErrors = allResults.flatMap(result => result.errors);
        const combinedWarnings = allResults.flatMap(result => result.warnings);
        return (0, ValidationUtils_1.createValidationResult)(combinedErrors, combinedWarnings);
    }
    getStrategyName() {
        return `Composite(${this.strategies.map(s => s.getStrategyName()).join(', ')})`;
    }
    addStrategy(strategy) {
        this.strategies.push(strategy);
    }
    removeStrategy(strategyName) {
        this.strategies = this.strategies.filter(s => s.getStrategyName() !== strategyName);
    }
}
exports.CompositeValidationStrategy = CompositeValidationStrategy;
/**
 * Basic entity validation strategy
 */
class EntityValidationStrategy extends ValidationStrategy {
    validate(entity) {
        const errors = [];
        const warnings = [];
        // Basic entity validation
        if (!entity) {
            errors.push('Entity cannot be null or undefined');
            return (0, ValidationUtils_1.createValidationResult)(errors, warnings);
        }
        if (!entity.id) {
            errors.push('Entity must have an ID');
        }
        if (typeof entity.id !== 'string' || entity.id.trim().length === 0) {
            errors.push('Entity ID must be a non-empty string');
        }
        return (0, ValidationUtils_1.createValidationResult)(errors, warnings);
    }
    getStrategyName() {
        return 'EntityValidation';
    }
}
exports.EntityValidationStrategy = EntityValidationStrategy;
/**
 * Component-specific validation strategies
 */
class ComponentValidationStrategy extends ValidationStrategy {
    validate(entity) {
        const errors = [];
        const warnings = [];
        // Component-specific validation
        if (!entity.name) {
            errors.push('Component must have a name');
        }
        // Validate variants if present
        if (entity.variants) {
            if (!Array.isArray(entity.variants)) {
                errors.push('Variants must be an array');
            }
            else {
                entity.variants.forEach((variant, index) => {
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
            }
            else {
                entity.props.forEach((prop, index) => {
                    if (!prop.name || !prop.type) {
                        errors.push(`Prop at index ${index} must have name and type`);
                    }
                });
            }
        }
        return (0, ValidationUtils_1.createValidationResult)(errors, warnings);
    }
    getStrategyName() {
        return 'ComponentValidation';
    }
}
exports.ComponentValidationStrategy = ComponentValidationStrategy;
/**
 * Accessibility validation strategy
 */
class AccessibilityValidationStrategy extends ValidationStrategy {
    validate(entity) {
        const errors = [];
        const warnings = [];
        if (!entity.accessibility) {
            warnings.push('No accessibility configuration provided');
            return (0, ValidationUtils_1.createValidationResult)(errors, warnings);
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
            }
            else if (accessibility.keyboard.length === 0) {
                warnings.push('Keyboard support is empty');
            }
        }
        return (0, ValidationUtils_1.createValidationResult)(errors, warnings);
    }
    getStrategyName() {
        return 'AccessibilityValidation';
    }
}
exports.AccessibilityValidationStrategy = AccessibilityValidationStrategy;
/**
 * Business rules validation strategy
 */
class BusinessRulesValidationStrategy extends ValidationStrategy {
    constructor(rules) {
        super();
        this.rules = rules;
    }
    validate(entity) {
        const errors = [];
        for (const rule of this.rules) {
            const error = rule(entity);
            if (error) {
                errors.push(error);
            }
        }
        return (0, ValidationUtils_1.createValidationResult)(errors);
    }
    getStrategyName() {
        return 'BusinessRulesValidation';
    }
}
exports.BusinessRulesValidationStrategy = BusinessRulesValidationStrategy;
/**
 * Validation strategy factory
 */
class ValidationStrategyFactory {
    static createEntityValidation() {
        return new EntityValidationStrategy();
    }
    static createComponentValidation() {
        return new ComponentValidationStrategy();
    }
    static createAccessibilityValidation() {
        return new AccessibilityValidationStrategy();
    }
    static createBusinessRulesValidation(rules) {
        return new BusinessRulesValidationStrategy(rules);
    }
    static createCompositeValidation(strategies) {
        return new CompositeValidationStrategy(strategies);
    }
    static createDefaultComponentValidation() {
        return new CompositeValidationStrategy([
            new EntityValidationStrategy(),
            new ComponentValidationStrategy(),
            new AccessibilityValidationStrategy()
        ]);
    }
}
exports.ValidationStrategyFactory = ValidationStrategyFactory;
/**
 * Validation context that manages strategies
 */
class ValidationContext {
    constructor() {
        this.strategies = new Map();
    }
    addStrategy(name, strategy) {
        this.strategies.set(name, strategy);
    }
    removeStrategy(name) {
        this.strategies.delete(name);
    }
    validate(entity, strategyNames) {
        const strategiesToUse = strategyNames
            ? strategyNames.map(name => this.strategies.get(name)).filter((strategy) => strategy !== undefined)
            : Array.from(this.strategies.values());
        if (strategiesToUse.length === 0) {
            return (0, ValidationUtils_1.createValidationResult)([], ['No validation strategies configured']);
        }
        const composite = new CompositeValidationStrategy(strategiesToUse);
        return composite.validate(entity);
    }
    getAvailableStrategies() {
        return Array.from(this.strategies.keys());
    }
}
exports.ValidationContext = ValidationContext;
//# sourceMappingURL=ValidationStrategy.js.map