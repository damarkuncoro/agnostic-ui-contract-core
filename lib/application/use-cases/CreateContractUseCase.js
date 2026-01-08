"use strict";
// packages/agnostic-ui-contract-core/src/application/use-cases/CreateContractUseCase.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateContractUseCase = void 0;
const Contract_1 = require("../../domain/contract/entities/Contract");
const ContractName_1 = require("../../domain/shared/value-objects/ContractName");
/**
 * Create Contract Use Case
 * Orchestrates the creation of new contracts with validation
 */
class CreateContractUseCase {
    constructor(contractValidators) {
        this.contractValidators = contractValidators;
    }
    /**
     * Executes the create contract use case
     */
    async execute(input) {
        // Validate input
        this.validateInput(input);
        // Create contract name
        const contractName = ContractName_1.ContractName.create(input.name);
        // Create contract variants
        const variants = this.createVariants(input.variants || []);
        // Create contract props
        const props = this.createProps(input.props || []);
        // Create contract entity
        const contract = Contract_1.Contract.create({
            ...(input.id && { id: input.id }),
            name: contractName.value,
            category: input.category,
            ...(input.version && { version: input.version }),
            ...(input.description && { description: input.description }),
            variants,
            props,
            ...(input.accessibility && { accessibility: input.accessibility }),
            ...(input.validation && { validation: input.validation }),
            ...(input.metadata && { metadata: input.metadata })
        });
        // Run additional validations
        const validationResults = await this.runContractValidators(contract);
        // Combine all validation results
        const allErrors = validationResults.flatMap(r => r.errors);
        const allWarnings = validationResults.flatMap(r => r.warnings);
        const isValid = allErrors.length === 0;
        return {
            contract,
            isValid,
            validationResults: {
                domain: { isValid: true, errors: [], warnings: [] }, // Domain validation already passed in create
                validators: validationResults,
                combined: { isValid, errors: allErrors, warnings: allWarnings }
            },
            domainEvents: contract.getDomainEvents()
        };
    }
    /**
     * Validates the input data
     */
    validateInput(input) {
        if (!input.name || typeof input.name !== 'string') {
            throw new Error('Contract name is required and must be a string');
        }
        if (!input.category || !Object.values(Contract_1.ContractCategory).includes(input.category)) {
            throw new Error(`Invalid contract category. Must be one of: ${Object.values(Contract_1.ContractCategory).join(', ')}`);
        }
        if (input.variants && !Array.isArray(input.variants)) {
            throw new Error('Variants must be an array');
        }
        if (input.props && !Array.isArray(input.props)) {
            throw new Error('Props must be an array');
        }
        if (input.version && !/^\d+\.\d+\.\d+$/.test(input.version)) {
            throw new Error('Version must follow semantic versioning (x.y.z)');
        }
    }
    /**
     * Creates contract variants from input
     */
    createVariants(variantInputs) {
        return variantInputs.map(input => ({
            name: input.name,
            type: input.type,
            values: input.values,
            ...(input.defaultValue !== undefined && { defaultValue: input.defaultValue }),
            ...(input.description && { description: input.description })
        }));
    }
    /**
     * Creates contract props from input
     */
    createProps(propInputs) {
        return propInputs.map(input => ({
            name: input.name,
            type: input.type,
            required: input.required,
            ...(input.defaultValue !== undefined && { defaultValue: input.defaultValue }),
            ...(input.description && { description: input.description }),
            ...(input.validation && { validation: input.validation })
        }));
    }
    /**
     * Runs all contract validators
     */
    async runContractValidators(contract) {
        const results = [];
        for (const validator of this.contractValidators) {
            try {
                const result = await validator.validate(contract);
                results.push({
                    validator: validator.getName(),
                    isValid: result.isValid,
                    errors: result.errors,
                    warnings: result.warnings
                });
            }
            catch (error) {
                results.push({
                    validator: validator.getName(),
                    isValid: false,
                    errors: [error instanceof Error ? error.message : 'Validation failed'],
                    warnings: []
                });
            }
        }
        return results;
    }
    /**
     * Gets available contract validators
     */
    getAvailableValidators() {
        return this.contractValidators.map(v => v.getName());
    }
    /**
     * Checks if a validator is available
     */
    hasValidator(validatorName) {
        return this.contractValidators.some(v => v.getName() === validatorName);
    }
    /**
     * Gets validator description
     */
    getValidatorDescription(validatorName) {
        const validator = this.contractValidators.find(v => v.getName() === validatorName);
        return validator?.getDescription();
    }
    /**
     * Creates a standard component contract template
     */
    createStandardComponentContract(name, options = {}) {
        const baseVariants = [
            {
                name: 'size',
                type: 'size',
                values: ['xs', 'sm', 'md', 'lg', 'xl'],
                defaultValue: 'md',
                description: 'Component size variants'
            },
            {
                name: 'intent',
                type: 'intent',
                values: ['neutral', 'primary', 'secondary', 'success', 'warning', 'error'],
                defaultValue: 'neutral',
                description: 'Component intent variants'
            }
        ];
        const baseProps = [
            {
                name: 'id',
                type: 'string',
                required: false,
                description: 'Unique identifier for the component'
            },
            {
                name: 'className',
                type: 'string',
                required: false,
                description: 'Additional CSS classes'
            },
            {
                name: 'disabled',
                type: 'boolean',
                required: false,
                defaultValue: false,
                description: 'Whether the component is disabled'
            }
        ];
        if (options.includeAccessibility) {
            baseProps.push({
                name: 'ariaLabel',
                type: 'string',
                required: false,
                description: 'ARIA label for accessibility'
            });
        }
        return {
            name,
            category: Contract_1.ContractCategory.COMPONENT,
            variants: [...baseVariants, ...(options.customVariants || [])],
            props: [...baseProps, ...(options.customProps || [])],
            ...(options.includeAccessibility && {
                accessibility: {
                    supported: true,
                    roles: ['button', 'link'],
                    keyboardActions: ['Enter', 'Space']
                }
            }),
            ...(options.includeValidation && {
                validation: {
                    rules: ['required-fields', 'type-validation'],
                    schema: {}
                }
            })
        };
    }
}
exports.CreateContractUseCase = CreateContractUseCase;
//# sourceMappingURL=CreateContractUseCase.js.map