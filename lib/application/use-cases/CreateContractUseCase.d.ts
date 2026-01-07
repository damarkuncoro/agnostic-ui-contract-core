import { Contract, ContractCategory } from '../../domain/contract/entities/Contract';
import { IContractValidator } from '../../domain/contract/services/IContractValidator';
/**
 * Create Contract Use Case
 * Orchestrates the creation of new contracts with validation
 */
export declare class CreateContractUseCase {
    private readonly contractValidators;
    constructor(contractValidators: IContractValidator[]);
    /**
     * Executes the create contract use case
     */
    execute(input: CreateContractInput): Promise<CreateContractOutput>;
    /**
     * Validates the input data
     */
    private validateInput;
    /**
     * Creates contract variants from input
     */
    private createVariants;
    /**
     * Creates contract props from input
     */
    private createProps;
    /**
     * Runs all contract validators
     */
    private runContractValidators;
    /**
     * Gets available contract validators
     */
    getAvailableValidators(): string[];
    /**
     * Checks if a validator is available
     */
    hasValidator(validatorName: string): boolean;
    /**
     * Gets validator description
     */
    getValidatorDescription(validatorName: string): string | undefined;
    /**
     * Creates a standard component contract template
     */
    createStandardComponentContract(name: string, options?: {
        includeAccessibility?: boolean;
        includeValidation?: boolean;
        customVariants?: CreateContractVariantInput[];
        customProps?: CreateContractPropInput[];
    }): CreateContractInput;
}
/**
 * Input for CreateContractUseCase
 */
export interface CreateContractInput {
    id?: string;
    name: string;
    category: ContractCategory;
    version?: string;
    description?: string;
    variants?: CreateContractVariantInput[];
    props?: CreateContractPropInput[];
    accessibility?: {
        supported?: boolean;
        roles?: string[];
        keyboardActions?: string[];
        ariaAttributes?: string[];
    };
    validation?: {
        rules?: string[];
        schema?: Record<string, any>;
    };
    metadata?: Record<string, any>;
}
/**
 * Contract variant input
 */
export interface CreateContractVariantInput {
    name: string;
    type: 'size' | 'intent' | 'tone' | 'emphasis' | 'custom';
    values: any[];
    defaultValue?: any;
    description?: string;
}
/**
 * Contract prop input
 */
export interface CreateContractPropInput {
    name: string;
    type: string;
    required: boolean;
    defaultValue?: any;
    description?: string;
    validation?: Record<string, any>;
}
/**
 * Output for CreateContractUseCase
 */
export interface CreateContractOutput {
    contract: Contract;
    isValid: boolean;
    validationResults: {
        domain: {
            isValid: boolean;
            errors: string[];
            warnings: string[];
        };
        validators: Array<{
            validator: string;
            isValid: boolean;
            errors: string[];
            warnings: string[];
        }>;
        combined: {
            isValid: boolean;
            errors: string[];
            warnings: string[];
        };
    };
    domainEvents: any[];
}
//# sourceMappingURL=CreateContractUseCase.d.ts.map