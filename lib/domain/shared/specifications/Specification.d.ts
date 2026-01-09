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
export declare abstract class Specification<T> implements ISpecification<T> {
    abstract isSatisfiedBy(candidate: T): boolean;
    abstract getErrorMessage(): string;
    and(other: ISpecification<T>): ISpecification<T>;
    or(other: ISpecification<T>): ISpecification<T>;
    not(): ISpecification<T>;
}
/**
 * Common specifications for contract validation
 */
export declare class EntityNameSpecification extends Specification<string> {
    private entityType;
    constructor(entityType: string);
    isSatisfiedBy(candidate: string): boolean;
    getErrorMessage(): string;
}
export declare class VariantValueSpecification extends Specification<string> {
    private allowedValues;
    private variantType;
    constructor(allowedValues: string[], variantType: string);
    isSatisfiedBy(candidate: string): boolean;
    getErrorMessage(): string;
}
export declare class AccessibilitySpecification extends Specification<any> {
    isSatisfiedBy(candidate: any): boolean;
    getErrorMessage(): string;
}
export declare class KeyboardSupportSpecification extends Specification<any> {
    isSatisfiedBy(candidate: any): boolean;
    getErrorMessage(): string;
}
/**
 * Composite specifications for complex business rules
 */
export declare class ComponentSpecification extends Specification<any> {
    private specs;
    addSpecification(spec: ISpecification<any>): ComponentSpecification;
    isSatisfiedBy(candidate: any): boolean;
    getErrorMessage(): string;
    getViolations(candidate: any): string[];
}
//# sourceMappingURL=Specification.d.ts.map