/**
 * Base Factory Class
 * Implements DRY and SOLID principles for factory patterns
 */

export interface IFactory<TInput, TOutput> {
  create(input: TInput): TOutput;
}

export abstract class BaseFactory<TInput, TOutput> implements IFactory<TInput, TOutput> {
  abstract create(input: TInput): TOutput;

  /**
   * Validates input before creation
   */
  protected validateInput(_input: TInput): void {
    // Default implementation - override in subclasses
  }

  /**
   * Creates multiple items from inputs
   */
  createMany(inputs: TInput[]): TOutput[] {
    return inputs.map(input => this.create(input));
  }

  /**
   * Creates an item with validation
   */
  createValidated(input: TInput): TOutput {
    this.validateInput(input);
    return this.create(input);
  }
}

/**
 * Factory registry for managing multiple factory types
 */
export class FactoryRegistry {
  private factories: Map<string, IFactory<any, any>> = new Map();

  registerFactory<TInput, TOutput>(
    name: string,
    factory: IFactory<TInput, TOutput>
  ): void {
    this.factories.set(name, factory);
  }

  getFactory<TInput, TOutput>(name: string): IFactory<TInput, TOutput> | undefined {
    return this.factories.get(name);
  }

  createWithFactory<TInput, TOutput>(
    factoryName: string,
    input: TInput
  ): TOutput | undefined {
    const factory = this.getFactory<TInput, TOutput>(factoryName);
    return factory?.create(input);
  }

  getRegisteredFactories(): string[] {
    return Array.from(this.factories.keys());
  }
}

/**
 * Component factory base class
 */
export abstract class ComponentFactory<TInput, TOutput> extends BaseFactory<TInput, TOutput> {
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
export abstract class ContractFactory<TInput, TOutput> extends ComponentFactory<TInput, TOutput> {
  /**
   * Validates contract-specific business rules
   */
  protected validateContractRules(_input: TInput): void {
    // Contract-specific validation logic
  }

  /**
   * Creates a contract with validation
   */
  createValidatedContract(input: TInput): TOutput {
    this.validateInput(input);
    this.validateContractRules(input);
    return this.create(input);
  }
}

/**
 * Factory method pattern implementation
 */
export abstract class FactoryMethod<TOutput> {
  /**
   * Factory method to be implemented by subclasses
   */
  protected abstract createProduct(): TOutput;

  /**
   * Main factory method that orchestrates creation
   */
  create(): TOutput {
    // Pre-creation logic
    this.beforeCreate();

    // Create the product
    const product = this.createProduct();

    // Post-creation logic
    this.afterCreate(product);

    return product;
  }

  /**
   * Hook for pre-creation logic
   */
  protected beforeCreate(): void {
    // Default implementation - override in subclasses
  }

  /**
   * Hook for post-creation logic
   */
  protected afterCreate(_product: TOutput): void {
    // Default implementation - override in subclasses
  }
}

/**
 * Singleton factory registry
 */
export class GlobalFactoryRegistry {
  private static instance: FactoryRegistry;

  static getInstance(): FactoryRegistry {
    if (!GlobalFactoryRegistry.instance) {
      GlobalFactoryRegistry.instance = new FactoryRegistry();
    }
    return GlobalFactoryRegistry.instance;
  }
}

/**
 * Factory builder pattern for complex factory creation
 */
export class FactoryBuilder<TInput, TOutput> {
  private validators: Array<(input: TInput) => void> = [];
  private postProcessors: Array<(output: TOutput) => TOutput> = [];
  private preProcessors: Array<(input: TInput) => TInput> = [];

  addValidator(validator: (input: TInput) => void): FactoryBuilder<TInput, TOutput> {
    this.validators.push(validator);
    return this;
  }

  addPreProcessor(processor: (input: TInput) => TInput): FactoryBuilder<TInput, TOutput> {
    this.preProcessors.push(processor);
    return this;
  }

  addPostProcessor(processor: (_output: TOutput) => TOutput): FactoryBuilder<TInput, TOutput> {
    this.postProcessors.push(processor);
    return this;
  }

  build(creator: (input: TInput) => TOutput): IFactory<TInput, TOutput> {
    return {
      create: (input: TInput): TOutput => {
        // Pre-process input
        let processedInput = input;
        for (const processor of this.preProcessors) {
          processedInput = processor(processedInput);
        }

        // Validate input
        for (const validator of this.validators) {
          validator(processedInput);
        }

        // Create output
        let output = creator(processedInput);

        // Post-process output
        for (const processor of this.postProcessors) {
          output = processor(output);
        }

        return output;
      }
    };
  }
}