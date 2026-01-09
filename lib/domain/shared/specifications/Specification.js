"use strict";
/**
 * Specification Pattern Implementation
 * Enables composable business rules following SOLID principles
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentSpecification = exports.KeyboardSupportSpecification = exports.AccessibilitySpecification = exports.VariantValueSpecification = exports.EntityNameSpecification = exports.Specification = void 0;
class Specification {
    and(other) {
        return new AndSpecification(this, other);
    }
    or(other) {
        return new OrSpecification(this, other);
    }
    not() {
        return new NotSpecification(this);
    }
}
exports.Specification = Specification;
class AndSpecification extends Specification {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }
    isSatisfiedBy(candidate) {
        return this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate);
    }
    getErrorMessage() {
        return `${this.left.getErrorMessage()} and ${this.right.getErrorMessage()}`;
    }
}
class OrSpecification extends Specification {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }
    isSatisfiedBy(candidate) {
        return this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate);
    }
    getErrorMessage() {
        return `${this.left.getErrorMessage()} or ${this.right.getErrorMessage()}`;
    }
}
class NotSpecification extends Specification {
    constructor(spec) {
        super();
        this.spec = spec;
    }
    isSatisfiedBy(candidate) {
        return !this.spec.isSatisfiedBy(candidate);
    }
    getErrorMessage() {
        return `not ${this.spec.getErrorMessage()}`;
    }
}
/**
 * Common specifications for contract validation
 */
class EntityNameSpecification extends Specification {
    constructor(entityType) {
        super();
        this.entityType = entityType;
    }
    isSatisfiedBy(candidate) {
        if (!candidate || typeof candidate !== 'string' || candidate.trim().length === 0) {
            return false;
        }
        // Validate name format (lowercase, alphanumeric, dashes)
        const validName = /^[a-z][a-z0-9-]*$/;
        return validName.test(candidate);
    }
    getErrorMessage() {
        return `${this.entityType} name must be lowercase with only alphanumeric characters and dashes`;
    }
}
exports.EntityNameSpecification = EntityNameSpecification;
class VariantValueSpecification extends Specification {
    constructor(allowedValues, variantType) {
        super();
        this.allowedValues = allowedValues;
        this.variantType = variantType;
    }
    isSatisfiedBy(candidate) {
        return this.allowedValues.includes(candidate);
    }
    getErrorMessage() {
        return `Invalid ${this.variantType} variant: ${this.allowedValues.join(', ')} are allowed`;
    }
}
exports.VariantValueSpecification = VariantValueSpecification;
class AccessibilitySpecification extends Specification {
    isSatisfiedBy(candidate) {
        if (!candidate)
            return true;
        // Validate ARIA live values
        const validAriaLive = ['off', 'polite', 'assertive'];
        if (candidate.ariaLive && !validAriaLive.includes(candidate.ariaLive)) {
            return false;
        }
        // Validate ARIA value relationships
        if (candidate.ariaValueNow !== undefined) {
            if (candidate.ariaValueMin !== undefined &&
                candidate.ariaValueNow < candidate.ariaValueMin) {
                return false;
            }
            if (candidate.ariaValueMax !== undefined &&
                candidate.ariaValueNow > candidate.ariaValueMax) {
                return false;
            }
        }
        return true;
    }
    getErrorMessage() {
        return 'Accessibility configuration is invalid';
    }
}
exports.AccessibilitySpecification = AccessibilitySpecification;
class KeyboardSupportSpecification extends Specification {
    isSatisfiedBy(candidate) {
        if (!candidate)
            return true;
        // Keyboard support should have actions defined
        return candidate.supportedActions &&
            Array.isArray(candidate.supportedActions) &&
            candidate.supportedActions.length > 0;
    }
    getErrorMessage() {
        return 'Keyboard support must define supported actions';
    }
}
exports.KeyboardSupportSpecification = KeyboardSupportSpecification;
/**
 * Composite specifications for complex business rules
 */
class ComponentSpecification extends Specification {
    constructor() {
        super(...arguments);
        this.specs = [];
    }
    addSpecification(spec) {
        this.specs.push(spec);
        return this;
    }
    isSatisfiedBy(candidate) {
        return this.specs.every(spec => spec.isSatisfiedBy(candidate));
    }
    getErrorMessage() {
        const failures = this.specs
            .filter(spec => !spec.isSatisfiedBy({})) // Check against empty object to get all messages
            .map(spec => spec.getErrorMessage());
        return failures.length > 0 ? failures.join('; ') : 'Component validation failed';
    }
    getViolations(candidate) {
        return this.specs
            .filter(spec => !spec.isSatisfiedBy(candidate))
            .map(spec => spec.getErrorMessage());
    }
}
exports.ComponentSpecification = ComponentSpecification;
//# sourceMappingURL=Specification.js.map