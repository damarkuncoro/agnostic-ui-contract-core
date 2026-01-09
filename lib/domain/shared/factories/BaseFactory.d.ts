/**
 * Base Factory Class
 * Implements DRY and SOLID principles for factory patterns
 */
export interface IFactory<TInput, TOutput> {
    create(input: TInput): TOutput;
}
export declare abstract class BaseFactory<TInput, TOutput> implements IFactory<TInput, TOutput> {
    abstract create(input: TInput): TOutput;
    /**
     * Validates input before creation
     */
    protected validateInput(_input: TInput): void;
    /**
     * Creates multiple items from inputs
     */
    createMany(inputs: TInput[]): TOutput[];
    /**
     * Creates an item with validation
     */
    createValidated(input: TInput): TOutput;
}
/**
 * Factory registry for managing multiple factory types
 */
export declare class FactoryRegistry {
    private factories;
    registerFactory<TInput, TOutput>(name: string, factory: IFactory<TInput, TOutput>): void;
    getFactory<TInput, TOutput>(name: string): IFactory<TInput, TOutput> | undefined;
    createWithFactory<TInput, TOutput>(factoryName: string, input: TInput): TOutput | undefined;
    getRegisteredFactories(): string[];
}
/**
 * Component factory base class
 */
export declare abstract class ComponentFactory<TInput, TOutput> extends BaseFactory<TInput, TOutput> {
    /**
     * Creates a standard/default component
     */
    abstract createStandard(name: string): TOutput;
    /**
     * Creates a component with custom configuration
     */
    abstract createCustom(config: TInput): TOutput;
    /**
     * Creates a variant of an existing component
     */
    abstract createVariant(baseComponent: TOutput, modifications: Partial<TInput>): TOutput;
}
/**
 * Contract factory base class
 */
export declare abstract class ContractFactory<TInput, TOutput> extends ComponentFactory<TInput, TOutput> {
    /**
     * Validates contract-specific business rules
     */
    protected validateContractRules(_input: TInput): void;
    /**
     * Creates a contract with validation
     */
    createValidatedContract(input: TInput): TOutput;
}
/**
 * Factory method pattern implementation
 */
export declare abstract class FactoryMethod<TOutput> {
    /**
     * Factory method to be implemented by subclasses
     */
    protected abstract createProduct(): TOutput;
    /**
     * Main factory method that orchestrates creation
     */
    create(): TOutput;
    /**
     * Hook for pre-creation logic
     */
    protected beforeCreate(): void;
    /**
     * Hook for post-creation logic
     */
    protected afterCreate(_product: TOutput): void;
}
/**
 * Singleton factory registry
 */
export declare class GlobalFactoryRegistry {
    private static instance;
    static getInstance(): FactoryRegistry;
}
/**
 * Factory builder pattern for complex factory creation
 */
export declare class FactoryBuilder<TInput, TOutput> {
    private validators;
    private postProcessors;
    private preProcessors;
    addValidator(validator: (input: TInput) => void): FactoryBuilder<TInput, TOutput>;
    addPreProcessor(processor: (input: TInput) => TInput): FactoryBuilder<TInput, TOutput>;
    addPostProcessor(processor: (_output: TOutput) => TOutput): FactoryBuilder<TInput, TOutput>;
    build(creator: (input: TInput) => TOutput): IFactory<TInput, TOutput>;
}
//# sourceMappingURL=BaseFactory.d.ts.map