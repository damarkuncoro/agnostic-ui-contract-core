import { Contract } from '../../domain/contract/entities/Contract';
import { IContractValidator } from '../../domain/contract/services/IContractValidator';
/**
 * Schema Contract Validator
 * Validates contract definitions against predefined schemas and business rules
 */
export declare class SchemaContractValidator implements IContractValidator {
    getName(): string;
    getDescription(): string;
    validate(contract: Contract, context?: any): Promise<{
        isValid: boolean;
        errors: string[];
        warnings: string[];
    }>;
    supportsValidationType(type: string): boolean;
    getPriority(): number;
    /**
     * Validates required combinations of properties
     */
    private validateRequiredCombinations;
    /**
     * Validates category-specific rules
     */
    private validateCategoryRules;
    /**
     * Validates core contract specific rules
     */
    private validateCoreContractRules;
    /**
     * Validates component contract specific rules
     */
    private validateComponentContractRules;
    /**
     * Validates theme contract specific rules
     */
    private validateThemeContractRules;
    /**
     * Validates skin contract specific rules
     */
    private validateSkinContractRules;
    /**
     * Validates utility contract specific rules
     */
    private validateUtilityContractRules;
    /**
     * Validates accessibility requirements
     */
    private validateAccessibilityRequirements;
    /**
     * Validates variant compatibility
     */
    private validateVariantCompatibility;
    /**
     * Validates prop consistency
     */
    private validatePropConsistency;
    /**
     * Validates metadata
     */
    private validateMetadata;
}
//# sourceMappingURL=SchemaContractValidator.d.ts.map