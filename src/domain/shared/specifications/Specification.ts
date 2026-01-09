/**
 * Specification Pattern Implementation
 * Enables composable business rules following SOLID principles
 */

export interface ISpecification<T> {
  isSatisfiedBy(candidate: T): boolean;
  and(other: ISpecification<T>): ISpecification<T>;
  or(other: ISpecification<T>): ISpecification<T>;
  not(): ISpecification<T>;
  getErrorMessage(): string;
}

export abstract class Specification<T> implements ISpecification<T> {
  abstract isSatisfiedBy(candidate: T): boolean;
  abstract getErrorMessage(): string;

  and(other: ISpecification<T>): ISpecification<T> {
    return new AndSpecification(this, other);
  }

  or(other: ISpecification<T>): ISpecification<T> {
    return new OrSpecification(this, other);
  }

  not(): ISpecification<T> {
    return new NotSpecification(this);
  }
}

class AndSpecification<T> extends Specification<T> {
  constructor(
    private left: ISpecification<T>,
    private right: ISpecification<T>
  ) {
    super();
  }

  isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate);
  }

  getErrorMessage(): string {
    return `${this.left.getErrorMessage()} and ${this.right.getErrorMessage()}`;
  }
}

class OrSpecification<T> extends Specification<T> {
  constructor(
    private left: ISpecification<T>,
    private right: ISpecification<T>
  ) {
    super();
  }

  isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate);
  }

  getErrorMessage(): string {
    return `${this.left.getErrorMessage()} or ${this.right.getErrorMessage()}`;
  }
}

class NotSpecification<T> extends Specification<T> {
  constructor(private spec: ISpecification<T>) {
    super();
  }

  isSatisfiedBy(candidate: T): boolean {
    return !this.spec.isSatisfiedBy(candidate);
  }

  getErrorMessage(): string {
    return `not ${this.spec.getErrorMessage()}`;
  }
}

/**
 * Common specifications for contract validation
 */
export class EntityNameSpecification extends Specification<string> {
  constructor(private entityType: string) {
    super();
  }

  isSatisfiedBy(candidate: string): boolean {
    if (!candidate || typeof candidate !== 'string' || candidate.trim().length === 0) {
      return false;
    }

    // Validate name format (lowercase, alphanumeric, dashes)
    const validName = /^[a-z][a-z0-9-]*$/;
    return validName.test(candidate);
  }

  getErrorMessage(): string {
    return `${this.entityType} name must be lowercase with only alphanumeric characters and dashes`;
  }
}

export class VariantValueSpecification extends Specification<string> {
  constructor(
    private allowedValues: string[],
    private variantType: string
  ) {
    super();
  }

  isSatisfiedBy(candidate: string): boolean {
    return this.allowedValues.includes(candidate);
  }

  getErrorMessage(): string {
    return `Invalid ${this.variantType} variant: ${this.allowedValues.join(', ')} are allowed`;
  }
}

export class AccessibilitySpecification extends Specification<any> {
  isSatisfiedBy(candidate: any): boolean {
    if (!candidate) return true;

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

  getErrorMessage(): string {
    return 'Accessibility configuration is invalid';
  }
}

export class KeyboardSupportSpecification extends Specification<any> {
  isSatisfiedBy(candidate: any): boolean {
    if (!candidate) return true;

    // Keyboard support should have actions defined
    return candidate.supportedActions &&
           Array.isArray(candidate.supportedActions) &&
           candidate.supportedActions.length > 0;
  }

  getErrorMessage(): string {
    return 'Keyboard support must define supported actions';
  }
}

/**
 * Composite specifications for complex business rules
 */
export class ComponentSpecification extends Specification<any> {
  private specs: ISpecification<any>[] = [];

  addSpecification(spec: ISpecification<any>): ComponentSpecification {
    this.specs.push(spec);
    return this;
  }

  isSatisfiedBy(candidate: any): boolean {
    return this.specs.every(spec => spec.isSatisfiedBy(candidate));
  }

  getErrorMessage(): string {
    const failures = this.specs
      .filter(spec => !spec.isSatisfiedBy({})) // Check against empty object to get all messages
      .map(spec => spec.getErrorMessage());

    return failures.length > 0 ? failures.join('; ') : 'Component validation failed';
  }

  getViolations(candidate: any): string[] {
    return this.specs
      .filter(spec => !spec.isSatisfiedBy(candidate))
      .map(spec => spec.getErrorMessage());
  }
}